package com.swqualityboard.serviceImpl;

import com.swqualityboard.configuration.util.SecurityUtil;
import com.swqualityboard.dao.AuthorityRepository;
import com.swqualityboard.dao.SystemRepository;
import com.swqualityboard.dao.TeamRepository;
import com.swqualityboard.dao.UserRepository;
import com.swqualityboard.dto.user.select.SystemDto;
import com.swqualityboard.dto.user.select.TeamDto;
import com.swqualityboard.dto.user.select.UserInfoOutput;
import com.swqualityboard.dto.user.signup.SignUpInput;
import com.swqualityboard.entity.Authority;
import com.swqualityboard.entity.System;
import com.swqualityboard.entity.Team;
import com.swqualityboard.entity.User;
import com.swqualityboard.exception.system.SystemNotFoundException;
import com.swqualityboard.exception.team.TeamNotFoundException;
import com.swqualityboard.exception.user.AuthorityNotFoundException;
import com.swqualityboard.exception.user.UserDuplicateEmailException;
import com.swqualityboard.exception.user.UserDuplicateNicknameException;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static com.swqualityboard.response.ResponseStatus.*;

@Service("UserService")
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final TeamRepository teamRepository;
    private final SystemRepository systemRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public ResponseEntity<Response<Object>> signUp(SignUpInput signUpInput) {

        // 1. 유저 생성
        User user;
        String email = signUpInput.getEmail();
        String nickname = signUpInput.getNickname();
        if (userRepository.existsByEmailAndStatus(email, "ACTIVATE")) {
            throw new UserDuplicateEmailException("이미 가입되어 있는 email입니다.");
        }
        if (userRepository.existsByNicknameAndStatus(nickname, "ACTIVATE")) {
            throw new UserDuplicateNicknameException("이미 가입되어 있는 nickname입니다.");
        }
        String password = passwordEncoder.encode(signUpInput.getPassword());
        Authority adminAuthority = authorityRepository.findByRole(signUpInput.getRole()).orElseThrow(
                () -> new AuthorityNotFoundException("해당 권한이 존재하지 않습니다.")
        );
        Set<Authority> authorities = new HashSet<>();
        authorities.add(adminAuthority);
        List<String> teams = new ArrayList<>();
        for (String team : signUpInput.getTeams()) {
            Team t = teamRepository.findByName(team).orElseThrow(
                    () -> new TeamNotFoundException("해당 팀이 존재하지 않습니다.")
            );

            teams.add(t.getId());
        }
        user = User.builder().email(signUpInput.getEmail()).password(password)
                .nickname(signUpInput.getNickname()).authorities(authorities).teams(teams).status("ACTIVATE").build();

        userRepository.save(user);


        // 2. 결과 return
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new Response<>(null, CREATED_USER));
    }

    @Override
    public ResponseEntity<Response<Object>> getUserInfo(String email) {
        User user = userRepository.findOneWithAuthoritiesByEmail(email).orElseThrow(
                () -> new AuthorityNotFoundException("해당 권한이 존재하지 않습니다.")
        );
        List<TeamDto> teams = new ArrayList<>();
        List<SystemDto> systems = new ArrayList<>();
        for (String teamId : user.getTeams()) {
            Team team = teamRepository.findById(teamId).orElseThrow(
                    () -> new TeamNotFoundException("해당 팀이 존재하지 않습니다.")
            );
            TeamDto teamDto = TeamDto.builder()
                    .id(team.getId())
                    .name(team.getName())
                    .build();
            teams.add(teamDto);

            for (String systemId : team.getSystems()) {
                System system = systemRepository.findById(systemId).orElseThrow(
                        () -> new SystemNotFoundException("해당 시스템이 존재하지 않습니다.")
                );

                SystemDto systemDto = SystemDto.builder()
                        .id(system.getId())
                        .name(system.getName())
                        .build();
                systems.add(systemDto);
            }
        }
        UserInfoOutput userInfoOutput = UserInfoOutput.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .authorities(user.getAuthorities())
                .teams(teams)
                .systems(systems)
                .build();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(userInfoOutput, SUCCESS_SELECT_USER));
    }
}

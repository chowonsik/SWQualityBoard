package com.swqualityboard.serviceImpl;

import com.swqualityboard.configuration.util.SecurityUtil;
import com.swqualityboard.dao.AuthorityRepository;
import com.swqualityboard.dao.UserRepository;
import com.swqualityboard.dto.user.signup.SignUpInput;
import com.swqualityboard.entity.Authority;
import com.swqualityboard.entity.User;
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

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static com.swqualityboard.response.ResponseStatus.*;

@Service("UserService")
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
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
        user = User.builder().email(signUpInput.getEmail()).password(password)
                .nickname(signUpInput.getNickname()).authorities(authorities).status("ACTIVATE").build();

        userRepository.save(user);


        // 2. 결과 return
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new Response<>(null, CREATED_USER));
    }

    @Transactional(readOnly = true)
    public ResponseEntity<Response<User>> getUserWithAuthorities(String email) {
        User user = userRepository.findOneWithAuthoritiesByEmail(email).orElseThrow(
                () -> new AuthorityNotFoundException("해당 권한이 존재하지 않습니다.")
        );
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(user, SUCCESS));
    }

    @Transactional(readOnly = true)
    public ResponseEntity<Response<User>> getMyUserWithAuthorities() {
        User user = SecurityUtil.getCurrentUsername().flatMap(userRepository::findOneWithAuthoritiesByEmail).orElseThrow(
                () -> new AuthorityNotFoundException("해당 권한이 존재하지 않습니다.")
        );
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response<>(user, SUCCESS));
    }
}

package com.swqualityboard.service;

import com.swqualityboard.dao.AuthorityRepository;
import com.swqualityboard.dao.SystemRepository;
import com.swqualityboard.dao.TeamRepository;
import com.swqualityboard.dao.UserRepository;
import com.swqualityboard.dto.system.SystemDto;
import com.swqualityboard.dto.team.TeamDto;
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
import com.swqualityboard.exception.user.UserNotFoundException;
import com.swqualityboard.serviceImpl.UserServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.junit.jupiter.api.Assertions.*;

import java.util.*;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    UserRepository userRepository;
    @Mock
    AuthorityRepository authorityRepository;
    @Mock
    TeamRepository teamRepository;
    @Mock
    SystemRepository systemRepository;
    @Mock
    PasswordEncoder passwordEncoder;

    @InjectMocks
    UserServiceImpl userService;

    @DisplayName("회원가입 성공")
    @Test
    public void 회원가입_성공() throws Exception {
        //given
        List<String> teams = new ArrayList<>();
        teams.add("개발 1팀");
        SignUpInput signUpInput = SignUpInput.builder()
                .email("test@gmail.com")
                .password("ssafy1234")
                .nickname("테스트계정")
                .role("ROLE_DEVELOPER")
                .teams(teams)
                .build();
        Team team = Team.builder()
                .id("teamId")
                .name("개발 1팀")
                .build();

        given(userRepository.existsByEmailAndStatus("test@gmail.com","ACTIVATE")).willReturn(false);
        given(userRepository.existsByNicknameAndStatus("테스트계정", "ACTIVATE")).willReturn(false);
        given(teamRepository.findByName("개발 1팀")).willReturn(Optional.of(team));
        given(passwordEncoder.encode("ssafy1234")).willReturn("encodedPassword");
        given(authorityRepository.findByRole("ROLE_DEVELOPER")).willReturn(Optional.of(Authority.builder().id("authorityId").role("ROLE_DEVELOPER").build()));

        //when
        userService.signUp(signUpInput);

        //then
        verify(userRepository, atLeastOnce()).existsByEmailAndStatus("test@gmail.com","ACTIVATE");
        verify(userRepository, atLeastOnce()).existsByNicknameAndStatus("테스트계정","ACTIVATE");
        verify(teamRepository, atLeastOnce()).findByName("개발 1팀");
    }

    @DisplayName("회원가입 실패 - 이메일 중복")
    @Test
    public void 회원가입_실패_이메일_중복() throws Exception {
        //given
        List<String> teams = new ArrayList<>();
        teams.add("개발 1팀");
        SignUpInput signUpInput = SignUpInput.builder()
                .email("test@gmail.com")
                .password("ssafy1234")
                .nickname("테스트계정")
                .role("ROLE_DEVELOPER")
                .teams(teams)
                .build();

        //when
        when(userRepository.existsByEmailAndStatus("test@gmail.com","ACTIVATE")).thenReturn(true);

        //then
        assertThrows(UserDuplicateEmailException.class, () -> userService.signUp(signUpInput));
        verify(userRepository, atLeastOnce()).existsByEmailAndStatus("test@gmail.com","ACTIVATE");
    }

    @DisplayName("회원가입 실패 - 닉네임 중복")
    @Test
    public void 회원가입_실패_닉네임_중복() throws Exception {
        //given
        List<String> teams = new ArrayList<>();
        teams.add("개발 1팀");
        SignUpInput signUpInput = SignUpInput.builder()
                .email("test@gmail.com")
                .password("ssafy1234")
                .nickname("테스트계정")
                .role("ROLE_DEVELOPER")
                .teams(teams)
                .build();

        //when
        when(userRepository.existsByNicknameAndStatus("테스트계정","ACTIVATE")).thenReturn(true);

        //then
        assertThrows(UserDuplicateNicknameException.class, () -> userService.signUp(signUpInput));
        verify(userRepository, atLeastOnce()).existsByNicknameAndStatus("테스트계정","ACTIVATE");
    }

    @DisplayName("회원가입 실패 - 존재하지 않는 권한")
    @Test
    public void 회원가입_실패_존재하지_않는_권한() throws Exception {
        //given
        List<String> teams = new ArrayList<>();
        teams.add("개발 1팀");
        SignUpInput signUpInput = SignUpInput.builder()
                .email("test@gmail.com")
                .password("ssafy1234")
                .nickname("테스트계정")
                .role("ROLE_DEVELOPER")
                .teams(teams)
                .build();

        //when
        when(authorityRepository.findByRole("ROLE_DEVELOPER")).thenThrow(new AuthorityNotFoundException("해당 권한이 존재하지 않습니다."));

        //then
        assertThrows(AuthorityNotFoundException.class, () -> userService.signUp(signUpInput));
        verify(authorityRepository, atLeastOnce()).findByRole("ROLE_DEVELOPER");
    }

    @DisplayName("회원가입 실패 - 존재하지 않는 팀")
    @Test
    public void 회원가입_실패_존재하지_않는_팀() throws Exception {
        //given
        List<String> teams = new ArrayList<>();
        teams.add("개발 1팀");
        SignUpInput signUpInput = SignUpInput.builder()
                .email("test@gmail.com")
                .password("ssafy1234")
                .nickname("테스트계정")
                .role("ROLE_DEVELOPER")
                .teams(teams)
                .build();

        given(authorityRepository.findByRole("ROLE_DEVELOPER")).willReturn(Optional.of(Authority.builder().id("authorityId").role("ROLE_DEVELOPER").build()));

        //when
        when(teamRepository.findByName("개발 1팀")).thenThrow(new TeamNotFoundException("해당 팀이 존재하지 않습니다."));

        //then
        assertThrows(TeamNotFoundException.class, () -> userService.signUp(signUpInput));
        verify(teamRepository, atLeastOnce()).findByName("개발 1팀");
    }

    @DisplayName("유저 정보 조회 성공")
    @Test
    public void 유저_정보_조회_성공() throws Exception {
        //given
        Set<Authority> authorities = new HashSet<>();
        Authority authority = Authority.builder()
                .id("617efacc17060cc9e4117d75")
                .role("ROLE_ADMIN")
                .build();
        authorities.add(authority);
        List<String> systems = new ArrayList<>();
        systems.add("testId");
        authorities.add(authority);
        List<String> teams = new ArrayList<>();
        teams.add("testId");
        User user = User.builder()
                .id("testId")
                .email("test@gmail.com")
                .password("ssafy1234")
                .nickname("테스트계정")
                .status("ACTIVATE")
                .authorities(authorities)
                .teams(teams)
                .build();
        Team team = Team.builder()
                .id("testId")
                .name("개발 1팀")
                .systems(systems)
                .build();
        System system = System.builder()
                .id("testId")
                .name("A")
                .build();

        given(userRepository.findByEmailAndStatus("test@gmail.com", "ACTIVATE")).willReturn(Optional.of(user));
        given(teamRepository.findById("testId")).willReturn(Optional.of(team));
        given(systemRepository.findById("testId")).willReturn(Optional.of(system));

        //when
        UserInfoOutput userInfoOutput = userService.getUserInfo("test@gmail.com");

        //then
        assertEquals(userInfoOutput.getEmail(), "test@gmail.com");
        assertEquals(userInfoOutput.getNickname(), "테스트계정");
        verify(userRepository, atLeastOnce()).findByEmailAndStatus("test@gmail.com", "ACTIVATE");
        verify(teamRepository, atLeastOnce()).findById("testId");
        verify(systemRepository, atLeastOnce()).findById("testId");
    }

    @DisplayName("유저 정보 조회 실패 - 해당 이메일을 가진 유저가 없음")
    @Test
    public void 유저_정보_조회_실패_유저() throws Exception {
        //given
        Set<Authority> authorities = new HashSet<>();
        Authority authority = Authority.builder()
                .id("617efacc17060cc9e4117d75")
                .role("ROLE_ADMIN")
                .build();
        authorities.add(authority);
        List<String> teams = new ArrayList<>();
        teams.add("testId");
        User user = User.builder()
                .id("testId")
                .email("test@gmail.com")
                .password("ssafy1234")
                .nickname("테스트계정")
                .status("ACTIVATE")
                .authorities(authorities)
                .teams(teams)
                .build();

        given(userRepository.findByEmailAndStatus("test@gmail.com", "ACTIVATE")).willReturn(Optional.of(user));

        //when
        when(userRepository.findByEmailAndStatus("test@gmail.com", "ACTIVATE")).thenThrow(new UserNotFoundException("해당하는 이메일을 가진 유저가 존재하지 않습니다."));

        //then
        assertThrows(UserNotFoundException.class, () -> userService.getUserInfo("test@gmail.com"));
        verify(userRepository, atLeastOnce()).findByEmailAndStatus("test@gmail.com", "ACTIVATE");
    }

    @DisplayName("유저 정보 조회 실패 - 해당 팀이 존재하지 않아 실패")
    @Test
    public void 유저_정보_조회_실패_팀() throws Exception {
        //given
        Set<Authority> authorities = new HashSet<>();
        Authority authority = Authority.builder()
                .id("617efacc17060cc9e4117d75")
                .role("ROLE_ADMIN")
                .build();
        authorities.add(authority);
        List<String> teams = new ArrayList<>();
        teams.add("testId");
        User user = User.builder()
                .id("testId")
                .email("test@gmail.com")
                .password("ssafy1234")
                .nickname("테스트계정")
                .status("ACTIVATE")
                .authorities(authorities)
                .teams(teams)
                .build();

        given(userRepository.findByEmailAndStatus("test@gmail.com", "ACTIVATE")).willReturn(Optional.of(user));

        //when
        when(teamRepository.findById("testId")).thenThrow(new TeamNotFoundException("해당 팀이 존재하지 않습니다."));

        //then
        assertThrows(TeamNotFoundException.class, () -> userService.getUserInfo("test@gmail.com"));
        verify(userRepository, atLeastOnce()).findByEmailAndStatus("test@gmail.com", "ACTIVATE");
        verify(teamRepository, atLeastOnce()).findById("testId");
    }

    @DisplayName("유저 정보 조회 실패 - 해당 시스템이 존재하지 않아 실패")
    @Test
    public void 유저_정보_조회_실패_시스템() throws Exception {
        //given
        Set<Authority> authorities = new HashSet<>();
        Authority authority = Authority.builder()
                .id("617efacc17060cc9e4117d75")
                .role("ROLE_ADMIN")
                .build();
        authorities.add(authority);
        List<String> teams = new ArrayList<>();
        teams.add("testId");
        List<String> systems = new ArrayList<>();
        systems.add("testId");
        User user = User.builder()
                .id("testId")
                .email("test@gmail.com")
                .password("ssafy1234")
                .nickname("테스트계정")
                .status("ACTIVATE")
                .authorities(authorities)
                .teams(teams)
                .build();
        Team team = Team.builder()
                .id("testId")
                .name("개발 1팀")
                .systems(systems)
                .build();

        given(userRepository.findByEmailAndStatus("test@gmail.com", "ACTIVATE")).willReturn(Optional.of(user));
        given(teamRepository.findById("testId")).willReturn(Optional.of(team));

        //when
        when(systemRepository.findById("testId")).thenThrow(new SystemNotFoundException("해당 시스템이 존재하지 않습니다."));

        //then
        assertThrows(SystemNotFoundException.class, () -> userService.getUserInfo("test@gmail.com"));
        verify(userRepository, atLeastOnce()).findByEmailAndStatus("test@gmail.com", "ACTIVATE");
        verify(teamRepository, atLeastOnce()).findById("testId");
        verify(systemRepository, atLeastOnce()).findById("testId");
    }

}

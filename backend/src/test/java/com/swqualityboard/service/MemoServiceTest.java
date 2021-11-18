package com.swqualityboard.service;

import com.swqualityboard.dao.*;
import com.swqualityboard.dto.memo.create.CreateMemoInput;
import com.swqualityboard.dto.memo.update.UpdateMemoInput;
import com.swqualityboard.entity.*;
import com.swqualityboard.exception.memo.MemoDuplicateException;
import com.swqualityboard.exception.memo.MemoNotFoundException;
import com.swqualityboard.exception.user.UserNotFoundException;
import com.swqualityboard.serviceImpl.MemoServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MemoServiceTest {
    @Mock
    UserRepository userRepository;
    @Mock
    MemoRepository memoRepository;

    @InjectMocks
    MemoServiceImpl memoService;

    @DisplayName("메모 작성 성공")
    @Test
    public void 메모_작성_성공() throws Exception {
        //given
        Set<Authority> authorities = new HashSet<>();
        Authority authority = Authority.builder()
                .id("617efacc17060cc9e4117d75")
                .role("ROLE_ADMIN")
                .build();
        authorities.add(authority);
        List<String> teams = new ArrayList<>();
        teams.add("개발 1팀");
        CreateMemoInput createMemoInput = CreateMemoInput.builder()
                .systemQualityId("6188fdc9948f96df1cff9ba1")
                .content("테스트입니다.")
                .build();
        User user = User.builder()
                .id("testId")
                .email("test@gmail.com")
                .password("ssafy1234")
                .nickname("테스트계정")
                .status("ACTIVATE")
                .authorities(authorities)
                .teams(teams)
                .build();

        given(userRepository.findByEmailAndStatus("test@gmail.com","ACTIVATE")).willReturn(Optional.of(user));
        given(memoRepository.existsBySystemQualityIdAndUserId("6188fdc9948f96df1cff9ba1", "testId")).willReturn(false);

        //when
        memoService.createMemo("test@gmail.com", createMemoInput);

        //then
        verify(userRepository, atLeastOnce()).findByEmailAndStatus("test@gmail.com","ACTIVATE");
        verify(memoRepository, atLeastOnce()).existsBySystemQualityIdAndUserId("6188fdc9948f96df1cff9ba1","testId");
        verify(memoRepository, atLeastOnce()).save(any());
    }

    @DisplayName("메모 작성 실패 - 존재하지 않는 유저")
    @Test
    public void 메모_작성_실패_존재하지_않는_유저() throws Exception {
        //given
        CreateMemoInput createMemoInput = CreateMemoInput.builder()
                .systemQualityId("6188fdc9948f96df1cff9ba1")
                .content("테스트입니다.")
                .build();

        //when
        when(userRepository.findByEmailAndStatus("test@gmail.com","ACTIVATE")).thenThrow(new UserNotFoundException("해당하는 이메일을 가진 유저가 존재하지 않습니다."));

        //then
        assertThrows(UserNotFoundException.class, () -> memoService.createMemo("test@gmail.com", createMemoInput));
        verify(userRepository, atLeastOnce()).findByEmailAndStatus("test@gmail.com","ACTIVATE");
    }

    @DisplayName("메모 작성 실패 - 메모가 이미 존재")
    @Test
    public void 메모_작성_실패_메모가_이미_존재() throws Exception {
        //given
        Set<Authority> authorities = new HashSet<>();
        Authority authority = Authority.builder()
                .id("617efacc17060cc9e4117d75")
                .role("ROLE_ADMIN")
                .build();
        authorities.add(authority);
        List<String> teams = new ArrayList<>();
        teams.add("개발 1팀");
        CreateMemoInput createMemoInput = CreateMemoInput.builder()
                .systemQualityId("6188fdc9948f96df1cff9ba1")
                .content("테스트입니다.")
                .build();
        User user = User.builder()
                .id("testId")
                .email("test@gmail.com")
                .password("ssafy1234")
                .nickname("테스트계정")
                .status("ACTIVATE")
                .authorities(authorities)
                .teams(teams)
                .build();

        given(userRepository.findByEmailAndStatus("test@gmail.com","ACTIVATE")).willReturn(Optional.of(user));

        //when
        when(memoRepository.existsBySystemQualityIdAndUserId("6188fdc9948f96df1cff9ba1","testId")).thenReturn(true);

        //then
        assertThrows(MemoDuplicateException.class, () -> memoService.createMemo("test@gmail.com", createMemoInput));
        verify(userRepository, atLeastOnce()).findByEmailAndStatus("test@gmail.com","ACTIVATE");
        verify(memoRepository, atLeastOnce()).existsBySystemQualityIdAndUserId("6188fdc9948f96df1cff9ba1","testId");
    }

    @DisplayName("메모 수정 성공")
    @Test
    public void 메모_수정_성공() throws Exception {
        //given
        UpdateMemoInput updateMemoInput = UpdateMemoInput.builder()
                .content("수정입니다.")
                .build();
        Memo memo = Memo.builder()
                .id("testMemoId")
                .systemQualityId("6188fdc9948f96df1cff9ba1")
                .userId("testUserId")
                .build();

        given(memoRepository.findById("testMemoId")).willReturn(Optional.of(memo));

        //when
        memoService.updateMemo("testMemoId", updateMemoInput);

        //then
        verify(memoRepository, atLeastOnce()).findById("testMemoId");
        verify(memoRepository, atLeastOnce()).save(any());
    }

    @DisplayName("메모 수정 실패 - 존재하지 않는 메모")
    @Test
    public void 메모_수정_실패_존재하지_않는_메모() throws Exception {
        //given
        UpdateMemoInput updateMemoInput = UpdateMemoInput.builder()
                .content("수정입니다.")
                .build();

        //when
        when(memoRepository.findById("testMemoId")).thenThrow(new MemoNotFoundException("해당 메모를 찾을 수 없습니다."));

        //then
        assertThrows(MemoNotFoundException.class, () -> memoService.updateMemo("testMemoId", updateMemoInput));
        verify(memoRepository, atLeastOnce()).findById("testMemoId");
    }

    @DisplayName("메모 삭제 성공")
    @Test
    public void 메모_삭제_성공() throws Exception {
        //given
        Memo memo = Memo.builder()
                .id("testMemoId")
                .systemQualityId("6188fdc9948f96df1cff9ba1")
                .userId("testUserId")
                .build();

        given(memoRepository.findById("testMemoId")).willReturn(Optional.of(memo));

        //when
        memoService.deleteMemo("testMemoId");

        //then
        verify(memoRepository, atLeastOnce()).findById("testMemoId");
        verify(memoRepository, atLeastOnce()).delete(any());
    }

    @DisplayName("메모 삭제 실패 - 존재하지 않는 메모")
    @Test
    public void 메모_삭제_실패_존재하지_않는_메모() throws Exception {
        //given

        //when
        when(memoRepository.findById("testMemoId")).thenThrow(new MemoNotFoundException("해당 메모를 찾을 수 없습니다."));

        //then
        assertThrows(MemoNotFoundException.class, () -> memoService.deleteMemo("testMemoId"));
        verify(memoRepository, atLeastOnce()).findById("testMemoId");
    }

}

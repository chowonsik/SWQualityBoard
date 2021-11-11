package com.swqualityboard.serviceImpl;

import com.swqualityboard.dao.MemoRepository;
import com.swqualityboard.dao.UserRepository;
import com.swqualityboard.dto.memo.create.CreateMemoInput;
import com.swqualityboard.dto.memo.update.UpdateMemoInput;
import com.swqualityboard.entity.Memo;
import com.swqualityboard.entity.User;
import com.swqualityboard.exception.memo.MemoDuplicateException;
import com.swqualityboard.exception.memo.MemoNotFoundException;
import com.swqualityboard.exception.user.UserNotFoundException;
import com.swqualityboard.service.MemoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("MemoService")
@RequiredArgsConstructor
@Slf4j
public class MemoServiceImpl implements MemoService {

    private final MemoRepository memoRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void createMemo(String email, CreateMemoInput createMemoInput) {

        User user = userRepository.findByEmailAndStatus(email, "ACTIVATE").orElseThrow(
                () -> new UserNotFoundException("해당하는 이메일이 존재하지 않습니다.")
        );

        if (memoRepository.existsBySystemQualityIdAndUserId(createMemoInput.getSystemQualityId(), user.getId())) {
            throw new MemoDuplicateException("해당 SW 품질지표 이력에 이미 메모가 존재합니다.");
        }

        Memo memo = Memo.builder()
                .systemQualityId(createMemoInput.getSystemQualityId())
                .userId(user.getId())
                .content(createMemoInput.getContent())
                .build();

        memoRepository.save(memo);
    }

    @Override
    @Transactional
    public void updateMemo(String memoId, UpdateMemoInput updateMemoInput) {

        Memo memo = memoRepository.findById(memoId).orElseThrow(
                () -> new MemoNotFoundException("해당 메모를 찾을 수 없습니다.")
        );

        memo.setContent(updateMemoInput.getContent());

        memoRepository.save(memo);
    }

    @Override
    @Transactional
    public void deleteMemo(String memoId) {

        Memo memo = memoRepository.findById(memoId).orElseThrow(
                () -> new MemoNotFoundException("해당 메모를 찾을 수 없습니다.")
        );

        memoRepository.delete(memo);
    }

}

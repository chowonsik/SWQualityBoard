package com.swqualityboard.service;

import com.swqualityboard.dto.memo.create.CreateMemoInput;
import com.swqualityboard.dto.memo.update.UpdateMemoInput;
import com.swqualityboard.response.Response;
import org.springframework.http.ResponseEntity;

public interface MemoService {
    void createMemo(String email, CreateMemoInput createMemoInput);
    void updateMemo(String memoId, UpdateMemoInput updateMemoInput);
    void deleteMemo(String memoId);
}

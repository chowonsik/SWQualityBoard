package com.swqualityboard.service;

import com.swqualityboard.dto.memo.create.CreateMemoInput;
import com.swqualityboard.dto.memo.update.UpdateMemoInput;
import com.swqualityboard.response.Response;
import org.springframework.http.ResponseEntity;

public interface MemoService {
    ResponseEntity<Response<Object>> createMemo(String email, CreateMemoInput createMemoInput);
    ResponseEntity<Response<Object>> updateMemo(String memoId, UpdateMemoInput updateMemoInput);
}

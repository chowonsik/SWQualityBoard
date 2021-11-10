package com.swqualityboard.controller;

import com.swqualityboard.dto.memo.create.CreateMemoInput;
import com.swqualityboard.dto.memo.update.UpdateMemoInput;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.MemoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class MemoController {

    private final MemoService memoService;

    /**
     * 시스템 SW 품질지표 메모 작성 API [POST] /api/memos
     *
     * @return ResponseEntity<Response<Object>>
     */
    // Body
    @PostMapping("/memos")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Response<Object>> createMemo(@AuthenticationPrincipal String userEmail, @RequestBody @Valid CreateMemoInput createMemoInput) {
        log.info("[POST] /api/memos");
        return memoService.createMemo(userEmail, createMemoInput);
    }

    /**
     * 시스템 SW 품질지표 메모 수정 API [PATCH] /api/memos/{id}
     *
     * @return ResponseEntity<Response<Object>>
     */
    // Body
    @PatchMapping("/memos/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Response<Object>> updateMemo(@PathVariable String id, @RequestBody @Valid UpdateMemoInput updateMemoInput) {
        log.info("[PATCH] /api/memos/" + id);
        return memoService.updateMemo(id, updateMemoInput);
    }

    /**
     * 시스템 SW 품질지표 메모 삭제 API [DELETE] /api/memos/{id}
     *
     * @return ResponseEntity<Response<Object>>
     */
    // Params
    @DeleteMapping("/memos/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Response<Object>> deleteMemo(@PathVariable String id) {
        log.info("[DELETE] /api/memos/" + id);
        return memoService.deleteMemo(id);
    }
}

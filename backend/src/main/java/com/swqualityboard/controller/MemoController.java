package com.swqualityboard.controller;

import com.swqualityboard.dto.memo.create.CreateMemoInput;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.MemoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}

package com.swqualityboard.controller;

import com.swqualityboard.dto.system.SystemQualityInput;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.SystemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class SystemController {

    private final SystemService systemService;

    /**
     * 시스템 SW 품질지표 리스트 조회 API [GET] /api/system-quality
     *
     * @return ResponseEntity<Response<Object>>
     */
    // Params
    @GetMapping("/system-quality")
    public ResponseEntity<Response<Object>> selectSystemQuality(@AuthenticationPrincipal String userEmail, @Valid SystemQualityInput systemQualityInput) {
        log.info("[GET] /api/system-quality");
        return systemService.selectSystemQuality(userEmail, systemQualityInput);
    }

}

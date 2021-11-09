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
     * 시스템 리스트 조회 API [POST] /api/systems
     *
     * @return ResponseEntity<Response<Object>>
     */
    // Params
    @GetMapping("/systems")
    public ResponseEntity<Response<Object>> selectSystems(@AuthenticationPrincipal String userEmail, @Valid SystemQualityInput systemQualityInput) {
        log.info("[GET] /api/systems");
        return systemService.selectSystems(userEmail, systemQualityInput);
    }

}

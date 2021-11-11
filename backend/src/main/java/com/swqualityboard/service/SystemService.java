package com.swqualityboard.service;

import com.swqualityboard.dto.system.SystemQualityInput;
import com.swqualityboard.response.Response;
import org.springframework.http.ResponseEntity;

public interface SystemService {
    ResponseEntity<Response<Object>> selectSystemQuality(String email, SystemQualityInput systemQualityInput);
}

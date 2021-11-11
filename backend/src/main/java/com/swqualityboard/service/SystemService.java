package com.swqualityboard.service;

import com.swqualityboard.dto.system.SystemQualityInput;
import com.swqualityboard.dto.system.SystemQualityOutput;

import java.util.List;

public interface SystemService {
    List<SystemQualityOutput> selectSystemQuality(String email, SystemQualityInput systemQualityInput);
}

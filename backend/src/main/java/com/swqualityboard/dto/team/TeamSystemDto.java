package com.swqualityboard.dto.team;

import com.swqualityboard.dto.system.SystemDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeamSystemDto {
    private String id;
    private String name;
    private List<SystemDto> systems;
}

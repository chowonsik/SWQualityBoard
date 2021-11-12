package com.swqualityboard.dto.user.select;


import com.swqualityboard.dto.team.TeamSystemDto;
import com.swqualityboard.entity.Authority;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoOutput {
    private String id;
    private String email;
    private String nickname;
    private Set<Authority> authorities;
    private List<TeamSystemDto> teams;
}

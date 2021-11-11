package com.swqualityboard.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swqualityboard.TestConfig;
import com.swqualityboard.configuration.annotation.WithAuthUser;
import com.swqualityboard.configuration.security.SecurityConfig;
import com.swqualityboard.dto.system.SystemDto;
import com.swqualityboard.dto.team.TeamDto;
import com.swqualityboard.dto.user.select.UserInfoOutput;
import com.swqualityboard.entity.Authority;
import com.swqualityboard.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.swqualityboard.ApiDocumentUtils.getDocumentRequest;
import static com.swqualityboard.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.SharedHttpSessionConfigurer.sharedHttpSession;

@ExtendWith(RestDocumentationExtension.class) // JUnit 5 사용시 문서 스니펫 생성용
@Import({TestConfig.class})
@WebMvcTest(controllers = UserController.class, excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)}
)
class UserControllerTest {
    @MockBean
    private UserService userService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    public void setup(WebApplicationContext webApplicationContext,
                      RestDocumentationContextProvider restDocumentation) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(documentationConfiguration(restDocumentation))
                .apply(sharedHttpSession())
                .apply(springSecurity())
                .addFilters(new CharacterEncodingFilter("UTF-8", true))
                .build();
    }

    @WithAuthUser(email = "admin1@gmail.com", role = "ROLE_ADMIN")
    @DisplayName("유저 조회 성공")
    @Test
    public void 유저_조회_성공() throws Exception {
        //given
        Set<Authority> authorities = new HashSet<>();
        Authority authority = Authority.builder()
                .id("617efacc17060cc9e4117d75")
                .role("ROLE_ADMIN")
                .build();
        authorities.add(authority);
        List<TeamDto> teamDtoList = new ArrayList<>();
        teamDtoList.add(new TeamDto("6184da9b17060cc9e4117e1d","개발 1팀"));
        List<SystemDto> systemDtoList = new ArrayList<>();
        systemDtoList.add(new SystemDto("6184c7e317060cc9e4117dc0","A"));
        systemDtoList.add(new SystemDto("6184d76b17060cc9e4117de1","B"));
        systemDtoList.add(new SystemDto("6184d77317060cc9e4117de3","C"));
        UserInfoOutput userInfoOutput = UserInfoOutput.builder()
                .id("6184d96139ab91305d6fb8de")
                .email("admin1@gmail.com")
                .nickname("개발 1팀 관리자")
                .authorities(authorities)
                .teams(teamDtoList)
                .systems(systemDtoList)
                .build();

        //when
        doReturn(userInfoOutput).when(userService).getUserInfo(any());

        //then
        mockMvc.perform(get("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer JWT ACCESS TOKEN"))
                .andDo(print())
                .andExpect(status().isOk()) // 200
                .andDo(
                        document(
                                "userApi/select_user/successful",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                requestHeaders(headerWithName("Authorization").description("Bearer JWT Token")),
                                responseFields(
                                        fieldWithPath("isSuccess").type(JsonFieldType.BOOLEAN)
                                                .description("요청 성공 여부"),
                                        fieldWithPath("statusCode").type(JsonFieldType.NUMBER)
                                                .description("응답 상태"),
                                        fieldWithPath("message").type(JsonFieldType.STRING)
                                                .description("응답 메시지"),
                                        fieldWithPath("result").type(JsonFieldType.OBJECT)
                                                .description("유저 조회 결과"),
                                        fieldWithPath("result.id").type(JsonFieldType.STRING)
                                                .description("유저 번호"),
                                        fieldWithPath("result.email").type(JsonFieldType.STRING)
                                                .description("유저 이메일"),
                                        fieldWithPath("result.nickname").type(JsonFieldType.STRING)
                                                .description("유저 이름"),
                                        fieldWithPath("result.authorities").type(JsonFieldType.ARRAY)
                                                .description("유저 권한 리스트"),
                                        fieldWithPath("result.authorities.[].id").type(JsonFieldType.STRING)
                                                .description("유저 권한 번호"),
                                        fieldWithPath("result.authorities.[].role").type(JsonFieldType.STRING)
                                                .description("유저 권한 이름"),
                                        fieldWithPath("result.teams").type(JsonFieldType.ARRAY)
                                                .description("팀 목록 결과"),
                                        fieldWithPath("result.teams.[].id").type(JsonFieldType.STRING)
                                                .description("팀 번호"),
                                        fieldWithPath("result.teams.[].name").type(JsonFieldType.STRING)
                                                .description("팀 이름"),
                                        fieldWithPath("result.systems").type(JsonFieldType.ARRAY)
                                                .description("시스템 목록 결과"),
                                        fieldWithPath("result.systems.[].id").type(JsonFieldType.STRING)
                                                .description("시스템 번호"),
                                        fieldWithPath("result.systems.[].name").type(JsonFieldType.STRING)
                                                .description("시스템 이름"),
                                        fieldWithPath("timestamp").type(JsonFieldType.STRING)
                                                .description("api 호출 일시")
                                )
                        ));
    }

}

package com.swqualityboard.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swqualityboard.TestConfig;
import com.swqualityboard.configuration.annotation.WithAuthUser;
import com.swqualityboard.configuration.security.SecurityConfig;
import com.swqualityboard.dto.team.TeamDto;
import com.swqualityboard.dto.team.TeamQualityAvgOutput;
import com.swqualityboard.dto.team.TeamQualityInput;
import com.swqualityboard.dto.team.TeamQualityOutput;
import com.swqualityboard.service.TeamService;
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
import java.util.List;

import static com.swqualityboard.ApiDocumentUtils.getDocumentRequest;
import static com.swqualityboard.ApiDocumentUtils.getDocumentResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.SharedHttpSessionConfigurer.sharedHttpSession;

@ExtendWith(RestDocumentationExtension.class) // JUnit 5 사용시 문서 스니펫 생성용
@Import({TestConfig.class})
@WebMvcTest(controllers = TeamController.class, excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)}
)
class TeamControllerTest {
    @MockBean
    private TeamService teamService;

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
    @DisplayName("팀 SW 품질지표 조회 성공")
    @Test
    public void 팀_SW_품질지표_조회_성공() throws Exception {
        //given
        TeamDto teamDto = TeamDto.builder()
                .id("6184da9b17060cc9e4117e1d")
                .name("개발 1팀")
                .build();
        List<TeamQualityOutput> teamQualityOutputList = new ArrayList<>();
        TeamQualityOutput teamQualityOutput = TeamQualityOutput.builder()
                .team(teamDto)
                .totalNumberPeople(85)
                .reviewedNumberPeople(51)
                .codeReviewRate(60)
                .conventionRate(58)
                .receptionRate(53)
                .devLeadTime(223)
                .deliveryRate(74)
                .createdAt("2020-10-04")
                .build();
        teamQualityOutputList.add(teamQualityOutput);

        //when
        doReturn(teamQualityOutputList).when(teamService).selectTeamQuality(any(TeamQualityInput.class));

        //then
        mockMvc.perform(get("/api/team-quality")
                        .queryParam("teams", "6184da9b17060cc9e4117e1d")
                        .queryParam("start", "2020-10-04")
                        .queryParam("end","2020-10-04")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer JWT ACCESS TOKEN"))
                .andDo(print())
                .andExpect(status().isOk()) // 200
                .andDo(
                        document(
                                "teamApi/select_team_quality/successful",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                requestHeaders(headerWithName("Authorization").description("Bearer JWT Token")),
                                requestParameters(
                                        parameterWithName("teams").description("팀 번호 리스트"),
                                        parameterWithName("start").description("조회 시작일"),
                                        parameterWithName("end").description("조회 종료일")
                                ),
                                responseFields(
                                        fieldWithPath("isSuccess").type(JsonFieldType.BOOLEAN)
                                                .description("요청 성공 여부"),
                                        fieldWithPath("statusCode").type(JsonFieldType.NUMBER)
                                                .description("응답 상태"),
                                        fieldWithPath("message").type(JsonFieldType.STRING)
                                                .description("응답 메시지"),
                                        fieldWithPath("result").type(JsonFieldType.ARRAY)
                                                .description("시스템 SW 품질지표 조회 결과"),
                                        fieldWithPath("result.[].team").type(JsonFieldType.OBJECT)
                                                .description("팀 정보"),
                                        fieldWithPath("result.[].team.id").type(JsonFieldType.STRING)
                                                .description("팀 번호"),
                                        fieldWithPath("result.[].team.name").type(JsonFieldType.STRING)
                                                .description("팀 이름"),
                                        fieldWithPath("result.[].totalNumberPeople").type(JsonFieldType.NUMBER)
                                                .description("전체 개발인원"),
                                        fieldWithPath("result.[].reviewedNumberPeople").type(JsonFieldType.NUMBER)
                                                .description("코드리뷰 참여인원"),
                                        fieldWithPath("result.[].codeReviewRate").type(JsonFieldType.NUMBER)
                                                .description("코드 리뷰율"),
                                        fieldWithPath("result.[].conventionRate").type(JsonFieldType.NUMBER)
                                                .description("코딩 컨벤션 준수율"),
                                        fieldWithPath("result.[].receptionRate").type(JsonFieldType.NUMBER)
                                                .description("시스템 접수율"),
                                        fieldWithPath("result.[].devLeadTime").type(JsonFieldType.NUMBER)
                                                .description("개발리드타임"),
                                        fieldWithPath("result.[].deliveryRate").type(JsonFieldType.NUMBER)
                                                .description("정시 납기율"),
                                        fieldWithPath("result.[].createdAt").type(JsonFieldType.STRING)
                                                .description("팀 SW 품질지표 생성일"),
                                        fieldWithPath("timestamp").type(JsonFieldType.STRING)
                                                .description("api 호출 일시")
                                )
                        ));
    }

    @WithAuthUser(email = "admin1@gmail.com", role = "ROLE_ADMIN")
    @DisplayName("팀 SW 품질지표 평균 조회 성공")
    @Test
    public void 팀_SW_품질지표_평균_조회_성공() throws Exception {
        //given
        TeamQualityAvgOutput teamQualityAvgOutput = TeamQualityAvgOutput.builder()
                .totalNumberPeople(85)
                .reviewedNumberPeople(51)
                .codeReviewRate(60)
                .conventionRate(58)
                .receptionRate(53)
                .devLeadTime(223)
                .deliveryRate(74)
                .createdAt("2020-10-04")
                .build();

        //when
        doReturn(teamQualityAvgOutput).when(teamService).selectTeamQualityAvg();

        //then
        mockMvc.perform(get("/api/team-quality/average")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer JWT ACCESS TOKEN"))
                .andDo(print())
                .andExpect(status().isOk()) // 200
                .andDo(
                        document(
                                "teamApi/select_team_quality_average/successful",
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
                                                .description("시스템 SW 품질지표 조회 결과"),
                                        fieldWithPath("result.totalNumberPeople").type(JsonFieldType.NUMBER)
                                                .description("전체 개발인원"),
                                        fieldWithPath("result.reviewedNumberPeople").type(JsonFieldType.NUMBER)
                                                .description("코드리뷰 참여인원"),
                                        fieldWithPath("result.codeReviewRate").type(JsonFieldType.NUMBER)
                                                .description("코드 리뷰율"),
                                        fieldWithPath("result.conventionRate").type(JsonFieldType.NUMBER)
                                                .description("코딩 컨벤션 준수율"),
                                        fieldWithPath("result.receptionRate").type(JsonFieldType.NUMBER)
                                                .description("시스템 접수율"),
                                        fieldWithPath("result.devLeadTime").type(JsonFieldType.NUMBER)
                                                .description("개발리드타임"),
                                        fieldWithPath("result.deliveryRate").type(JsonFieldType.NUMBER)
                                                .description("정시 납기율"),
                                        fieldWithPath("result.createdAt").type(JsonFieldType.STRING)
                                                .description("팀 SW 품질지표 생성일"),
                                        fieldWithPath("timestamp").type(JsonFieldType.STRING)
                                                .description("api 호출 일시")
                                )
                        ));
    }

}

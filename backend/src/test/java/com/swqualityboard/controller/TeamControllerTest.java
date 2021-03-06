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

@ExtendWith(RestDocumentationExtension.class) // JUnit 5 ????????? ?????? ????????? ?????????
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
    @DisplayName("??? SW ???????????? ?????? ??????")
    @Test
    public void ???_SW_????????????_??????_??????() throws Exception {
        //given
        TeamDto teamDto = TeamDto.builder()
                .id("6184da9b17060cc9e4117e1d")
                .name("?????? 1???")
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
                                        parameterWithName("teams").description("??? ?????? ?????????"),
                                        parameterWithName("start").description("?????? ?????????"),
                                        parameterWithName("end").description("?????? ?????????")
                                ),
                                responseFields(
                                        fieldWithPath("isSuccess").type(JsonFieldType.BOOLEAN)
                                                .description("?????? ?????? ??????"),
                                        fieldWithPath("statusCode").type(JsonFieldType.NUMBER)
                                                .description("?????? ??????"),
                                        fieldWithPath("message").type(JsonFieldType.STRING)
                                                .description("?????? ?????????"),
                                        fieldWithPath("result").type(JsonFieldType.ARRAY)
                                                .description("????????? SW ???????????? ?????? ??????"),
                                        fieldWithPath("result.[].team").type(JsonFieldType.OBJECT)
                                                .description("??? ??????"),
                                        fieldWithPath("result.[].team.id").type(JsonFieldType.STRING)
                                                .description("??? ??????"),
                                        fieldWithPath("result.[].team.name").type(JsonFieldType.STRING)
                                                .description("??? ??????"),
                                        fieldWithPath("result.[].totalNumberPeople").type(JsonFieldType.NUMBER)
                                                .description("?????? ????????????"),
                                        fieldWithPath("result.[].reviewedNumberPeople").type(JsonFieldType.NUMBER)
                                                .description("???????????? ????????????"),
                                        fieldWithPath("result.[].codeReviewRate").type(JsonFieldType.NUMBER)
                                                .description("?????? ?????????"),
                                        fieldWithPath("result.[].conventionRate").type(JsonFieldType.NUMBER)
                                                .description("?????? ????????? ?????????"),
                                        fieldWithPath("result.[].receptionRate").type(JsonFieldType.NUMBER)
                                                .description("????????? ?????????"),
                                        fieldWithPath("result.[].devLeadTime").type(JsonFieldType.NUMBER)
                                                .description("??????????????????"),
                                        fieldWithPath("result.[].deliveryRate").type(JsonFieldType.NUMBER)
                                                .description("?????? ?????????"),
                                        fieldWithPath("result.[].createdAt").type(JsonFieldType.STRING)
                                                .description("??? SW ???????????? ?????????"),
                                        fieldWithPath("timestamp").type(JsonFieldType.STRING)
                                                .description("api ?????? ??????")
                                )
                        ));
    }

    @WithAuthUser(email = "admin1@gmail.com", role = "ROLE_ADMIN")
    @DisplayName("??? SW ???????????? ?????? ?????? ??????")
    @Test
    public void ???_SW_????????????_??????_??????_??????() throws Exception {
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
                                                .description("?????? ?????? ??????"),
                                        fieldWithPath("statusCode").type(JsonFieldType.NUMBER)
                                                .description("?????? ??????"),
                                        fieldWithPath("message").type(JsonFieldType.STRING)
                                                .description("?????? ?????????"),
                                        fieldWithPath("result").type(JsonFieldType.OBJECT)
                                                .description("????????? SW ???????????? ?????? ??????"),
                                        fieldWithPath("result.totalNumberPeople").type(JsonFieldType.NUMBER)
                                                .description("?????? ????????????"),
                                        fieldWithPath("result.reviewedNumberPeople").type(JsonFieldType.NUMBER)
                                                .description("???????????? ????????????"),
                                        fieldWithPath("result.codeReviewRate").type(JsonFieldType.NUMBER)
                                                .description("?????? ?????????"),
                                        fieldWithPath("result.conventionRate").type(JsonFieldType.NUMBER)
                                                .description("?????? ????????? ?????????"),
                                        fieldWithPath("result.receptionRate").type(JsonFieldType.NUMBER)
                                                .description("????????? ?????????"),
                                        fieldWithPath("result.devLeadTime").type(JsonFieldType.NUMBER)
                                                .description("??????????????????"),
                                        fieldWithPath("result.deliveryRate").type(JsonFieldType.NUMBER)
                                                .description("?????? ?????????"),
                                        fieldWithPath("result.createdAt").type(JsonFieldType.STRING)
                                                .description("??? SW ???????????? ?????????"),
                                        fieldWithPath("timestamp").type(JsonFieldType.STRING)
                                                .description("api ?????? ??????")
                                )
                        ));
    }

}

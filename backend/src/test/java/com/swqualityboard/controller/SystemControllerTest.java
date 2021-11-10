package com.swqualityboard.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swqualityboard.TestConfig;
import com.swqualityboard.configuration.annotation.WithAuthUser;
import com.swqualityboard.configuration.security.SecurityConfig;
import com.swqualityboard.dto.memo.MemoDto;
import com.swqualityboard.dto.system.SystemDto;
import com.swqualityboard.dto.system.SystemQualityInput;
import com.swqualityboard.dto.system.SystemQualityOutput;
import com.swqualityboard.entity.Memo;
import com.swqualityboard.entity.System;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.SystemService;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.*;

import static com.swqualityboard.ApiDocumentUtils.getDocumentRequest;
import static com.swqualityboard.ApiDocumentUtils.getDocumentResponse;
import static com.swqualityboard.response.ResponseStatus.*;
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
@WebMvcTest(controllers = SystemController.class, excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)}
)
class SystemControllerTest {
    @MockBean
    private SystemService systemService;

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
    @DisplayName("시스템 SW 품질지표 조회 성공")
    @Test
    public void 시스템_SW_품질지표_조회_성공() throws Exception {
        //given
        SystemDto systemDto = SystemDto.builder()
                .id("6184c7e317060cc9e4117dc0")
                .name("A")
                .build();
        MemoDto memoDto = MemoDto.builder()
                .id("6184c7e317060cc9e4117dc9")
                .content("테스트입니다")
                .build();
        List<SystemQualityOutput> systemQualityOutputList = new ArrayList<>();
        SystemQualityOutput systemQualityOutput = SystemQualityOutput.builder()
                .id("6188fdc9948f96df1cff9ba1")
                .system(systemDto)
                .memo(memoDto)
                .critical(0)
                .high(0)
                .medium(3)
                .low(6)
                .complexity(4)
                .overlapping(4)
                .scale(2)
                .testCoverage(73)
                .numberRequest(42)
                .numberSuitableImplementation(22)
                .functionalCompatibility(52)
                .mtbf(440)
                .createdAt("2020-10-04")
                .build();
        systemQualityOutputList.add(systemQualityOutput);

        //when
        doReturn(ResponseEntity.status(HttpStatus.OK).body(new Response<>(systemQualityOutputList, SUCCESS_SELECT_SYSTEM))).when(systemService).selectSystemQuality(any(), any(SystemQualityInput.class));

        //then
        mockMvc.perform(get("/api/system-quality")
                        .queryParam("systems", "6184c7e317060cc9e4117dc0")
                        .queryParam("start", "2020-10-04")
                        .queryParam("end","2020-10-04")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer JWT ACCESS TOKEN"))
                .andDo(print())
                .andExpect(status().isOk()) // 200
                .andDo(
                        document(
                                "systemApi/select_system_quality/successful",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                requestHeaders(headerWithName("Authorization").description("Bearer JWT Token")),
                                requestParameters(
                                        parameterWithName("systems").description("시스템 번호 리스트"),
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
                                        fieldWithPath("result.[].id").type(JsonFieldType.STRING)
                                                .description("시스템 SW 품질지표 이력 번호"),
                                        fieldWithPath("result.[].system").type(JsonFieldType.OBJECT)
                                                .description("시스템 정보"),
                                        fieldWithPath("result.[].system.id").type(JsonFieldType.STRING)
                                                .description("시스템 번호"),
                                        fieldWithPath("result.[].system.name").type(JsonFieldType.STRING)
                                                .description("시스템 이름"),
                                        fieldWithPath("result.[].memo").type(JsonFieldType.OBJECT).optional()
                                                .description("메모 정보"),
                                        fieldWithPath("result.[].memo.id").type(JsonFieldType.STRING).optional()
                                                .description("메모 번호"),
                                        fieldWithPath("result.[].memo.content").type(JsonFieldType.STRING).optional()
                                                .description("메모 내용"),
                                        fieldWithPath("result.[].critical").type(JsonFieldType.NUMBER)
                                                .description("중대결함수 critical"),
                                        fieldWithPath("result.[].high").type(JsonFieldType.NUMBER)
                                                .description("중대결함수 high"),
                                        fieldWithPath("result.[].medium").type(JsonFieldType.NUMBER)
                                                .description("중대결함수 medium"),
                                        fieldWithPath("result.[].low").type(JsonFieldType.NUMBER)
                                                .description("중대결함수 low"),
                                        fieldWithPath("result.[].complexity").type(JsonFieldType.NUMBER)
                                                .description("구조품질지수 복잡도"),
                                        fieldWithPath("result.[].overlapping").type(JsonFieldType.NUMBER)
                                                .description("구조품질지수 중복도"),
                                        fieldWithPath("result.[].scale").type(JsonFieldType.NUMBER)
                                                .description("구조품질지수 규모"),
                                        fieldWithPath("result.[].testCoverage").type(JsonFieldType.NUMBER)
                                                .description("테스트 커버리지"),
                                        fieldWithPath("result.[].numberRequest").type(JsonFieldType.NUMBER)
                                                .description("기능 요청 건수"),
                                        fieldWithPath("result.[].numberSuitableImplementation").type(JsonFieldType.NUMBER)
                                                .description("기능 적합 구현 건수"),
                                        fieldWithPath("result.[].functionalCompatibility").type(JsonFieldType.NUMBER)
                                                .description("기능 적합성"),
                                        fieldWithPath("result.[].mtbf").type(JsonFieldType.NUMBER)
                                                .description("시스템 신뢰도"),
                                        fieldWithPath("result.[].createdAt").type(JsonFieldType.STRING)
                                                .description("시스템 SW 품질지표 생성일"),
                                        fieldWithPath("timestamp").type(JsonFieldType.STRING)
                                                .description("api 호출 일시")
                                )
                        ));
    }

}

package com.swqualityboard.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swqualityboard.TestConfig;
import com.swqualityboard.configuration.annotation.WithAuthUser;
import com.swqualityboard.configuration.security.SecurityConfig;
import com.swqualityboard.dto.memo.create.CreateMemoInput;
import com.swqualityboard.dto.memo.update.UpdateMemoInput;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.MemoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
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
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import static com.swqualityboard.ApiDocumentUtils.getDocumentRequest;
import static com.swqualityboard.ApiDocumentUtils.getDocumentResponse;
import static com.swqualityboard.response.ResponseStatus.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.SharedHttpSessionConfigurer.sharedHttpSession;

@ExtendWith(RestDocumentationExtension.class) // JUnit 5 사용시 문서 스니펫 생성용
@Import({TestConfig.class})
@WebMvcTest(controllers = MemoController.class, excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)}
)
class MemoControllerTest {
    @MockBean
    private MemoService memoService;

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

    @TestConfiguration
    static class DefaultConfigWithoutCsrf extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(final HttpSecurity http) throws Exception {
            super.configure(http);
            http.csrf().disable();
        }
    }

    @WithAuthUser(email = "admin1@gmail.com", role = "ROLE_ADMIN")
    @DisplayName("메모 작성 성공")
    @Test
    public void 메모_작성_성공() throws Exception {
        //given
        CreateMemoInput createMemoInput = CreateMemoInput.builder()
                .systemQualityId("6188fdc9948f96df1cff9ba1")
                .content("테스트입니다.")
                .build();

        //when
        doReturn(ResponseEntity.status(HttpStatus.CREATED).body(new Response<>(null, CREATED_MEMO))).when(memoService).createMemo(any(), any(CreateMemoInput.class));

        //then
        mockMvc.perform(post("/api/memos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer JWT ACCESS TOKEN")
                        .content(objectMapper.writeValueAsString(createMemoInput)).accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated()) // 201
                .andDo(
                        document(
                                "memoApi/create_memo/successful",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                requestHeaders(headerWithName("Authorization").description("Bearer JWT Token")),
                                requestFields(
                                        fieldWithPath("systemQualityId").type(JsonFieldType.STRING)
                                                .description("시스템 SW 품질지표 이력 번호")
                                                .attributes(key("constraint")
                                                        .value("최소 1개 이상의 시스템을 입력해주세요.")),
                                        fieldWithPath("content").type(JsonFieldType.STRING)
                                                .description("메모 내용")
                                                .attributes(key("constraint")
                                                        .value("최소 1자이상 입력해주세요."))
                                ),
                                responseFields(
                                        fieldWithPath("isSuccess").type(JsonFieldType.BOOLEAN)
                                                .description("요청 성공 여부"),
                                        fieldWithPath("statusCode").type(JsonFieldType.NUMBER)
                                                .description("응답 상태"),
                                        fieldWithPath("message").type(JsonFieldType.STRING)
                                                .description("응답 메시지"),
                                        fieldWithPath("timestamp").type(JsonFieldType.STRING)
                                                .description("api 호출 일시")
                                )
                        ));
    }

    @WithAuthUser(email = "admin1@gmail.com", role = "ROLE_ADMIN")
    @DisplayName("메모 수정 성공")
    @Test
    public void 메모_수정_성공() throws Exception {
        //given
        UpdateMemoInput updateMemoInput = UpdateMemoInput.builder()
                .content("테스트입니다22.")
                .build();

        //when
        doReturn(ResponseEntity.status(HttpStatus.OK).body(new Response<>(null, SUCCESS_UPDATE_MEMO))).when(memoService).updateMemo(any(), any(UpdateMemoInput.class));

        //then
        mockMvc.perform(patch("/api/memos/{id}", "memoId")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer JWT ACCESS TOKEN")
                        .content(objectMapper.writeValueAsString(updateMemoInput)).accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk()) // 200
                .andDo(
                        document(
                                "memoApi/update_memo/successful",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                requestHeaders(headerWithName("Authorization").description("Bearer JWT Token")),
                                requestFields(
                                        fieldWithPath("content").type(JsonFieldType.STRING)
                                                .description("수정한 메모 내용")
                                                .attributes(key("constraint")
                                                        .value("최소 1자이상 입력해주세요."))
                                ),
                                responseFields(
                                        fieldWithPath("isSuccess").type(JsonFieldType.BOOLEAN)
                                                .description("요청 성공 여부"),
                                        fieldWithPath("statusCode").type(JsonFieldType.NUMBER)
                                                .description("응답 상태"),
                                        fieldWithPath("message").type(JsonFieldType.STRING)
                                                .description("응답 메시지"),
                                        fieldWithPath("timestamp").type(JsonFieldType.STRING)
                                                .description("api 호출 일시")
                                )
                        ));
    }

    @WithAuthUser(email = "admin1@gmail.com", role = "ROLE_ADMIN")
    @DisplayName("메모 삭제 성공")
    @Test
    public void 메모_삭제_성공() throws Exception {
        //given

        //when
        doReturn(ResponseEntity.status(HttpStatus.OK).body(new Response<>(null, SUCCESS_DELETE_MEMO))).when(memoService).deleteMemo(any());

        //then
        mockMvc.perform(delete("/api/memos/{id}", "memoId")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer JWT ACCESS TOKEN"))
                .andDo(print())
                .andExpect(status().isOk()) // 200
                .andDo(
                        document(
                                "memoApi/delete_memo/successful",
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
                                        fieldWithPath("timestamp").type(JsonFieldType.STRING)
                                                .description("api 호출 일시")
                                )
                        ));
    }

}

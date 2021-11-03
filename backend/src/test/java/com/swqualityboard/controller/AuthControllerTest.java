package com.swqualityboard.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swqualityboard.TestConfig;
import com.swqualityboard.configuration.security.SecurityConfig;
import com.swqualityboard.dto.auth.LoginDto;
import com.swqualityboard.dto.auth.TokenDto;
import com.swqualityboard.exception.user.UserNotFoundException;
import com.swqualityboard.response.Response;
import com.swqualityboard.service.AuthService;
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
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import static com.swqualityboard.ApiDocumentUtils.getDocumentRequest;
import static com.swqualityboard.ApiDocumentUtils.getDocumentResponse;
import static com.swqualityboard.response.ResponseStatus.SUCCESS_SIGN_IN;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.SharedHttpSessionConfigurer.sharedHttpSession;

@ExtendWith(RestDocumentationExtension.class) // JUnit 5 사용시 문서 스니펫 생성용
@Import({TestConfig.class})
@WebMvcTest(controllers = AuthController.class, excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)}
)
class AuthControllerTest {
    @MockBean
    private AuthService authService;

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
                .addFilters(new CharacterEncodingFilter("UTF-8", true))
                .build();
    }

    @DisplayName("로그인 - 모든 유효성 검사에 통과했다면 로그인 성공")
    @Test
    public void 로그인() throws Exception {
        //given
        LoginDto loginDto = LoginDto.builder()
                .email("ssafy@gmail.com")
                .password("ssafy1234")
                .build();

        TokenDto tokenDto = TokenDto.builder().accessToken("eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6InNzYWZ5QGdtYWlsLmNvbSIsIm5pY2tuYW1lIjoiYWRtaW4xIiwicm9sZSI6IlJPTEVfRVhFQ1VUSVZFIiwiZXhwIjoxNjM1OTkyNjMxfQ.NRZ-TGDwHPtWILCXT_8WhD4WIAB_Ks1wafScDd8UMDJy93mJMo2rrE4yZkZuM2JEjukA2eMudthkrYi5EzF21A").build();

        //when
        doReturn(ResponseEntity.status(HttpStatus.OK).body(new Response<>(tokenDto, SUCCESS_SIGN_IN))).when(authService).authorize(any(LoginDto.class));

        //then
        mockMvc.perform(post("/api/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)).accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk()) // 200 isOk()
                .andDo(
                        document(
                                "authApi/authenticate/successful",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                requestFields(
                                        fieldWithPath("email").type(JsonFieldType.STRING)
                                                .description("이메일 주소")
                                                .attributes(key("constraint")
                                                        .value("최소 3글자, 최대 50글자 이내로 입력해주세요. @*.com의 양식을 갖추어야 합니다.")),
                                        fieldWithPath("password").type(JsonFieldType.STRING)
                                                .description("비밀번호")
                                                .attributes(key("constraint")
                                                        .value("최소 3글자, 최대 20글자 이내로 입력해주세요."))
                                ),
                                responseFields(
                                        fieldWithPath("isSuccess").type(JsonFieldType.BOOLEAN)
                                                .description("요청 성공 여부"),
                                        fieldWithPath("statusCode").type(JsonFieldType.NUMBER)
                                                .description("응답 상태"),
                                        fieldWithPath("message").type(JsonFieldType.STRING)
                                                .description("응답 메시지"),
                                        fieldWithPath("result.accessToken").type(JsonFieldType.STRING)
                                                .description("유저 JWT"),
                                        fieldWithPath("timestamp").type(JsonFieldType.STRING)
                                                .description("api 호출 일시")
                                )
                        ));
    }

    @DisplayName("로그인 실패 자격증명 불일치 - 자격 증명 실패로 로그인 실패")
    @Test
    public void 로그인_실패_자격증명() throws Exception {
        //given
        LoginDto loginDto = LoginDto.builder()
                .email("ssafy@gmail.com")
                .password("ssafy12345")
                .build();

        //when
        doThrow(new BadCredentialsException("자격 증명에 실패하였습니다.")).when(authService).authorize(any(LoginDto.class));

        //then
        mockMvc.perform(post("/api/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)).accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isUnauthorized()) // 401
                .andDo(
                        document(
                                "authApi/authenticate/failure_credential",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                requestFields(
                                        fieldWithPath("email").type(JsonFieldType.STRING)
                                                .description("이메일 주소")
                                                .attributes(key("constraint")
                                                        .value("최소 3글자, 최대 50글자 이내로 입력해주세요. @*.com의 양식을 갖추어야 합니다.")),
                                        fieldWithPath("password").type(JsonFieldType.STRING)
                                                .description("비밀번호")
                                                .attributes(key("constraint")
                                                        .value("최소 3글자, 최대 20글자 이내로 입력해주세요."))
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

    @DisplayName("로그인 실패 존재하지 않는 유저 - 존재하지 않는 유저로 로그인 실패")
    @Test
    public void 로그인_실패_존재하지_않는_유저() throws Exception {
        //given
        LoginDto loginDto = LoginDto.builder()
                .email("ssafyas@gmail.com")
                .password("ssafy12345")
                .build();

        //when
        doThrow(new UserNotFoundException("해당하는 이메일을 가진 유저가 존재하지 않습니다.")).when(authService).authorize(any(LoginDto.class));

        //then
        mockMvc.perform(post("/api/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginDto)).accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound()) // 404
                .andDo(
                        document(
                                "authApi/authenticate/failure_not_found",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                requestFields(
                                        fieldWithPath("email").type(JsonFieldType.STRING)
                                                .description("이메일 주소")
                                                .attributes(key("constraint")
                                                        .value("최소 3글자, 최대 50글자 이내로 입력해주세요. @*.com의 양식을 갖추어야 합니다.")),
                                        fieldWithPath("password").type(JsonFieldType.STRING)
                                                .description("비밀번호")
                                                .attributes(key("constraint")
                                                        .value("최소 3글자, 최대 20글자 이내로 입력해주세요."))
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
}

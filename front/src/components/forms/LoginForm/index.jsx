import {
  StyledForm,
  InputBox,
  StyledInput,
  ErrorMessage,
  StyledButton,
} from "./styles";

function LoginForm({ userId, password }) {
  return (
    <StyledForm>
      <InputBox>
        <StyledInput
          value={userId.value}
          onChange={userId.onChange}
          placeholder="아이디"
        />
        <ErrorMessage>{userId.isValid ? "" : userId.errorMessage}</ErrorMessage>
      </InputBox>
      <InputBox>
        <StyledInput
          type="password"
          value={password.value}
          onChange={password.onChange}
          placeholder="비밀번호"
        />
        <ErrorMessage>
          {password.isValid ? "" : password.errorMessage}
        </ErrorMessage>
      </InputBox>
      <InputBox>
        <StyledButton>로그인</StyledButton>
      </InputBox>
    </StyledForm>
  );
}

export default LoginForm;

import {
  StyledForm,
  InputBox,
  StyledInput,
  ErrorMessage,
  StyledButton,
} from "./styles";

function LoginForm({ email, password, inputWidth, onClick }) {
  return (
    <StyledForm>
      <InputBox>
        <StyledInput
          value={email.value}
          onChange={email.onChange}
          inputWidth={inputWidth}
          placeholder="E-Mail"
        />
        <ErrorMessage>{email.isValid ? "" : email.errorMessage}</ErrorMessage>
      </InputBox>
      <InputBox>
        <StyledInput
          type="password"
          value={password.value}
          inputWidth={inputWidth}
          onChange={password.onChange}
          placeholder="비밀번호"
        />
        <ErrorMessage>
          {password.isValid ? "" : password.errorMessage}
        </ErrorMessage>
      </InputBox>
      <InputBox>
        <StyledButton width={inputWidth} onClick={onClick}>
          로그인
        </StyledButton>
      </InputBox>
    </StyledForm>
  );
}

export default LoginForm;

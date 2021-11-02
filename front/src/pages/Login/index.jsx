import LoginForm from "../../components/forms/LoginForm";

import useAccount from "../../hooks/useAccount";
import { userIdValidator, passwordValidator } from "../../validator";
import { Wrapper } from "./styles";
function Login() {
  const userId = useAccount("", userIdValidator);
  const password = useAccount("", passwordValidator);
  return (
    <Wrapper>
      <LoginForm userId={userId} password={password}></LoginForm>
    </Wrapper>
  );
}
export default Login;

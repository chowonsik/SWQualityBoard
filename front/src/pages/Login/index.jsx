import { useState, useEffect } from "react";
import LoginForm from "../../components/forms/LoginForm";

import useAccount from "../../hooks/useAccount";
import { emailValidator, passwordValidator } from "../../validator";
import { Wrapper } from "./styles";
import { requestPost } from "../../lib/apis";
function Login() {
  const email = useAccount("", emailValidator);
  const password = useAccount("", passwordValidator);
  const [curWidth, setCurWidth] = useState(window.outerWidth);
  const [inputWidth, setInputWidth] = useState(500);

  useEffect(() => {
    if (curWidth > 768 && curWidth <= 1024) {
      setInputWidth(400);
    } else if (curWidth > 375 && curWidth <= 768) {
      setInputWidth(360);
    } else if (curWidth <= 375) {
      setInputWidth(300);
    }
  }, [curWidth]);

  function handleClickLogin(e) {
    e.preventDefault();
    email.onSubmit();
    password.onSubmit();
    if (email.isValid && password.isValid) {
      const data = {
        email: email.value,
        password: password.value,
      };
      requestPost("/authenticate", data)
        .then((res) => {
          console.log(res);
          const loginUser = {
            email: email.value,
            accessToken: res.result.accessToken,
          };
          localStorage.setItem("loginUser", JSON.stringify(loginUser));
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <Wrapper>
      <LoginForm
        email={email}
        password={password}
        inputWidth={inputWidth}
        onClick={handleClickLogin}
      ></LoginForm>
    </Wrapper>
  );
}
export default Login;

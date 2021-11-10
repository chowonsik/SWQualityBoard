import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import LoginForm from "../../components/forms/LoginForm";

import useAccount from "../../hooks/useAccount";
import { emailValidator, passwordValidator } from "../../validator";
import { Wrapper } from "./styles";
import { requestPost, requestGet } from "../../lib/apis";
function Login() {
  const email = useAccount("", emailValidator);
  const password = useAccount("", passwordValidator);
  const [curWidth, setCurWidth] = useState(window.outerWidth);
  const [inputWidth, setInputWidth] = useState(500);
  const history = useHistory();

  useEffect(() => {
    if (curWidth > 768 && curWidth <= 1024) {
      setInputWidth(400);
    } else if (curWidth > 375 && curWidth <= 768) {
      setInputWidth(360);
    } else if (curWidth <= 375) {
      setInputWidth(300);
    }
  }, [curWidth]);

  function movePageByRole(role) {
    switch (role) {
      case "ROLE_DEVELOPER":
        history.push("/team");
        break;
      case "ROLE_ADMIN":
        history.push("/system");
        break;
      case "ROLE_EXECUTIVE":
        history.push("/");
        break;
      default:
        history.push("/login");
    }
  }
  async function setLoginUser(userInfo) {
    const loginUser = userInfo;
    await localStorage.setItem("loginUser", JSON.stringify(loginUser));
  }

  async function setAccessToken(accessToken) {
    const token = {
      accessToken,
    };
    await localStorage.setItem("token", JSON.stringify(token));
  }

  async function getUserInfo() {
    return await requestGet("/users");
  }
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
          switch (res.statusCode) {
            case 200:
              setAccessToken(res.result.accessToken).then(() => {
                getUserInfo().then((res) => {
                  setLoginUser(res.result);
                  movePageByRole(res.result.authorities[0].role);
                });
              });

              break;
            case 401:
              console.log("자격증명에 실패");
              break;
            case 404:
              console.log("존재하지않는 유저");
              break;
          }
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

import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { UserDispatch } from "../../App";
import LoginForm from "../../components/forms/LoginForm";

import useAccount from "../../hooks/useAccount";
import { emailValidator, passwordValidator } from "../../validator";
import ToastMessage from "../../components/common/ToastMessage";
import { Wrapper } from "./styles";
import { requestPost, requestGet } from "../../lib/apis";
function Login() {
  const dispatch = useContext(UserDispatch);
  const email = useAccount("", emailValidator);
  const password = useAccount("", passwordValidator);
  const [curWidth, setCurWidth] = useState(window.outerWidth);
  const [inputWidth, setInputWidth] = useState(500);
  const [toastMessage, setToastMessage] = useState("");
  const [toastActive, setToastActive] = useState(false);
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

    const nickName = JSON.parse(localStorage.getItem("loginUser"))["nickname"];
    dispatch({ type: "CREATE_NICKNAME", nickName });
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
            setToastActive(true);
            setToastMessage("정확한 정보를 입력해주세요.");
            break;
          case 404:
            setToastActive(true);
            setToastMessage("존재하지 않는 사용자입니다.");
            break;
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <Wrapper>
      <ToastMessage
        isActive={toastActive}
        setIsActive={setToastActive}
        message={toastMessage}
      />
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

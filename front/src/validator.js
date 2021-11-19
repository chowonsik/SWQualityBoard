export function emailValidator(value) {
  const emailCheck =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  if (value.length === 0) {
    return { isValid: false, errorMessage: "이메일을 입력해주세요." };
  } else if (value.length < 3) {
    return {
      isValid: false,
      errorMessage: "이메일을 3글자 이상으로 입력해주세요.",
    };
  } else if (value.length > 50) {
    return {
      isValid: false,
      errorMessage: "이메일을 50글자 이하로 입력해주세요.",
    };
  } else if (!emailCheck.test(value)) {
    return { isValid: false, errorMessage: "이메일 형식으로 입력해주세요." };
  }

  return { isValid: true, errorMessage: "" };
}

export function passwordValidator(value) {
  if (value.length === 0) {
    return { isValid: false, errorMessage: "비밀번호를 입력해주세요." };
  } else if (value.length < 3) {
    return {
      isValid: false,
      errorMessage: "비밀번호를 3글자 이상으로 입력해주세요.",
    };
  } else if (value.length > 20) {
    return {
      isValid: false,
      errorMessage: "비밀번호를 20글자 이하로 입력해주세요.",
    };
  }
  return { isValid: true, errorMessage: "" };
}

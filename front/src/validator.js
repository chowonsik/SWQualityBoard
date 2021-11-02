export function userIdValidator(value) {
  if (value.length < 2 || value.length > 10) {
    return { isValid: false, errorMessage: "2~16글자를 입력해주세요." };
  } else {
    return { isValid: true, errorMessage: "" };
  }
}

export function passwordValidator(value) {
  if (value.length < 6 || value.length > 18) {
    return { isValid: false, errorMessage: "6~18글자를 입력해주세요." };
  } else {
    return { isValid: true, errorMessage: "" };
  }
}

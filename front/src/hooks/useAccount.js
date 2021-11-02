import { useState } from "react";

const useAccount = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(
    validator ? validator(initialValue).isValid : false
  );

  const onChange = (e) => {
    setValue(e.target.value);
    if (validator) {
      const result = validator(value);
      setIsValid(result.isValid);
      setErrorMessage(result.errorMessage);
    }
  };

  return { value, onChange, isValid, errorMessage };
};

export default useAccount;

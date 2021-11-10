import { useEffect } from "react";
import { Wrapper, Message } from "./styles";

function ToastMessage({ isActive, setIsActive, message }) {
  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false);
      }, 2000);
    }
  });

  return (
    <Wrapper isActive={isActive}>
      <Message>{message}</Message>
    </Wrapper>
  );
}
export default ToastMessage;

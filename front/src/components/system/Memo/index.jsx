import { MemoContainer, Wrapper } from "./style";

function Memo({ setMemoOpened }) {
  function close() {
    setMemoOpened(false);
  }
  function handleCompleteButtonClick() {
    close();
  }
  function handleCancleButtonClick() {
    close();
  }
  return (
    <Wrapper onClick={close}>
      <MemoContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <textarea
          name="memo"
          id="memo"
          placeholder="메모를 입력하세요."
        ></textarea>
        <div className="buttons">
          <button className="complete" onClick={handleCompleteButtonClick}>
            확인
          </button>
          <button className="cancle" onClick={handleCancleButtonClick}>
            취소
          </button>
        </div>
      </MemoContainer>
    </Wrapper>
  );
}

export default Memo;

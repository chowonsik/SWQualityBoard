import { useEffect, useRef, useState } from "react";
import { request, requestPost } from "../../../lib/apis";
import { MemoContainer, Wrapper } from "./style";

function Memo({ closeMemo, memo, showToastMessage, initData }) {
  const [value, setValue] = useState(memo.content ? memo.content : "");
  const [mode, setMode] = useState("read");
  const inputRef = useRef(null);

  async function handleCompleteButtonClick() {
    if (!value.split(" ").join("")) {
      return;
    }
    // 메모 작성
    if (mode === "write") {
      const result = await requestPost("/memos", {
        systemQualityId: memo.systemQualityId,
        content: value,
      });
      if (result.statusCode === 201) {
        initData();
        setMode("read");
        showToastMessage("메모 작성 완료");
      }
    }
    // 메모 수정
    else {
      const result = await request("PATCH", `/memos/${memo.id}`, {
        content: value,
      });
      if (result.statusCode === 200) {
        initData();
        setMode("read");
        showToastMessage("메모 수정 완료");
      }
    }
  }
  function handleCancleButtonClick() {
    closeMemo();
  }

  async function handleDeleteButtonClick() {
    const result = await request("DELETE", `/memos/${memo.id}`);
    if (result.statusCode === 200) {
      showToastMessage("메모 삭제 완료");
      initData();
      closeMemo();
    }
  }

  function handleModifyButtonClick() {
    setMode("modify");
    inputRef.current.focus();
    inputRef.current.value = "";
  }

  useEffect(() => {
    if (value) {
      setMode("read");
    } else {
      setMode("write");
    }
  }, [memo]);
  return (
    <Wrapper onClick={closeMemo}>
      <MemoContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <textarea
          name="memo"
          id="memo"
          placeholder="메모를 입력하세요."
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          ref={inputRef}
          readOnly={mode === "read" ? true : false}
        ></textarea>
        <div className="buttons">
          {mode === "read" ? (
            <>
              <button className="modify" onClick={handleModifyButtonClick}>
                수정
              </button>
              <button className="delete" onClick={handleDeleteButtonClick}>
                삭제
              </button>
              <button className="cancle" onClick={handleCancleButtonClick}>
                취소
              </button>
            </>
          ) : (
            <>
              <button className="complete" onClick={handleCompleteButtonClick}>
                완료
              </button>
              <button className="cancle" onClick={handleCancleButtonClick}>
                취소
              </button>
            </>
          )}
        </div>
      </MemoContainer>
    </Wrapper>
  );
}

export default Memo;

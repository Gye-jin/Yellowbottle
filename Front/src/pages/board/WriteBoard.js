import React, { useState } from "react";
import { ForPostBoardWrite } from "../../Api/BoardData";
import Swal from "sweetalert2";

function WriteBoard() {
  // [변수 지정]----------------------------------------------------------------
  // 게시글 내용
  const [boardContent, setBoardContent] = useState("");
  // 사진추가 버튼 이미지
  const writeDefaultImg = "/img/BoardWriteDefaultImg.png";
  // 사진 파일 URL
  // 설명: 여러개 올릴 경우를 대비해 "" 이 아닌 []로 설정했다. 사용자가 미리 보기하기 위한 state
  const [fileImage, setFileImage] = useState(writeDefaultImg);

  // sesseionId
  const userSession = sessionStorage.getItem("sessionId");
  // DB에 저장될 이미지
  const [selectImage, setSelectImage] = useState([]);

  // [함수 지정]----------------------------------------------------------------
  // 게시글 작성하면 그 value를 인식하게 해주는 함수
  const changeBoardContent = (e) => {
    setBoardContent(e.target.value);
  };

  // 파일 선택하기 +  선택 파일 미리보기
  const addImage = (e) => {
    // preventDefault() 확인 해볼것 !!!
    e.preventDefault();

    // 선택된 파일을 selectedImage로 선언
    const selectedImage = e.target.files;

    const fileImageURL = URL.createObjectURL(selectedImage[0]);

    setFileImage(fileImageURL);
    setSelectImage(selectedImage[0]);
  };

  // 게시글 작성 버튼을 누르면 이미지파일과 게시글을 백에 보내주는 함수
  const sendBoardWriteData = (e) => {
    // 실행시 화면새로고침 방지
    e.preventDefault();
    if (writeDefaultImg !== fileImage && boardContent.length >= 10) {
      let boardWriteData = new FormData();
      boardWriteData.append("sessionId", userSession);
      boardWriteData.append("boardContent", boardContent);
      boardWriteData.append("image", selectImage);
      // 입력된 값들을 boardWriteData에 넣는다.
      ForPostBoardWrite(boardWriteData);
    } else {
      Swal.fire({
        icon: "error",
        text: "게시글작성은 사진1장과 최소 10자의 내용이 필요합니다",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <br />
      <form encType="multipart/form-data">
        <div className="BoardWrite-outerBox">
          <div className="BoardWrite-innerBox">
            <div className="BoardWrite-box">
              <div className="BoardWrite-header">
                {/* 왼쪽 : 사진 업로드 부분 */}
                <div className="BoardWrite-leftBox">
                  {/* <h2>미리보기 이미지</h2> */}

                  {fileImage != null && (
                    <div>
                      <label htmlFor="fileImg">
                        <div>
                          <img
                            className="BoardWrite-defaultImg"
                            src={fileImage}
                            alt="이미지 추가하기"
                          />
                          <p></p>
                        </div>
                      </label>

                      <input
                        id="fileImg"
                        className="BoardWrite-selectImg"
                        name="file"
                        type="file"
                        accept="image/*"
                        required // 기능: 반드시 선택되어야 함
                        onChange={(e) => addImage(e)}
                      />
                    </div>
                  )}
                </div>
                {/* 오른쪽 : 게시글 업로드 부분 */}
                <div className="BoardWrite-rightBox">
                  {/* type = "file" accept image/*을 통해  형식의 파일만 올릴 수 있도록 한다. */}
                  <input
                    id="fileImg"
                    type="file"
                    name="file"
                    accept="image/*"
                    required // 반드시 파일이 선택되어야 하는지 여부를 지정하는 속성
                    // multiple="multiple" // 여러개 선택 가능하게 -> 현재는 한개만 올릴 수 있도록 했기 떄문에 주석처리
                    onChange={addImage}
                    className="BoardWrite-selectImg"
                  />
                  <br />
                  <textarea
                    onChange={changeBoardContent}
                    className="BoardWrite-boardContent"
                    placeholder="게시글 내용을 입력하세요(최소 10자)"
                    id="boardContent"
                  />
                  <br />
                </div>
              </div>
            </div>
            {/* 버튼을 누를시 선택한 파일과 작성된 게시글 데이터를 boardWriteData에 담아 이를 백에 전달한다. */}
            <button onClick={sendBoardWriteData}>게시글 작성</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default WriteBoard;

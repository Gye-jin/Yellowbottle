import React, { useState } from "react";
import Header from "../../components/header/Header";
import { ForPostBoardWrite } from "../../Api/BoardData";

function BoardWrite() {
  // 게시글
  const [boardContent, setBoardContent] = useState("");
  // 사진파일: 여러개 올릴 경우를 대비해 "" 이 아닌 []로 설정했다. 사용자가 미리 보기하기 위한 state
  const [fileImage, setFileImage] = useState([]);
  // 게시글 작성 페이지는 로그인된 회원만 들어올 수 있음
  // 따라서 세션에 저장되어있는 userId의 value값을 이용해 백에다 누가 글을 썼는지 확인시킬 수 있음
  const userSession = sessionStorage.getItem("sessionId");
  // 게시글 작성하면 그 value를 인식하게 해주는 함수
  const changeBoardContent = (e) => {
    setBoardContent(e.target.value);
  };
  // 선택된 이미지
  const [selectImage, setSelectImage] = useState([]);
  // 기존이미지 <-> 선택한이미지
  const [isVisible, setIsVisible] = useState(false);
  // 클릭하면 이미지 바뀜
  function handleClick() {
    setIsVisible(!isVisible);
  }

  // 파일 선택하기 버튼을 누르면 사진을 추가할 수 있고 화면에 미리보기 할 수 있게 해주는 함수
  const addImage = (e) => {
    e.preventDefault();
    // 선택된 파일을 selectImage로 선언
    const selectImage = e.target.files;
    // 현재 fileImage를 복사
    const fileImageCopy = [...fileImage];
    // for문을 통해 사진을 여러개 넣을 수 있다.
    for (let i = 0; i < selectImage.length; i += 1) {
      console.log(selectImage[i]);
      console.log(selectImage[i].name);
      // 리엑트에서 input에 사진을 넣으면 해당 사진의 상대경로를 콘솔에서 블러처리한다.
      // 따라서 URL.createObjectURL을 사용해서 업로드된 파일의 상대경로를 만들어주면된다.
      const fileImageURL = URL.createObjectURL(selectImage[i]);
      // 위에 복사해둔 fileImageCopy에 미리보기 할 사진을 추가한다.
      fileImageCopy.push(fileImageURL);
    }
    // 복사한 파일을 setFileImage를 통해 fileImage를 통해 변경한다. -> 바뀐 fileImage를 통해 화면에서 우리가 선택한 이미지를 볼 수 있다.
    setFileImage(fileImageCopy);
    // 선택된 이미지 파일을 selectImage에 넣어 백에 보낼 때 사용한다.
    setSelectImage(selectImage[0]);
    setIsVisible(!isVisible);
  };

  // 게시글 작성 버튼을 누르면 이미지파일과 게시글을 백에 보내주는 함수
  const createBoardWriteData = (e) => {
    // 실행시 화면새로고침 방지
    e.preventDefault();
    //  FormData를 통해 각각의 입력값들이 변화되면 바뀐 value값 확인 가능!
    let boardWriteData = new FormData();
    boardWriteData.append("sessionId", userSession);
    boardWriteData.append("boardContent", boardContent);
    boardWriteData.append("image", selectImage);
    // 입력된 값들을 boardWriteData에 넣는다.
    console.log("boardWriteData: ", boardWriteData);
    ForPostBoardWrite(boardWriteData);
    window.location.reload();
  };

  return (
    <>
      <Header />
      <br />
      {/* 왼쪽 : 사진 업로드 부분 */}
      <form encType="multipart/form-data">
        <div className="BoardWrite-outerBox">
          <div className="BoardWrite-innerBox">
            <div className="BoardWrite-box">
              <div className="BoardWrite-header">
                <div className="BoardWrite-leftBox">
                  {/* <h2>미리보기 이미지</h2> */}
                  {isVisible ? (
                    <div>
                      {/* 파일이미지와 파일이미지의 주소가 같다면 선택한 이미지파일을 화면에 미리보여준다. */}
                      {fileImage && (
                        <img
                          alt="미리보기 이미지"
                          src={fileImage}
                          className="BoardWrite-prevImg"
                          onClick={handleClick}
                        />
                      )}
                    </div>
                  ) : (
                    <label for="fileImg">
                      <img
                        className="BoardWrite-defaultImg"
                        src="/img/BoardWriteDefaultImg.png"
                        alt="imageAboutDefaultImg"
                      />
                    </label>
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
                    placeholder="게시글 내용을 입력하세요"
                    id="boardContent"
                  />
                  <br />
                </div>
              </div>
            </div>
            {/* 버튼을 누를시 선택한 파일과 작성된 게시글 데이터를 boardWriteData에 담아 이를 백에 전달한다. */}
            <button onClick={createBoardWriteData}>게시글 작성</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default BoardWrite;

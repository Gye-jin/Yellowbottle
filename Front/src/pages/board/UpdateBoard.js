import React, { useEffect, useState } from "react";
import { DetailBoardFetchData, ForPostUpdateBoard } from "../../Api/BoardData";

const UpBoardTest = ({ boardNo }) => {
  // [변수]
  // 가져올 게시글
  const [board, setBoard] = useState([]);
  // 기존 게시물 file
  const [originFileImage, setOriginFileImage] = useState([]);
  // 미리보기 이미지 url
  const [fileImage, setFileImage] = useState("");
  //  입력한 게시글 내용
  const [newBoardContent, setNewBoardContent] = useState("");

  // 해당유저의 세션아이디
  const userSession = sessionStorage.getItem("sessionId");
  // DB에 저장될 이미지
  const [selectImage, setSelectImage] = useState([]);

  // [함수]
  // 입력한 boardContent 변화 감지
  const boardContentHandler = (e) => {
    setNewBoardContent(e.target.value);
  };

  // Board의 file 변경하기
  const changeImage = (e) => {
    // e.preventDefault();

    const selectImage = e.target.files;
    const fileImageURL = URL.createObjectURL(selectImage[0]);

    setFileImage(fileImageURL);
    setSelectImage(selectImage[0]);
  };

  // 수정한 이미지와 게시글을 백에 보내기
  const createUpdateBoardData = (e) => {
    e.preventDefault();
    // 게시물 내용 변경 X && 게시물 파일 변경
    if (newBoardContent.length == 0 && originFileImage != fileImage) {
      let updateBoardData = new FormData();
      updateBoardData.append("sessionId", userSession);
      updateBoardData.append("images", selectImage);
      updateBoardData.append("boardNo", boardNo);
      updateBoardData.append("boardContent", board.boardContent);
      ForPostUpdateBoard(updateBoardData);
      window.location.reload();
    }
    // 게시글 내용만 변경 / 게시물 파일 변경 X
    else if (newBoardContent.length != 0 && originFileImage == fileImage) {
      let updateBoardData = new FormData();
      updateBoardData.append("sessionId", userSession);
      updateBoardData.append("images", board.files);
      updateBoardData.append("boardNo", boardNo);
      updateBoardData.append("boardContent", newBoardContent);
      ForPostUpdateBoard(updateBoardData);
      window.location.reload();
    }
    // 게시글 내용만 변경 / 게시물 파일 변경
    else if (newBoardContent.length != 0 && originFileImage != fileImage) {
      let updateBoardData = new FormData();
      updateBoardData.append("sessionId", userSession);
      updateBoardData.append("images", selectImage);
      updateBoardData.append("boardNo", boardNo);
      updateBoardData.append("boardContent", newBoardContent);
      ForPostUpdateBoard(updateBoardData);
      window.location.reload();
    }
    // 변경사항 없음
    else {
      alert("변경된 사항이 없습니다.");
    }
  };

  // [useEffect]
  // 게시글 수정 접속 시 기존 게시글 정보를 백에서 가져오기
  useEffect(() => {
    const response = DetailBoardFetchData(boardNo);
    response.then((data) => {
      setBoard(data);
      setSelectImage(data.files);
      setOriginFileImage(data.files[0].filePath + data.files[0].fileName);
      setFileImage(data.files[0].filePath + data.files[0].fileName);
    });
  }, []);

  return (
    <>
      <form encType="multipart/form-data">
        <div className="BoardUpdate-outerBox">
          <div className="BoardUpdate-innerBox">
            <div className="BoardUpdate-box">
              <div className="BoardUpdate-header">
                {/* 사진이 들어가 있는 왼쪽 box */}
                <div className="BoardUpdate-leftBox">
                  {fileImage != null && (
                    <div>
                      <label htmlFor="fileImg">
                        <div>
                          <img
                            className="BoardWrite-defaultImg"
                            src={fileImage}
                            alt="이미지 미리보기"
                          />
                          <p></p>
                        </div>
                      </label>

                      <input
                        id="fileImg"
                        className="BoardUpdate-selectImg"
                        name="file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => changeImage(e)}
                      />
                    </div>
                  )}
                </div>
                {/* 게시글 내용이 들어가 있는 오른쪽 box */}
                <div className="BoardUpdate-rightBox">
                  <textarea
                    onChange={boardContentHandler}
                    className="BoardUpdate-boardContent"
                    placeholder="게시글을 작성해주세요."
                    defaultValue={board.boardContent}
                    id="boardContent"
                  />
                </div>
              </div>
            </div>
            {/* 버튼을 누를시 선택한 파일과 작성된 게시글 데이터를 boardWriteData에 담아 이를 백에 전달한다. */}
            <button onClick={createUpdateBoardData}>게시글 수정</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpBoardTest;

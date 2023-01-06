// Loading.js
import React from "react";
import { Background, LoadingText } from "./Styles";
import Spinner from "./Spinner.gif";

const Loading = () => {
  return (
    <Background>
      <LoadingText>보내는 중입니다..</LoadingText>
      <img src={Spinner} alt="로딩중" width="15%" />
    </Background>
  );
};
export default Loading;

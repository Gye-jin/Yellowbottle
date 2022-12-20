import React from "react";
import { useState } from "react";

function NotFound() {
  const choices = ["가위", "바위", "보"];

  // 사용자의 입력을 받습니다.
  const userChoice = prompt("가위, 바위, 보 중 하나를 입력하세요.");
  // 결과 저장
  const [result, setResult] = useState("");
  // 컴퓨터의 선택을 랜덤으로 생성합니다.
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // 승부를 가립니다.
  if (userChoice === computerChoice) {
    console.log("비겼습니다!");
  } else if (
    (userChoice === "가위" && computerChoice === "보") ||
    (userChoice === "바위" && computerChoice === "가위") ||
    (userChoice === "보" && computerChoice === "바위")
  ) {
    console.log("승리");
    setResult("🌍이겼습니다!🌍");
  } else {
    console.log("패배");
    setResult("🌚졌지롱🌚");
  }
  return (
    <>
      <h1>{result}</h1>
    </>
  );
}

export default NotFound;

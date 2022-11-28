import axios from "axios";
import { useState, useEffect } from "react";

// axios  .... get 뿐만 아니라 post, push, delete 등 다른 axios 사용 방법들도 찾아보기
export const fetchData = async (currentPage, size) => {
  const response = await axios.get("http://localhost:8080/api/page", {
    params: {
      page: currentPage,
      size: size,
    },
  });
  return response.data;
};

export const diaryFetchData = async (diaryNumber) => {
  const response = await axios.get(
    "http://localhost:8080/api/diary/" + diaryNumber
  );

  return response.data;
};

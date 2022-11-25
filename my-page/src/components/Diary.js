import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { diaryFetchData } from "../Api/data";

function Diary() {
  const { diaryNumber } = useParams();
  const [diary, setDiary] = useState([]);

  useEffect(() => {
    const response = diaryFetchData(diaryNumber);
    response.then((data) => setDiary(data));
  }, []);

  return (
    <div>
      <div>
        {diaryNumber}---{diary.title}
        <div>{diary.content}</div>
        <div>
          {diary.createDate}---{diary.modifiedDate}
        </div>
      </div>
    </div>
  );
}

export default Diary;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Diary() {
  const { diaryNo } = useParams();

  const [diary, setDiary] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/diary/" + { diaryNo }
      );

      setDiary(response.data);

      setTitle(response.data.title);
      setContent(response.data.content);
      setCreateDate(response.data.createDate);
      setModifiedDate(response.data.modifiedDate);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        {diaryNo}-{title}-{content}-{createDate}-{modifiedDate}
      </div>
    </div>
  );
}

export default Diary;

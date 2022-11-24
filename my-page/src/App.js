import logo from "./logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Diary from "./components/Diary";

function App() {
  const [currentPage, setCurrentPage] = useState(11);
  const [postsPerPage, setPostPerPage] = useState(10);

  const [diaryListDTO, setDiaryListDTO] = useState([]);

  const [posts, setPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [end, setEnd] = useState(0);
  const [start, setStart] = useState(0);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const [pageList, setPageList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8080/api/page", {
        params: {
          page: currentPage,
          size: postsPerPage,
        },
      });
      setDiaryListDTO(response.data);

      setPosts(response.data.dtoList);
      setTotalPage(response.data.totalPage);
      setPage(response.data.page);
      setSize(response.data.size);
      setEnd(response.data.end);
      setStart(response.data.start);
      setPrev(response.data.prev);
      setNext(response.data.next);
      setPageList(response.data.pageList);
    };
    fetchData();
  }, [currentPage]);
  // console.log(next);

  // 페이지네이션을 위한 필요 데이터
  /*
      1. 페이지당 출력 개수(10) postsPerPage
      2. indexOfLastPage
      3. indexOfFirstPage
      4. currentPage
  */

  return (
    <div className="App">
      <Routes>
        <Route
          path="/postList"
          element={
            <Posts
              posts={posts}
              prev={prev}
              next={next}
              start={start}
              end={end}
              pageList={pageList}
              setCurrentPage={setCurrentPage}
            />
          }
        />
        <Route path="/diary/:diaryNumber" element={<Diary />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import { fetchData } from "./Api/data";

// master
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(10);
  const [data, setData] = useState("");
  useEffect(() => {
    const response = fetchData(currentPage, size);
    response.then((response) => setData(response));
  }, [currentPage]);

  // 페이지 네이션을 위한 필요 데이터
  /* 
  1. 페이지당 출력 개수(10) postPerPage
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
              posts={data.dtoList}
              prev={data.prev}
              next={data.next}
              start={data.start}
              end={data.end}
              pageList={data.pageList}
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

import React from "react";
import Pagination from "./Pagination";

const Posts = ({ posts, prev, next, start, end, pageList, setCurrentPage }) => {
  return (
    <div>
      <ul>
        {posts ? (                        
          posts.map((post) => (
            <li key={post.no}>
              <a href={"http://localhost:3000/diary/" + post.no}>
                {post.no} - {post.title}
              </a>
            </li>
          ))
        ) : (
          <></>
        )} 
        {/*  삼항연산자 ... t : t : t 일시 t라 생각하고 세번째 t가 실행되지 않는다. 그러나 t : f : t일시 첫번째와 두번째의 결과가 f이기 때문에 세번째 t가 실행된다.*/}
      </ul>
      <Pagination
        prev={prev}
        next={next}
        start={start}
        end={end}
        pageList={pageList}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </div>
  );
};

export default Posts;

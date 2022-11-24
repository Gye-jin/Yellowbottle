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

import React from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const Posts = ({ posts, prev, next, start, end, pageList, setCurrentPage }) => {
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.no}>
            {/* <div>
              <p>{post.no}</p>
              <p>{post.title}</p>
            </div> */}
            {/* <Link to={}> */}
            <a href={"http://localhost:3000/diary/" + post.no}>
              {post.no} - {post.title}
            </a>
            {/* </Link> */}
          </li>
        ))}
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

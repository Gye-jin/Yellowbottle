import React from "react";

const Posts = ({ posts }) => {
  return (
    <div>
      <ul>
        {posts ? (
          posts.map((post) => (
            <li key={post.no}>
              {post.no} - {post.title}
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default Posts;

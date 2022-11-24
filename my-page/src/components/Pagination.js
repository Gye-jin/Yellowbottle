import React from "react";
import styled from "styled-components";

const PageUl = styled.ul`
  float: left;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
  padding: 1px;
  border-top: 3px solid #186ead;
  border-bottom: 3px solid #186ead;
  background-color: rgba(0, 0, 0, 0.4);
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 25px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;

const Pagination = ({ prev, next, start, end, pageList, setCurrentPage }) => {
  // const Pagination = ({ {prev, next, start, end, pageNoList}, setCurrentPage }) => {
  return (
    <div>
      <nav>
        <PageUl>
          {prev ? (
            <PageLi onClick={() => setCurrentPage(start - 10)}>←</PageLi>
          ) : (
            <></>
          )}
          {pageList.map((pageNo) => (
            <PageLi key={pageNo} onClick={() => setCurrentPage(pageNo)}>
              <PageSpan>{pageNo}</PageSpan>
            </PageLi>
          ))}
          {next ? (
            <PageLi onClick={() => setCurrentPage(end + 1)}>→</PageLi>
          ) : (
            <></>
          )}
        </PageUl>
      </nav>
    </div>
  );
};

export default Pagination;

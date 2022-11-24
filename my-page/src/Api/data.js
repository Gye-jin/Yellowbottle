import axios from "axios";
import { useState, useEffect } from "react";

// axios
export const fetchData = async (currentPage, size) => {
  const response = await axios.get("http://localhost:8080/api/page", {
    params: {
      page: currentPage,
      size: size,
    },
  });
  return response.data;
};

import Header from "../components/Header";
import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import styled from "styled-components";

const FindPw = () => {
  _findPassword = async function () {
    // 각 id,mail,birth 인풋값가져오기
    const user_id = document.getElementByName("findPwId")[0].value.trim(); //앞뒤공백 전처리
    const email_id = document.getElementsByName("findPwEmail")[0].value.trim();
    const birth_id = document.getElementByName("findPwBirth")[0].value.trim();

    //각 입력값 체크
    const id_check = /^[a-z]+[a-z0-9]{5,19}$/g;
    const email_check =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!id_check.test(user_id)) {
    }
  };
  return (
    <div className="findPw_div">
      <h2> 비밀번호 찾기 </h2>

      <div>
        <input
          type="text"
          maxLength="15"
          name="findPwId"
          placeholder="id 입력 (ex.czero00)"
        />
      </div>
      <div>
        <input
          type="text"
          maxLength="25"
          name="findPwEmail"
          placeholder="email 입력 (ex.czero00@gmail.com)"
          onfocus="this.placeholder=''"
        />
      </div>
      <div>
        <input
          type="number"
          maxLength="6"
          name="findPwBirth"
          placeholder="생년월일 입력 (ex.990820)"
        />
      </div>
      <div>
        <input type="button" value="인증번호 발송" name="numgo" />
      </div>
    </div>
  );
};

export default FindPw;

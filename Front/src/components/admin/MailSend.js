// https://babycoder05.tistory.com/entry/React-%EC%B2%B4%ED%81%AC%EB%B0%95%EC%8A%A4-%EC%A0%84%EC%B2%B4-%EC%84%A0%ED%83%9D%ED%95%B4%EC%A0%9C-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
import { ForContentData } from "../../Api/MailData";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const StyledTable0 = styled.div`
  display: flex;
  // height: 100%;
`;

const StyledTable1 = styled.table`
  display: inline;
  // margin: 30px;
  text-align: center;
  border-collapse: collapse;
  // width:600px;
  float: left;
  width: 50%;
  height: 500px;
  thead {
    tr {
      th {
        padding: 10px 15px;
        background-color: #888;
        color: #fff;
        font-weight: 700;
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
      }
    }
  }
  .second-row {
    width: 600px;
  }
`;

const StyledTable2 = styled.table`
  display: inline;
  text-align: center;
  border-collapse: collapse;
  height: 500px;
  margin-top: 40px;
  float: right;
  width: 50%;
  right: 0%;
  top: 23%;
  thead {
    tr {
      th {
        padding: 10px 15px;
        background-color: #888;
        border-right: 2px solid white;
        color: black;
        font-weight: 700;
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
      }
    }
  }
  .second-row {
    width: 1000px;
  }
`;
const Select2 = styled.select`
  // float: center;
  margin: 0;
  min-width: 0;
  // display: inline;
  width: 30%;
  padding: 8px 8px;
  font-size: inherit;
  // line-height: inherit;
  height: 40px;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
  &:focus {
    border-color: red;
  }
`;
const Btn = styled.button`
  background-color: green;
  color: white;
  width: 140px;
  height: 40px;
`;
const Btn2 = styled.div`
  position: fixed;
  bottom: 150px;
  right: 230px;
`;
// const options = [
//   { value: "비건", label: "비건" },
//   { value: "제로웨이스트", label: "제로웨이스트" },
//   { value: "플로깅", label: "플로깅" },
// ];
const MailSend = () => {
  //체크박스 고르기
  const selectList = ["비건", "제로웨이스트", "플로깅"];

  // 선택된거 받기
  const [selected, setSelected] = useState("");

  // 체크박스 선택
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  // 백에서 보낸 contents 받는 공간
  const [contents, setContent] = useState([]);

  // 보낼 No을 받고
  // 2는 목록에 보여줄 title

  // 체크된 아이템을 담을 배열 << spring으로 전송용  contentNo
  const [checkContent, setCheckContents] = useState([]);

  // 체크된 아이템을 담을 배열 << 선택 목록 화면에 뛰울용 Title
  const [checkContent2, setCheckContents2] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id, title) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckContents((prev) => [...prev, id]);
      // 단일 선택 시 체크된 아이템을 배열10 에 추가
      setCheckContents2((prev) => [...prev, title]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckContents(checkContent.filter((el) => el !== id));
      setCheckContents2(checkContent2.filter((el1) => el1 !== title));
    }
  };

  const sendMail = async (mailData) => {
    // 전체 게시물(ID)보기 _피드게시물넘버에 맞게 가져오기.
    const response = await axios.get(
      `http://localhost:8080/api/mail?FirstcontentNo=${mailData[0]}&SecondcontentNo=${mailData[1]}&ThirdcontentNo=${mailData[2]}`
    );
    setCheckContents([]);
    setCheckContents2([]);
    console.log(response);
  };

  useEffect(() => {
    ForContentData("비건", setContent);
  }, []);

  useEffect(() => {
    ForContentData(selected, setContent);
  }, [selected]);

  return (
    <>
      <StyledTable0>
        <StyledTable1>
          <Select2
            onChange={handleSelect}
            value={selected}
            defaultValue="제로웨이스트"
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </Select2>

          <thead>
            <tr>
              <th></th>
              <th className="second-row">목록</th>
            </tr>
          </thead>
          <tbody>
            {contents?.map((contents, key) => (
              <tr key={key}>
                <td>
                  <input
                    type="checkbox"
                    name={`select-${contents.contentNo}`}
                    onChange={(e) =>
                      handleSingleCheck(
                        e.target.checked,
                        contents.contentNo,
                        contents.contentTitle
                      )
                    }
                    // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                    checked={
                      checkContent.includes(contents.contentNo) ? true : false
                    }
                  />
                </td>
                <td className="second-row">
                  <a href={contents.contentUrl} target="blank">
                    {contents.contentTitle}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable1>

        <StyledTable2>
          <thead>
            <tr>
              <th></th>
              <th className="second-row">목록</th>
            </tr>
          </thead>
          <tbody>
            {checkContent2?.map((checkContent2, key) => (
              <tr key={key}>
                <td></td>
                <td className="second-row">{checkContent2}</td>
              </tr>
            ))}
          </tbody>
          {/* </StyledTable2> */}
          <Btn2>
            <Btn onClick={() => sendMail(checkContent)}>보내기</Btn>
          </Btn2>
        </StyledTable2>
      </StyledTable0>
    </>
  );
};
export default MailSend;

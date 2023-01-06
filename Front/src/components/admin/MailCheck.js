import { useEffect, useState } from "react";
import styled from "styled-components";
import { ForSendMail } from "../../Api/MailData";
import TableScrollbar from "react-table-scrollbar";
const A = styled.a`
  color: black;
  text-align: center;
  border-collapse: collapse;
  text-decoration: none;
`;
const StyledTable = styled.table`
  font-size: 15px;
  text-align: center;
  border-collapse: collapse;
  thead {
    tr {
      border: 2px solid orange;
      th {
        padding: 5px 8px;
        background-color: #f3c73c;
        color: #fff;
        font-weight: 1000;
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 5px 5px;
        border-bottom: 1px solid #eee;
        font-color: black;
        border-bottom: 1px solid orange;
      }
    }
  }
  .second-row {
    width: 1200px;
  }
  .second-row2 {
    width: 700px;
  }
`;

const Select = styled.select`
  float: center;
  margin: 3px 340px;
  min-width: 0;
  display: inline-block;
  width: 30%;
  padding: 8px 8px;
  font-size: inherit;
  line-height: inherit;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
  padding: 10px;
  &:focus {
    border-color: red;
  }
`;
// const options = [
//   { value: "비건", label: "비건" },
//   { value: "제로웨이스트", label: "제로웨이스트" },
//   { value: "플로깅", label: "플로깅" },
// ];
const MailCheck = () => {
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

  // defalut는 비건
  useEffect(() => {
    ForSendMail("비건", setContent);
  }, []);

  // 바뀐거 전송
  useEffect(() => {
    ForSendMail(selected, setContent);
  }, [selected]);

  return (
    <div class="parentmail2">
      <div class="checkchild1">
        <Select onChange={handleSelect} value={selected}>
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </Select>

        <TableScrollbar rows={15}>
          <StyledTable>
            <thead>
              <tr>
                <th></th>
                <th className="second-row">보낸 기사</th>
                <th className="second-row">보낸 날짜</th>
              </tr>
            </thead>
            <tbody>
              {contents?.map((contents, key) => (
                <tr key={key}>
                  <td></td>
                  <td className="second-row">
                    <A href={contents.contentUrl} target="blank">
                      {contents.contentTitle}
                    </A>
                  </td>
                  <td className="second-row2">
                    {String(contents.sendDate).replace("T", " ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableScrollbar>
      </div>
    </div>
  );
};
export default MailCheck;

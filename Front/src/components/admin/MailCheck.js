import { useEffect, useState } from "react";
import styled from "styled-components";
import { ForSendMail } from "../../Api/MailData";
import TableScrollbar from "react-table-scrollbar";

const StyledTable1 = styled.table`
  display: inline-block;
  margin: 30px;
  text-align: center;
  border-collapse: collapse;

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
        padding: 7px 15px;
        border-bottom: 1px solid #eee;
      }
    }
  }
  .second-row {
    width: 1100px;
  }
`;

const Select2 = styled.select`
  float: center;
  margin: 0;
  min-width: 0;
  display: inline-block;
  width: 13%;
  padding: 8px 8px;
  font-size: inherit;
  line-height: inherit;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
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
    <>
      <TableScrollbar rows={15}>
        <StyledTable1>
          <Select2 onChange={handleSelect} value={selected}>
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
                <td></td>
                <td className="second-row">
                  <a href={contents.contentUrl} target="blank">
                    {contents.contentTitle}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable1>
      </TableScrollbar>
    </>
  );
};
export default MailCheck;
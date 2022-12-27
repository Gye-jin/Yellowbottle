import { ForContentData } from "../../Api/MailData";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Loading from "./Loading";
import Swal from "sweetalert2";

const StyledTable1 = styled.table`
  font-size: 15px;
  text-align: center;
  border-collapse: collapse;
  // height:470px;
  thead {
    tr {
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
      }
    }
  }
  .second-row {
    width: 1000px;
  }
`;
const A = styled.a`
  color: black;
  text-align: center;
  border-collapse: collapse;
  text-decoration: none;
`;
const StyledTable2 = styled.table`
  font-size: 15px;
  text-align: center;
  border-collapse: collapse;

  thead {
    tr {
      th {
        padding: 5px 8px;
        background-color: #f3c73c;
        color: #fff;
        font-weight: 700;
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 5px 5px;
        border-bottom: 1px solid #eee;
        font-color: black;
      }
    }
  }
  .second-row {
    width: 600px;
  }
`;

const Select = styled.select`
  float: center;
  margin: 5px 178px;
  min-width: 0;
  width: 30%;
  padding: 8px 8px;
  font-size: inherit;
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
  background-color: white;
  width: 140px;
  height: 40px;
  border: none;
`;
const Btn2 = styled.div`
  width: 140px;
  height: 40px;
  border: solid 5px #f3c73c;
  margin: auto;
`;

const MailSend = () => {
  // 로딩중 만들기
  const [loading, setLoading] = useState(true);
  //3 개만 선택
  const [num_sel, setNum] = useState(0);

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

  // 체크된 아이템을 담을 배열 << spring으로 전송용  contentNo
  const [checkContent, setCheckContents] = useState([]);

  // 체크된 아이템을 담을 배열 << 선택 목록 화면에 뛰울용 Title
  const [checkContent2, setCheckContents2] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id, title, num_sel) => {
    if (checked) {
      setNum(num_sel + 1);
      if (num_sel <= 2) {
        // 단일 선택 시 체크된 아이템을 배열에 추가
        setCheckContents((prev) => [...prev, id]);
        // 단일 선택 시 체크된 아이템을 배열2 에 추가
        setCheckContents2((prev) => [...prev, title]);
      } else {
        setNum(3);
        Swal.fire({
          icon: "error",
          title: "🌚3개만 골라주세요🌝",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } else {
      setNum(num_sel - 1);
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckContents(checkContent.filter((el) => el !== id));
      setCheckContents2(checkContent2.filter((el1) => el1 !== title));
    }
  };

  const sendMail = async (mailData) => {
    // 전체 게시물(ID)보기 _피드게시물넘버에 맞게 가져오기.
    setLoading(true);
    try {
      const response = await axios.get(
        `http://43.200.181.65:8080/mail?FirstcontentNo=${mailData[0]}&SecondcontentNo=${mailData[1]}&ThirdcontentNo=${mailData[2]}`
      );
      console.log(response);
      setCheckContents([]);
      setCheckContents2([]);
      setNum(0);
      setLoading(false);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    ForContentData("비건", setContent);
  }, []);

  useEffect(() => {
    ForContentData(selected, setContent);
  }, [selected]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div class="parentmail">
      <div class="childmail">
        <Select
          onChange={handleSelect}
          value={selected}
          defaultValue="제로웨이스트"
        >
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </Select>

        <StyledTable1>
          <thead>
            <tr>
              <th></th>
              <th className="second-row">기사 목록</th>
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
                        contents.contentTitle,
                        num_sel
                      )
                    }
                    // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                    checked={
                      checkContent.includes(contents.contentNo) ? true : false
                    }
                  />
                </td>
                <td className="second-row">
                  <A href={contents.contentUrl} target="blank">
                    {contents.contentTitle}
                  </A>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable1>
      </div>

      <div class="childmail2">
        <StyledTable2>
          <thead>
            <tr>
              <th></th>
              <th className="second-row">보낼 기사</th>
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
        </StyledTable2>
        <Btn2>
          <Btn
            onClick={() => {
              sendMail(checkContent);
            }}
          >
            보내기
          </Btn>
        </Btn2>
      </div>

      {loading && <Loading />}
    </div>
  );
};
export default MailSend;

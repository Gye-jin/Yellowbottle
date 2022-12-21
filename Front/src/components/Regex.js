// 이메일 유효성 체크
export function EmailRegexTest(email, setEmailError) {
  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (!emailRegex.test(email)) {
    setEmailError("올바른 이메일 형식이 아닙니다.");
  } else {
    setEmailError("");
  }
}

// 비밀번호 유효성 체크
export function PasswordRegexTest(userPw, setPasswordError) {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  if (!passwordRegex.test(userPw))
    setPasswordError("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
  else setPasswordError("");
}

// 생년월일 유효성 체크
export function BirthRegexTest(birth, setBirthError) {
  const birthRegex =
    /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if (!birthRegex.test(birth))
    setBirthError("형식이 일치하지 않습니다. 1999-08-20과 같이 입력해주세요!");
  else setBirthError("");
}

// 이름 유효성 체크
export function NameRegexTest(name, setNameError) {
  const nameRegex = /^[가-힣]{2,4}$/;
  if (!nameRegex.test(name) || name.length < 1)
    setNameError("올바른 이름을 입력해주세요.");
  else setNameError("");
}

// 성별 유효성 체크
export function GenderRegexTest(sex) {
  if (sex == null) {
    alert("성별을 체크해주세요.");
  }
}

// 아이디 유효성 체크
export function IdRegexTest(userId, setIdError) {
  const idRegex = /^[a-zA-Z0-9]{4,19}$/g;
  if (!idRegex.test(userId)) {
    setIdError("아이디는 영문자 또는 숫자 5~20자리로 입력해주세요");
  } else if (idRegex.test(userId)) {
    setIdError("");
  }
}

// rePassword 유효성 체크
export function RePasswordRegexTest(userPw, rePassword, setRePasswordError) {
  if (userPw !== rePassword) {
    setRePasswordError("비밀번호가 일치하지 않습니다.");
  } else {
    setRePasswordError("");
  }
}

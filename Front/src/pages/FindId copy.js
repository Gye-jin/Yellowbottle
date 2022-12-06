
  const onhandlePost = async (joinData) => {
    // post
    await axios
      // spring에 보낼 url : controller 와 Dto를 확인해서 수정하자!
      .post("http://localhost:8080/api/login", joinData)
      .then(function (response) {
        console.log(response, "성공");
        navigate("/");
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError("로그인에 실패하였습니다. 다시한번 확인해 주세요.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      email: data.get("id"), // id의  e.currentTarget.value
      birth: data.get("password"),
    };
    const { userId, userPw } = joinData;
    console.log(joinData);
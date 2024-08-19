const form = document.getElementById("write-form");

const handleSubmitForm = async (event) => {
  event.preventDefault();
  const body = new FormData(form);
  body.append("insertAt", new Date().getTime());
  try {
    const res = await fetch("/items", {
      method: "POST",
      body,
    });
    const data = await res.json();
    //json파일로 바꿔줘야 함//
    if (data === "200") window.location.pathname = "/";
    //글쓰기 작성완료시 루트 페이지로 보내줌//
  } catch (e) {
    console.error(e);
  }
};

form.addEventListener("submit", handleSubmitForm);

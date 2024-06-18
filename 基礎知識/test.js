document.addEventListener("DOMContentLoaded",() => {
  const messageForm = document.getElementById("message_form");
  const messageInput = document.getElementById("message_input");
  const messageList = document.getElementById("message_list");
  const changeBgColor = document.getElementById("change_bgcolor");
  const hoverText = document.getElementById("hover_text");
  const timeCheck = document.getElementById("time_check");
  const counterButton = document.getElementById("counter_button");
  const counter = document.getElementById("counter");
  const counterResetButton = document.getElementById("counter_resetbutton");

  messageForm.addEventListener("submit",(e) => {
    e.preventDefault();
    addMessage();
  });

  function addMessage() {
    const message_text = messageInput.value.trim();
    li = document.createElement("li");
    li.textContent = message_text;
    
    messageList.appendChild(li);
    messageInput.value = "";
  }

  changeBgColor.addEventListener("click",() => {
    const randomcolor = "#" + Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = randomcolor;
  });

  hoverText.addEventListener("mouseover",() => {
    hoverText.textContent = "Mouse Over NOW!!";
  });

  hoverText.addEventListener("mouseout",() => {
    hoverText.textContent = "マウスオーバーすると文字が変わります";
  });

  function timeChecker() {
    const now = new Date();
    timeCheck.textContent = now.toLocaleString();
  }
  timeChecker();
  setInterval(timeChecker, 1000);

  let count = 0;
  const maxCount = 10;
  counterButton.addEventListener("click",() => {
    count ++;
    if (count <= maxCount) {
      counter.textContent = count;
    } else {
      alert("カウント数が上限を超えています。");
      count = 0;
      counter.textContent = count;
    }
  });

  counterResetButton.addEventListener("click",() => {
    count = 0;
    counter.textContent = count;
  });
});
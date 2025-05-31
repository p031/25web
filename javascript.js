function addTodo() {
  const input = document.getElementById("todoInput");
  const value = input.value.trim();
  if (!value) return;

  const list = document.getElementById("todoList");
  const item = document.createElement("div");
  item.className = "todo-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = value;

  // 체크 시 줄 긋기 기능
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      span.style.textDecoration = "line-through";
      span.style.color = "#999";
    } else {
      span.style.textDecoration = "none";
      span.style.color = "inherit";
    }
  });

  item.appendChild(checkbox);
  item.appendChild(span);
  list.appendChild(item);


  // 삭제 버튼
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.className = "delete_button";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.addEventListener("click", () => {
    list.removeChild(item);
  });

  item.appendChild(checkbox);
  item.appendChild(span);
  item.appendChild(deleteBtn);
  list.appendChild(item);

  input.value = "";
}



// 명언 목록
const quotes = [
  "작은 습관이 큰 변화를 만든다.",
  "오늘의 노력은 내일의 성공이다.",
  "포기하지 말고 한 걸음 더 나아가라.",
  "실패는 성공의 어머니이다.",
  "천 리 길도 한 걸음부터.",
  "성공은 준비된 자에게 온다.",
  "노력은 배신하지 않는다.",
  "행동이 운명을 만든다.",
  "자신을 믿어라.",
  "꾸준함이 답이다.",
  "기회는 준비된 자에게 온다.",
  "실수는 성장의 밑거름이다.",
  "오늘 할 일을 내일로 미루지 말자.",
  "도전 없이는 성취도 없다.",
  "한 번에 하나씩, 천천히 가자.",
  "간절히 원하면 이루어진다.",
  "꿈을 꾸는 자만이 미래를 바꾼다.",
  "자기 자신을 이기는 것이 최고의 승리다.",
  "고통 없인 얻는 것도 없다.",
  "지금 이 순간이 가장 소중하다."
];

// 명언 표시 함수
function showDailyQuote() {
  const quoteBox = document.getElementById("quoteBox");

  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const index = dayOfYear % quotes.length;

  quoteBox.textContent = quotes[index];
}

window.onload = function () {
  document.getElementById("quoteBox").textContent = new Date().toLocaleDateString("ko-KR");
  showDailyQuote();
};

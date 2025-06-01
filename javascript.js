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

const quoteBox = document.getElementById('quoteBox');
const changeQuoteBtn = document.getElementById('changeQuoteBtn');

// =============================================================================================================
// 명언 관련 함수
// =============================================================================================================

// 명언을 랜덤으로 표시하는 함수
function displayRandomQuote() {
    if (quotes.length === 0) {
        quoteBox.textContent = "불러올 명언이 없습니다.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteBox.textContent = quotes[randomIndex];
}

// =============================================================================================================
// 할 일 추가 함수
// =============================================================================================================
function addTodo() {
    const input = document.getElementById("todoInput");
    const value = input.value.trim();

    if (!value) {
        alert('할 일을 입력하세요!'); // 내용이 없으면 알림
        return; // 함수 중단
    }

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
            span.style.color = "inherit"; // 기본 색상으로 복원
        }
    });

    // 삭제 버튼
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.className = "delete_button";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
        list.removeChild(item); // 리스트에서 할 일 항목 제거
    });

    // 요소들을 할 일 항목(item)에 추가
    item.appendChild(checkbox);
    item.appendChild(span);
    item.appendChild(deleteBtn); // 삭제 버튼도 추가

    // 할 일 리스트(list)에 최종 항목(item) 추가
    list.appendChild(item);

    // 입력 필드 초기화
    input.value = "";
}

// =============================================================================================================
// 캘린더 함수
// =============================================================================================================
function generateCalendar(year, month) {
    const calendarBody = document.getElementById("calendar-body");
    const calendarHeader = document.getElementById("calendarHeader");

    calendarBody.innerHTML = ""; // 기존 달력 내용 초기화

    const monthNames = [
        "1월", "2월", "3월", "4월", "5월", "6월",
        "7월", "8월", "9월", "10월", "11월", "12월"
    ];

    calendarHeader.textContent = `${year}년 ${monthNames[month]}`;

    const firstDay = new Date(year, month, 1).getDay(); // 해당 월의 첫 날 요일 (0:일, 1:월 ...)
    const lastDate = new Date(year, month + 1, 0).getDate(); // 해당 월의 마지막 날짜

    let row = document.createElement("tr");

    // 첫 날 이전까지 빈 셀 추가
    for (let i = 0; i < firstDay; i++) {
        row.appendChild(document.createElement("td"));
    }

    // 날짜 셀 추가
    for (let day = 1; day <= lastDate; day++) {
        if (row.children.length === 7) { // 한 주가 꽉 차면 새 행 생성
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }

        const cell = document.createElement("td");
        cell.textContent = day;

        // 오늘 날짜 강조 (옵션)
        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            cell.classList.add('today'); // CSS에서 .today 클래스 스타일링 필요
        }

        row.appendChild(cell);
    }

    // 마지막 주 행 추가 (완성되지 않아도)
    calendarBody.appendChild(row);
}

function clearTodoList() {
    const todoList = document.getElementById('todoList');
    if (todoList) {
        todoList.innerHTML = ''; // 할 일 목록의 모든 자식 요소를 제거
    }
    console.log('할 일 목록이 초기화되었습니다.');
}

function checkAndClearTodoListDaily() {
    const lastClearDateKey = 'lastTodoListClearDate';
    const lastClearDate = localStorage.getItem(lastClearDateKey); // localStorage에서 마지막 초기화 날짜 가져오기

    const today = new Date();
    // 날짜만 비교하기 위해 시, 분, 초, 밀리초는 0으로 설정
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (lastClearDate) {
        const storedDate = new Date(lastClearDate);
        // 저장된 날짜도 시, 분, 초, 밀리초는 0으로 설정
        const storedDateOnly = new Date(storedDate.getFullYear(), storedDate.getMonth(), storedDate.getDate());

        // 오늘 날짜가 마지막 초기화 날짜보다 크면 (즉, 날짜가 바뀌었으면)
        if (todayDate.getTime() > storedDateOnly.getTime()) {
            clearTodoList(); // 할 일 목록 초기화
            localStorage.setItem(lastClearDateKey, today.toISOString()); // 오늘 날짜로 마지막 초기화 날짜 업데이트
        }
    } else {
        // 처음 접속하거나, localStorage에 날짜가 없으면 (새로운 사용자)
        clearTodoList(); // 일단 초기화 (이전 날짜 할 일이 남아있지 않도록)
        localStorage.setItem(lastClearDateKey, today.toISOString()); // 오늘 날짜로 저장
    }
}

// =============================================================================================================
// 페이지 로드 시 초기화 및 이벤트 리스너 설정
// =============================================================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. 초기 명언 표시
    displayRandomQuote();

    // 2. 명언 변경 버튼 이벤트 리스너 설정
    if (changeQuoteBtn) {
        changeQuoteBtn.addEventListener('click', displayRandomQuote);
    }

    // 3. 캘린더 생성
    generateCalendar(new Date().getFullYear(), new Date().getMonth());
});

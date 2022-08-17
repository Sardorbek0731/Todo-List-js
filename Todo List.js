// Todo List

const formCreate = document.getElementById("form-create");
const listGroup = document.getElementById("listGroup");

// clock
const dateEl = document.querySelector("#dateEl");
const timeEl = document.querySelector("#timeEl");

function setTime() {
  let now = new Date();

  let date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  let month = now.getMonth() < 10 ? "0" + now.getMonth() : now.getMonth();
  let year =
    now.getFullYear() < 10 ? "0" + now.getFullYear() : now.getFullYear();

  let months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "August",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  let hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  let minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  let seconds =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  dateEl.innerHTML = `${date} ${months[month]}, ${year}`;
  timeEl.innerHTML = `${hour}:${minutes}:${seconds}`;
}
setInterval(setTime, 1000);

// todos time
function timeTodos() {
  let now = new Date();

  let date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  let month = now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  let year =
    now.getFullYear() < 10 ? "0" + now.getFullYear() : now.getFullYear();

  let hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  let minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();

  return `${hour}:${minutes}, ${date}.${month}.${year}`;
}

let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) showTodos();

// set Todos
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

// show todos
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listGroup.innerHTML = "";
  todos.forEach((item, i) => {
    listGroup.innerHTML += `
    <li ondblclick = "setComplated(${i})" class="list_item ${
      item.complated == true ? "complated" : ""
    }">
          ${item.text} 
          <div class="todos_icon">
            <small class = "todos_time">${item.time}</small>
            <i class="fa-solid fa-marker" id="edit"></i>
            <i class="fa-solid fa-trash-can" id="delete_icon" onclick="(deleteTodods(${i}))"></i>
          </div>
    </li>
  `;
  });
}

// show messae
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;

  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 3000);
}

// get todos
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["add_input"].value.trim();

  if (todoText.length) {
    todos.push({ text: todoText, time: timeTodos(), complated: false });
    setTodos();
    showTodos();
  } else {
    showMessage("message", "Iltimos List ga nom qo'ying! ...");
  }
  formCreate.reset();
});

function deleteTodods(id) {
  const deletedTodos = todos.filter((item, i) => {
    return i !== id;
  });
  todos = deletedTodos;
  setTodos();
  showTodos();
}
function setComplated(id) {
  const setComplatedTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, complated: item.complated == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = setComplatedTodos;
  setTodos();
  showTodos();
}

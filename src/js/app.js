document.addEventListener("DOMContentLoaded", loadTodos);

document
  .getElementById("todo-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    addTodoItem(title, description);
    saveTodoItem(title, description);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  });
  

function addTodoItem(title, description) {
  const todoList = document.getElementById("todo-list");

  const li = document.createElement("li");
  li.innerHTML = `
        <span>
            <strong>${title}</strong>
            <small>${description}</small>
        </span>
        <input type="checkbox" class="complete-checkbox">
        <button class="delete-btn">حذف</button>
    `;
  li.querySelector('.complete-checkbox').addEventListener(
    'change',
    function () {
      if (this.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
    }
  );

  li.querySelector(".delete-btn").addEventListener("click", function () {
    todoList.removeChild(li);
    removeTodoItem(title);
  });

  todoList.appendChild(li);
}

function saveTodoItem(title, description) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push({ title, description });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    addTodoItem(todo.title, todo.description);
  });
}
function createRemoveTodoItem() {
  return function(title) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter((todo) => todo.title !== title);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
}


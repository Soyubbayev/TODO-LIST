let input = document.getElementById("boxes__box--input");
let btn = document.getElementById("boxes__box--btn");
let list = document.getElementById("boxes__box--list");
let count = document.getElementById("boxes__box--count");
let clearBtn = document.getElementById("boxes__box--clear");

let editIndex = null;

const todos = JSON.parse(localStorage.getItem("todos")) || [];

function render() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    let li = document.createElement("li");

    let text = document.createElement("span");
    text.textContent = todo;

    let actions = document.createElement("div");
    actions.className = "boxes__box--actions";

    let editBtn = document.createElement("button");
    editBtn.className = "edit__btn";
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete__btn";
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    // delete
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      render();
    });

    // edit
    editBtn.addEventListener("click", () => {
      input.value = todo;
      editIndex = index;
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(actions);
    list.appendChild(li);
  });

  count.textContent = `You have ${todos.length} pending tasks`;
}
render();

btn.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;

  if (editIndex === null) {
    todos.push(value);
  } else {
    todos[editIndex] = value;
    editIndex = null; 
  }

  localStorage.setItem("todos", JSON.stringify(todos));
  render();
  input.value = "";
});

clearBtn.addEventListener("click", () => {
  todos.length = 0;
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
});
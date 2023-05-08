function newElement() {
  let todo = document.querySelector("div>input").value;
  let userList = [];
  let danger = document.querySelectorAll(".btn.btn-danger");
  let items = document.querySelectorAll("ul#list li");
  danger.forEach((i) => {
    i.textContent = "";
  });
  items.forEach((i) => {
    userList.push(i.textContent);
  });
  if (!todo || todo[0] == " ") {
    $(".toast.error.hide").toast("show");
    document.querySelector("div>input").value = "";
    return;
  }
  userList.push(todo);
  $(".toast.success.hide").toast("show");
  let list = document.querySelector("#list");
  document.querySelector("#list").innerHTML = "";
  let id = 0;
  userList.forEach((i) => {
    let createTodo = document.createElement("li");
    let deleteButton = document.createElement("button");
    createTodo.className = "d-flex align-items-center justify-content-between";
    deleteButton.innerHTML = "X";
    deleteButton.className = "btn btn-danger";
    deleteButton.setAttribute("onclick", `deleteFunction(${id})`);
    deleteButton.id = id;
    createTodo.appendChild(document.createTextNode(i));
    createTodo.appendChild(deleteButton);
    createTodo.id = `li${id}`;
    createTodo.setAttribute("onclick", `done(li${id})`);
    list.appendChild(createTodo);
    id++;
  });
  localStorage.setItem("userList", JSON.stringify(userList));
  document.querySelector("div>input").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  let list = document.querySelector("#list");

  if (localStorage.getItem("userList")) {
    document.querySelector("#list").innerHTML = "";
    let id = 0;
    JSON.parse(localStorage.getItem("userList")).forEach((i) => {
      let createTodo = document.createElement("li");
      let deleteButton = document.createElement("button");
      createTodo.className =
        "d-flex align-items-center justify-content-between";
      deleteButton.innerHTML = "X";
      deleteButton.className = "btn btn-danger";
      deleteButton.id = id;
      deleteButton.setAttribute("onclick", `deleteFunction(${id})`);
      createTodo.appendChild(document.createTextNode(i));
      createTodo.appendChild(deleteButton);
      createTodo.id = `li${id}`;
      createTodo.setAttribute("onclick", `done(li${id})`);
      list.appendChild(createTodo);
      id++;
    });
  } else {
    let userList = [];
    let danger = document.querySelectorAll(".btn.btn-danger");
    let items = document.querySelectorAll("ul#list li");
    danger.forEach((i) => {
      i.textContent = "";
    });
    items.forEach((i) => {
      userList.push(i.textContent);
    });
    document.querySelector("#list").innerHTML = "";
    let id = 0;
    userList.forEach((i) => {
      let createTodo = document.createElement("li");
      let deleteButton = document.createElement("button");
      createTodo.className = `d-flex align-items-center justify-content-between ${id}`;
      deleteButton.innerHTML = "X";
      deleteButton.className = "btn btn-danger";
      deleteButton.id = id;
      deleteButton.setAttribute("onclick", `deleteFunction(${id})`);
      createTodo.appendChild(document.createTextNode(i));
      createTodo.appendChild(deleteButton);
      createTodo.id = `li${id}`;
      createTodo.setAttribute("onclick", `done(li${id})`);
      list.appendChild(createTodo);
      id++;
    });
    localStorage.setItem("userList", JSON.stringify(userList));
  }
});

function deleteFunction(x) {
  let userList = JSON.parse(localStorage.getItem("userList"));
  userList.splice(x, 1);
  localStorage.setItem("userList", JSON.stringify(userList));
  document.querySelector("#list").innerHTML = "";
  let id = 0;
  userList.forEach((i) => {
    let createTodo = document.createElement("li");
    let deleteButton = document.createElement("button");
    createTodo.className = `d-flex align-items-center justify-content-between ${id}`;
    deleteButton.innerHTML = "X";
    deleteButton.className = "btn btn-danger";
    deleteButton.id = id;
    deleteButton.setAttribute("onclick", `deleteFunction(${id})`);
    createTodo.appendChild(document.createTextNode(i));
    createTodo.appendChild(deleteButton);
    createTodo.id = `li${id}`;
    createTodo.setAttribute("onclick", `done(${id})`);
    list.appendChild(createTodo);
    id++;
  });
}

function done(done) {
  let classes = document.getElementById(done.id);
  if (classes.classList[classes.classList.length - 1] == "doneby") {
    classes.classList.remove("doneby");
  } else {
    classes.classList.add("doneby");
  }
}

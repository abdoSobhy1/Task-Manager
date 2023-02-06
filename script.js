let tskSubmit = document.querySelector(".add");
let tskName = document.querySelector(".task-name");
tskSubmit.addEventListener("click", () => {
  makeTsk();
});
tskName.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    makeTsk();
  }
});
let makeTsk = function () {
  let task = tskName.value.trim();
  if (task != "") {
    createTask(task, Date.now());
    tskName.value = "";
    addTaskarray(task, Date.now());
    updatebtns();
  }
};
let tasks = document.querySelector(".tasks");
let tsksArray = [];
let createTask = function (task, taskId) {
  let theTask = document.createElement("div");
  theTask.innerHTML = `${task}`;
  let del = document.createElement("button");
  del.innerHTML = "Delete";
  del.className = "del";
  theTask.appendChild(del);
  theTask.className = "task";
  theTask.id = taskId;
  tasks.appendChild(theTask);
};
let addTaskarray = function (task, taskId) {
  tsksArray.push({ id: taskId, title: task });
  console.log(tsksArray);
  saveToStrg();
};
let saveToStrg = function () {
  window.localStorage.setItem("Tasks", JSON.stringify(tsksArray));
};
let loadStrg = function () {
  tsksArray = JSON.parse(localStorage.getItem("Tasks"));
  if (tsksArray == null) {
    tsksArray = [];
  } else {
    tsksArray = JSON.parse(window.localStorage.getItem("Tasks"));
    showTsks();
  }
};
let showTsks = function () {
  for (let i = 0; i < tsksArray.length; i++) {
    createTask(tsksArray[i].title, tsksArray[i].id);
  }
};
loadStrg();
let updatebtns = function () {
  let deletes = document.querySelectorAll(".del");
  deletes.forEach((delBtn) => {
    delBtn.addEventListener("click", () => {
      let targetTask = delBtn.parentElement;
      for (let i = 0; i < tsksArray.length; i++) {
        if (tsksArray[i].id == targetTask.id) {
          tsksArray.splice(i, 1);
          saveToStrg();
        }
      }
      targetTask.remove();
    });
  });
};
updatebtns();

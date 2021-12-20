let task = document.querySelector("#task");
let ulDOM = document.querySelector("#list");
let liDOM = document.querySelectorAll("#list>li");
let keys = Object.keys(localStorage);

keys.sort(compareNumeric).forEach(function (item, index) {
  let todo = localStorage.getItem(item);
  let text = document.createTextNode(todo);
  let createLi = document.createElement("li");
  createLi.addEventListener("click", checkLi);
  createLi.appendChild(text);
  let spanDOM = document.createElement("span");
  spanDOM.setAttribute("data-id", item);
  spanDOM.setAttribute("onClick", "removeLi(this)");
  spanDOM.classList.add("close");
  spanDOM.innerText = " X ";
  createLi.appendChild(spanDOM);
  ulDOM.append(createLi);
});

/*********************  FUNCTIONS   **************************/

function newElement() {
  if (task.value.trim().length < 1) {
    $("#liveToast").toast("show");
    return;
  }
  let values = Object.values(localStorage);
  if (values.includes(task.value.trim())) {
    $("#liveToastAlready").toast("show");
    return;
  }
  localStorage.setItem(`${localStorage.length}`, task.value.trim());
  let text = document.createTextNode(task.value.trim());
  let createLi = document.createElement("li");
  createLi.addEventListener("click", checkLi);
  createLi.appendChild(text);
  let spanDOM = document.createElement("span");
  spanDOM.setAttribute("data-id", `${localStorage.length - 1}`);
  spanDOM.setAttribute("onClick", "removeLi(this)");
  spanDOM.classList.add("close");
  spanDOM.innerText = " X ";
  createLi.appendChild(spanDOM);
  ulDOM.append(createLi);
  task.value = "";
}

let removeLi = (element) => {
  element.parentNode.remove();
  localStorage.removeItem(element.getAttribute("data-id"));
};
function checkLi() {
  this.classList.contains("checked")
    ? this.classList.remove("checked")
    : this.classList.add("checked");
}

function compareNumeric(a, b) {
  if (+a > +b) return 1;
  if (+a == +b) return 0;
  if (+a < +b) return -1;
}

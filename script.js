  'use strict';

  let Tasks=[];
  if(JSON.parse(localStorage.getItem("Tasks"))){
      Tasks = JSON.parse(localStorage.getItem("Tasks"));
  }

  const wrapper = document.querySelector("#wrapper"),
        btnNewTask = document.querySelector("#btnNewTask"),
        optionOfTasks = document.querySelector(".optionOfTasks"),
        ElemEditTextOfTask = document.querySelector("#ElemEditTextOfTask"),
        ElemDeleteTask  = document.querySelector("#ElemDeleteTask"),
        ElemTagAsImportant = document.querySelector("#ElemTagAsImportant"),
        ElemTaskDone = document.querySelector("#ElemTaskDone"),
        Incomplete = document.querySelector("#Incomplete"),
        btnAllTasks = document.querySelector("#AllTasks"),
        btnDeleteTasks = document.querySelector("#btnDeleteTasks"),
        ElemChangeFontSize = document.querySelector('#ElemChangeFontSize');

class Task {
    constructor() {
        this.TaskDone = false;
        this.TaskImportant = false;
        this.HeaderValue ='Заголовок';
        this.HeaderFontSize = '23px';
        this.TextValue ='';
        this.id = Math.random(0, 99);
        let now = new Date();
        this.time = ((`${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`)).toString();
        this.fontSize = 23;
    }
    createElement() {
        this.div = document.createElement("div");
        this.div.append(this.time);
        this.text = document.createElement("textarea");

        this.header = document.createElement('textarea');
        this.header.classList.add('TaskHeader');
        this.header.style.fontSize = this.HeaderFontSize;
        this.header.textContent = this.HeaderValue;

        this.div.append(this.header);
        this.div.append(this.text);
        this.div.classList.add("task");

        this.div.id = this.id;
        this.fontSize = this.fontSize;
        wrapper.append(this.div);
    }
}
function createElement(){
    let newTask = new Task();
    newTask.createElement();
    Tasks.push(newTask);

    localStorage.setItem('Tasks',JSON.stringify(Tasks));
}

btnNewTask.addEventListener("click",createElement);

let action = false;

function ShowOptionOfTask(e){
    e.preventDefault();
    if(e.target.classList.contains("task")&&!action){
        optionOfTasks.style.display="block";
        e.target.children[1].style.fontSize == false ? e.target.children[1].style.fontSize = '23px' : 
        optionOfTasks.children[5].value = e.target.children[1].style.fontSize.match(/\d/g).join('');
        e.target.append(optionOfTasks);
    }
}

function HideOptionOfTask(e){
            if(e.target.id !== 'ElemChangeFontSize') {
        optionOfTasks.style.display="none";
    }
}

function editTextOfTask(e){
    if(e.target.id=="ElemEditTextOfTask"){
        e.target.parentElement.remove();
        action=true;
    }
    function setAction(){
        action=false;
    }
    setTimeout(setAction,2000);
}

function changeTask(e){
        if(e.target.type=="textarea"){
        Tasks.forEach(element => {
            if(element.id == e.target.parentElement.id) {

                if(e.target.classList[0] == 'TaskHeader') {
                    
                        autoChangeFontTaskHeader(e, element);
                        element.HeaderValue = e.target.value
                    
                }else {
                    element.TextValue = e.target.value;
                }

            }
        });
        localStorage.setItem('Tasks',JSON.stringify(Tasks));
    }
}

function DeleteTask(e){
    if(confirm("Вы уверены?")){
Tasks.forEach((task,i)=>{
    if(task.id == e.target.parentElement.parentElement.id){
        Tasks.splice(i,1);
    }
});
e.target.parentElement.parentElement.remove();
localStorage.setItem('Tasks',JSON.stringify(Tasks));
    }
}

function MarkAsImportant(e){
    e.target.parentElement.parentElement.children[0].classList.toggle("TaskImportant");
    e.target.parentElement.parentElement.children[1].classList.toggle("TaskImportant");
    e.target.parentElement.parentElement.classList.toggle("TaskImportant");
    Tasks.forEach(task=>{
        if(task.id == e.target.parentElement.parentElement.id){
            if(task.TaskImportant){
                task.TaskImportant = false;
            }
            else task.TaskImportant = true;
        }
    });
    localStorage.setItem('Tasks',JSON.stringify(Tasks));
}

function TaskDone(e){
    e.target.parentElement.parentElement.children[0].classList.toggle("TaskDone");
    e.target.parentElement.parentElement.children[1].classList.toggle("TaskDone");
    e.target.parentElement.parentElement.classList.toggle("TaskDone");

    if(e.target.parentElement.parentElement.children[0].classList.contains("TaskImportant")){
        e.target.parentElement.parentElement.children[0].classList.remove("TaskImportant");
        e.target.parentElement.parentElement.children[1].classList.remove("TaskImportant");
        e.target.parentElement.parentElement.classList.remove("TaskImportant");
        Tasks.forEach(task=>{
            if(task.id == e.target.parentElement.parentElement.id){
                task.TaskImportant = false;
            }
        });
    }

    if(e.target.parentElement.parentElement.children[0].classList.contains("TaskDone")){
        Tasks.forEach(task=>{
            if(task.id == e.target.parentElement.parentElement.id){
                task.TaskDone = true;
            }
        });
    }
    else{
        Tasks.forEach(task=>{
            if(task.id == e.target.parentElement.parentElement.id){
                task.TaskDone = false;
            }
        });
    }

    localStorage.setItem('Tasks',JSON.stringify(Tasks));
}

function createElementAfterLoad(){
    if(localStorage.getItem("Tasks")!==null){
    let TasksStorage = JSON.parse(localStorage.getItem("Tasks"));
    TasksStorage.forEach((element,i)=>{
        let div = document.createElement("div");
        div.append(Tasks[i].time);

        let header = document.createElement('textarea');
        header.style.fontSize = `${element.HeaderFontSize}`;
        header.classList.add('TaskHeader');
        header.value = element.HeaderValue;
        div.append(header);
        let text = document.createElement("textarea");
        text.value = element.TextValue;

        text.style.fontSize = `${element.fontSize}px`

        div.append(text);
        div.classList.add("task");
        div.id = element.id;
        

        if(element.TaskImportant){
            div.classList.add("TaskImportant");
            text.classList.add("TaskImportant");
            header.classList.add("TaskImportant");
        }
        if(element.TaskDone){
            div.classList.add("TaskDone");
            text.classList.add("TaskDone");
            header.classList.add("TaskDone");
        }
        wrapper.append(div);
    });
}
else{
    createElement();
    createElement();
    localStorage.setItem('Tasks',JSON.stringify(Tasks));
}
}

function showNotCompleteTask(){
    let tasks = document.querySelectorAll(".task");
    tasks.forEach(task => {
        if(task.classList.contains("TaskDone")){
            task.style.display="none";
        }
    });
}

function showAllTasks(){
    location.reload();
}

function DeleteTasks(){
    if(confirm("Вы уверены?")){
        Tasks.length = 0;
        localStorage.clear();
        document.querySelectorAll(".task").forEach(task=>{
            task.remove();
        })
    }
}

function changeTaskFontSize(element) {

    if(element.target.id == 'ElemChangeFontSize') {
        element.target.parentElement.parentElement.children[1].style.fontSize = `${ElemChangeFontSize.value}px`;
        Tasks.forEach((item, i) => {
            if(item.id == element.target.parentElement.parentElement.id) {
                item.fontSize = ElemChangeFontSize.value;
            }
        })
    }

    localStorage.setItem('Tasks',JSON.stringify(Tasks));
}

function toggleReadonlyForTaskHeader(e) {
    if(e.target.textLength >= 30) {
        e.target.setAttribute('readonly','readonly');

        if(e.key == 'Backspace') {
            e.target.value = e.target.value.slice(0,e.target.value.length-1);
            if(e.target.textLength <= 31){
                e.target.removeAttribute('readonly');
            }
        }

    }
}

function autoChangeFontTaskHeader(e, element) {

    toggleReadonlyForTaskHeader(e);

    if(element.HeaderValue.length == 0){
        e.target.style.fontSize = '23px';
    }

    if((e.target.textLength >= 10) && (e.target.textLength < 30)) {

        let fontSize = +(e.target.style.fontSize.slice(0,e.target.style.fontSize.length-2));

        if(element.HeaderValue.length < e.target.textLength) {

            let textLength = e.target.textLength;

            e.target.style.fontSize = `${fontSize - fontSize*0.018}px`;

        } else if((e.target.textLength >= 10) && (fontSize < 23)){
        e.target.style.fontSize = `${fontSize + fontSize*0.018}px`;
    }
        element.HeaderFontSize = e.target.style.fontSize;
    }
}

ElemChangeFontSize.addEventListener('change', (e) => {changeTaskFontSize(e)});

wrapper.addEventListener("click",editTextOfTask);

wrapper.addEventListener("contextmenu",ShowOptionOfTask);

wrapper.addEventListener("keyup",changeTask);

ElemDeleteTask.addEventListener("click",DeleteTask);

ElemTagAsImportant.addEventListener("click",MarkAsImportant);

ElemTaskDone.addEventListener("click",TaskDone);

window.addEventListener("load",createElementAfterLoad);

Incomplete.addEventListener("click",showNotCompleteTask);

btnAllTasks.addEventListener("click", showAllTasks);   

btnDeleteTasks.addEventListener("click",DeleteTasks);

wrapper.addEventListener("click",HideOptionOfTask);


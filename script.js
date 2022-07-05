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
        AllTasks = document.querySelector("#AllTasks"),
        btnDeleteTasks = document.querySelector("#btnDeleteTasks");

class Task {
    constructor() {
        this.TaskDone = false;
        this.TaskImportant = false;
        this.HeaderValue=null;
        this.TextValue=null;
        this.id = Math.random(0, 99);
        let now = new Date();
        this.time = ((`${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`)).toString();
    }
    createElement() {
        this.textarea = document.createElement("div");

        this.textarea.append(this.time);
        this.text = document.createElement("textarea");

        this.header = document.createElement('textarea');
        this.header.classList.add('TaskHeader');
        this.header.textContent = 'Заголовок';
        this.textarea.append(this.header);

        this.textarea.append(this.text);
        this.textarea.classList.add("task");

        
        this.textarea.id = this.id;
        this.HeaderValue = this.HeaderValue;
        this.TextValue = this.TextValue;
        wrapper.append(this.textarea);
    }
}
function createElement(){
    let newTask = new Task();
    newTask.createElement();
    Tasks.push(newTask);

    localStorage.setItem('Tasks',JSON.stringify(Tasks));
}

btnNewTask.addEventListener("click",createElement);

function ShowOptionOfTask(e){
    e.preventDefault();
    if(e.target.classList.contains("task")&&!action){
        optionOfTasks.style.display="block";
        e.target.append(optionOfTasks);
    }
}

function HideOptionOfTask(e){
    if((e.target.id=="wrapper")&&(optionOfTasks.style.display=="block")){
        optionOfTasks.style.display="none";
    }
}

let action = false;

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
            if(element.id==e.target.parentElement.id){
                e.target.className == 'TaskHeader' ? element.HeaderValue = e.target.value : element.TextValue = e.target.value;
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

function creatElementAfterLoad(){
    if(localStorage.getItem("Tasks")!==null){
    let TasksStorage = JSON.parse(localStorage.getItem("Tasks"));
    TasksStorage.forEach((element,i)=>{
        let div = document.createElement("div");
        div.append(Tasks[i].time);

        let header = document.createElement('textarea');
        header.classList.add('TaskHeader');
        header.value = element.HeaderValue;
        div.append(header);
        let text = document.createElement("textarea");
        text.value = element.TextValue;
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

function showNotCompleateTask(){
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

wrapper.addEventListener("click",editTextOfTask);

wrapper.addEventListener("contextmenu",ShowOptionOfTask);

wrapper.addEventListener("change",changeTask);

ElemDeleteTask.addEventListener("click",DeleteTask);

ElemTagAsImportant.addEventListener("click",MarkAsImportant);

ElemTaskDone.addEventListener("click",TaskDone);

window.addEventListener("load",creatElementAfterLoad);

Incomplete.addEventListener("click",showNotCompleateTask);

AllTasks.addEventListener("click", showAllTasks);   

btnDeleteTasks.addEventListener("click",DeleteTasks);

wrapper.addEventListener("click",HideOptionOfTask);


// let btnNewTask = document.querySelector("#btnNewTask");

// function creatTask(){
//     let div = document.createElement("div");
//     div.classList.add("task", "notDone");
//     document.querySelector("#wrapper").append(div);
// }
// btnNewTask.addEventListener("click",creatTask);

// let wrapper = document.querySelector("#wrapper");


// function ShowOptionOfTask(e){
//     let div = document.createElement("div");
//     if((e.target.classList.contains("task"))&&(e.target.children.length==0)){
//     e.target.contentEditable="false";        
//     div.classList.add("optionOfTask");
//     div.insertAdjacentHTML("beforeend","<div id='editTextOfTask' class = 'optionsOfTask'>Редактировать</div><div id='DeleteTask' class = 'optionsOfTask'>Удалить</div>");
//     e.target.append(div);

//     e.target.addEventListener("mouseleave",(e)=>{
//         if((e.target.children.length!=0)||(e.target.classList.contains("optionOfTask"))){
//             e.target.firstElementChild.remove();
//         }
//     });
//     }
// }

// wrapper.addEventListener("mouseover",ShowOptionOfTask);


// wrapper.addEventListener("dblclick",function(e){
    
//     if(e.target.classList.contains("optionOfTask")){
//         e.target.closest(".task").contentEditable="true";
//         e.target.style.display="none";
//         e.stopPropagation();
//     }
//   });





  // 22.04.22


  'use strict';

  const wrapper = document.querySelector("#wrapper"),
        btnNewTask = document.querySelector("#btnNewTask"),
        optionOfTasks = document.querySelector(".optionOfTasks"),
        ElemEditTextOfTask = document.querySelector("#ElemEditTextOfTask"),
        ElemDeleteTask  = document.querySelector("#ElemDeleteTask"),
        ElemTagAsImportant = document.querySelector("#ElemTagAsImportant"),
        ElemTaskDone = document.querySelector("#ElemTaskDone");


let Tasks=[];

let i = 0;
let j = 0;
class Task {
    constructor() {
        this.TaskDone = false;
        this.TaskImportant = false;
        this.value=null;
        this.id = i;
        i++;
    }
    createElement() {
        this.textarea = document.createElement("div");
        this.text = document.createElement("textarea");
        this.textarea.append(this.text);
        this.textarea.classList.add("task");
        this.textarea.id = j;
        this.value = this.textarea.children[0].value;
        wrapper.append(this.textarea);
        j++;
    }

}
function createElement(){
    let newTask = new Task();
    newTask.createElement();
    Tasks.push(newTask);
}

btnNewTask.addEventListener("click",createElement);

function ShowOptionOfTask(e){

    if(e.target.classList.contains("task")&&!action){
        e.target.contentEditable="false";
        optionOfTasks.style.display="block";
        e.target.append(optionOfTasks);
    }
    e.target.addEventListener("mouseleave",(e)=>{
                    if((e.target.classList.contains("optionOfTask"))){
                    optionOfTasks.style.display="none";
                }
            });

}

let action = false;

function editTextOfTask(e){
    if(e.target.id=="ElemEditTextOfTask"){
        console.log(e.target.parentElement);
        e.target.parentElement.remove();
        action=true;

    }
    function setActin(){
        action=false;
    }
    setTimeout(setActin,2000);
}


function changeTask(e){
        if(e.target.type=="textarea"){
        Tasks[e.target.parentElement.id].value = e.target.value;
        localStorage.setItem('Tasks',JSON.stringify(Tasks));
    }
}

function DeleteTask(e){
Tasks.splice(e.target.parentElement.parentElement.id,1);
e.target.parentElement.parentElement.remove();
}

function TagAsImportant(e){
    e.target.parentElement.parentElement.children[0].classList.toggle("TaskImportant");
    e.target.parentElement.parentElement.classList.toggle("TaskImportant");
    if(Tasks[e.target.parentElement.parentElement.id].TaskDone == true){
        Tasks[e.target.parentElement.parentElement.id].TaskDone = false;
    }
}

function TaskDone(e){
    e.target.parentElement.parentElement.children[0].classList.toggle("TaskDone");
    e.target.parentElement.parentElement.classList.toggle("TaskDone");
    if(e.target.parentElement.parentElement.children[0].classList.contains("TaskImportant")){
        e.target.parentElement.parentElement.children[0].classList.remove("TaskImportant");
        e.target.parentElement.parentElement.classList.remove("TaskImportant");
        // e.target.parentElement.parentElement.classList.add("TaskDone");
    }


    if(e.target.parentElement.parentElement.children[0].classList.contains("TaskDone")){
        Tasks[e.target.parentElement.parentElement.id].TaskDone = true;
    }
    else{
        Tasks[e.target.parentElement.parentElement.id].TaskDone = false;
    }
}

wrapper.addEventListener("click",editTextOfTask);

wrapper.addEventListener("mouseover",ShowOptionOfTask);

wrapper.addEventListener("change",changeTask);

ElemDeleteTask.addEventListener("click",DeleteTask);

ElemTagAsImportant.addEventListener("click",TagAsImportant);

ElemTaskDone.addEventListener("click",TaskDone);


// setTimeout(function(){localStorage.setItem('array',Tasks)},2000);

// localStorage.setItem('array',Tasks);

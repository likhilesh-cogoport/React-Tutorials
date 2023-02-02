var tasks=[];
var completeTasks=[];
var indd=0;
getFromStorage();

function getValue(){
    let elem = document.getElementById('primary-input');
    // console.log(elem.value);
    tasks.push(elem.value);
    let taskList=document.getElementById('task-list');
    taskList.innerHTML += '<div class="card">'+elem.value + '&nbsp;&nbsp;<button class="delete-btn" onClick="deleteValue(\''+elem.value+'\')">delete</button>'+
    '&nbsp;&nbsp;<button class="mark-btn" onclick="markAsDone(\''+elem.value+'\')">Mark As done</button>'+'</div>'+
    '<br>';
    // console.log(taskList);
    elem.value='';
    saveToStorage();

}
function deleteValue(x){
    let searchBOX=document.getElementById('search-box');
    searchBOX.value='';
    // console.log(x);
    tasks=tasks.filter(task=>checkText(task,x));
    completeTasks=completeTasks.filter(task=>checkText(task,x));
    // tasks=newTasks;
    // console.log(tasks);
    let taskList=document.getElementById('task-list');
    taskList.innerHTML='';
    setState('display-all');
    showIncompleteTodos(tasks,'task-list');
    showCompleteTodos(completeTasks,'task-list');
    // tasks.forEach(task=>{
    //     taskList.innerHTML += task + '<button onClick="deleteValue(\''+task+'\')">delete</button>'+
    //     '<button onclick="markAsDone(\''+task+'\')">Mark As done</button>'+
    //     '<br>';
    // });
    // completeTasks.forEach(task=>{
    //     taskList.innerHTML += task + '<button onClick="deleteValue(\''+task+'\')">delete</button>'+
    //     '<button disabled>Done</button>'+
    //     '<br>';
    // });
    saveToStorage();
}

function checkText(a,b) {
    return a!=b;
}
function checkNotText(a,b) {
    return a==b;
}
function markAsDone(x){
    let searchBOX=document.getElementById('search-box');
    searchBOX.value='';
    // console.log(x);
    let newTasks=tasks.filter(task=>checkText(task,x));
    let removedTask=tasks.filter(task=>checkNotText(task,x));
    // console.log(newTasks);
    // console.log(removedTask);
    tasks=newTasks;
    taskList=document.getElementById('task-list');
    taskList.innerHTML='';
    // tasks.forEach(task=>{
    //     taskList.innerHTML += task + '<button onClick="deleteValue(\''+task+'\')">delete</button>'+
    //     '<button onclick="markAsDone(\''+task+'\')">Mark As done</button>'+
    //     '<br>';
    // });
    // removedTask.forEach(task=>{
    //     taskList.innerHTML += task + '<button onClick="deleteValue(\''+task+'\')">delete</button>'+
    //     '<button disabled>Done</button>'+
    //     '<br>';
    // });
    // completeTasks.forEach(task=>{
    //     taskList.innerHTML += task + '<button onClick="deleteValue(\''+task+'\')">delete</button>'+
    //     '<button disabled>Done</button>'+
    //     '<br>';
    // });
    setState('display-all');
    showIncompleteTodos(tasks,'task-list');
    showCompleteTodos(removedTask,'task-list');
    showCompleteTodos(completeTasks,'task-list');
    completeTasks=completeTasks.concat(removedTask);
    saveToStorage();
}

let searchTasks=[];
function search(){
    let val=document.getElementById('search-box').value;
    // console.log('searched',val);
    searchTasks=tasks.filter(task=>task.includes(val));
    let newTasks=completeTasks.filter(task=>task.includes(val));
    
    let elem = document.getElementById('task-list');
    elem.innerHTML='';
    if(val.length>0){
        // searchTasks.forEach(task=>{
        //     elem.innerHTML += task + '<button onClick="deleteValue(\''+task+'\')">delete</button>'+
        //     '<button onclick="markAsDone(\''+task+'\')">Mark As done</button>'+
        //     '<br>';
        // });
        showIncompleteTodos(searchTasks,'task-list');
        if(newTasks.length>0){
            showCompleteTodos(newTasks,'task-list');
            // newTasks.forEach(task=>{
            //     elem.innerHTML += task + '<button onClick="deleteValue(\''+task+'\')">delete</button>'+
            //     '<button disabled>Done</button>'+
            //     '<br>';
            // });
        }
    }
    else{
        // tasks.forEach(task=>{
        //     elem.innerHTML += task + '<button onClick="deleteValue(\''+task+'\')">delete</button>'+
        //     '<button onclick="markAsDone(\''+task+'\')">Mark As done</button>'+
        //     '<br>';
        // });
        showIncompleteTodos(tasks,'task-list');
        showCompleteTodos(completeTasks,'task-list');
        // completeTasks.forEach(task=>{
        //     elem.innerHTML += task + '<button onClick="deleteValue(\''+task+'\')">delete</button>'+
        //     '<button disabled>Done</button>'+
        //     '<br>';
        // }); 
    }
    // console.log(completeTasks);
    // console.log(tasks)
    // console.log(searchTasks);

}



let state="display-all";
let states=["display-all","display-incomplete","display-done"];
function setState(x){
    let inactive = states.filter(s=>{
        return s!=x;
    });
    let active = states.filter(s=>{
        return s==x;
    });
    active.forEach(s=>{
        let elem=document.getElementById(s+'-btns');
        elem.style="display:block;";
        elem=document.getElementById(s);
        elem.style="display:block;";
    });
    inactive.forEach(s=>{
        let elem=document.getElementById(s+'-btns');
        elem.style="display:none;";
        elem=document.getElementById(s);
        elem.style="display:none;";
    });

    // if(x=="display-search"){
    //     let elem = document.getElementById("add-todo-box");
    //     elem.style="display: none;"
    //     elem = document.getElementById("search-todo-box");
    //     elem.style="display: block;"
    //     elem = document.getElementById("display-all");
    //     elem.style="display: block;"
    // }
    // else{
    //     let elem = document.getElementById("add-todo-box");
    //     elem.style="display: block;"
    //     elem = document.getElementById("search-todo-box");
    //     elem.style="display: none;"
    // }
    let elem = document.getElementById('search-box-container');
    elem.style='display:none;';
    if(x==states[1]){
        clearInnerText('task-list-incomplete');
        showIncompleteTodos(tasks,'task-list-incomplete');
    }
    else if(x==states[2]){
        clearInnerText('task-list-done');
        showCompleteTodos(completeTasks,'task-list-done');
    }
    else{
        elem.style='display:block;';
    }
}

function clearInnerText(a){
    let elem = document.getElementById(a);
    elem.innerHTML='';
}
function showIncompleteTodos(a,b){
    let elem = document.getElementById(b);
    a.forEach(task=>{
        elem.innerHTML += '<div class="card">'+task + '&nbsp;&nbsp;<button class="delete-btn" onClick="deleteValue(\''+task+'\')">delete</button>'+
        '&nbsp;&nbsp;<button class="mark-btn" onclick="markAsDone(\''+task+'\')">Mark As done</button>'+'</div>'+
        '<br>';
    });
}
function showCompleteTodos(a,b){
    let elem = document.getElementById(b);
    a.forEach(task=>{
        elem.innerHTML += '<div class="card"><s>'+ task +'</s>'+ '&nbsp;&nbsp;&nbsp;<button class="delete-btn" onClick="deleteValue(\''+task+'\')">delete</button>'+'<div>'+
        // '<span>Done</span>'+
        '<br>';
    });
}

function saveToStorage(){
    localStorage.setItem("completeTasks", JSON.stringify(completeTasks));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getFromStorage(){
    tasks=localStorage.getItem("tasks");
    if(tasks){
        tasks=JSON.parse(tasks);
        setTimeout(() => {
            showIncompleteTodos(tasks,'task-list');
        }, 500);
    }
    else{
        tasks=[];
    }
    console.log(tasks);

    completeTasks=localStorage.getItem("completeTasks");
    if(completeTasks){
        completeTasks=JSON.parse(completeTasks);
        setTimeout(() => {
            showCompleteTodos(completeTasks,'task-list');
        }, 500);
    }
    else{
        completeTasks=[];
    }
    console.log(completeTasks);
}
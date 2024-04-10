var todo_task = document.getElementById('todo__list') 
var submit = document.getElementById('submit')
var category = document.getElementById('category');
var title = document.getElementById('title');
var content = document.getElementById('content');
var local_todo = JSON.parse(localStorage.getItem('todo_task'));


// local_todo = JSON.parse(localStorage.getItem('todo_task'))
for(let i=0;i<local_todo.length ;i++){      
    printfAllTask(i)
    document.getElementById('todo__number').innerHTML=local_todo.length
    localStorage.setItem('todo_task',JSON.stringify(local_todo));
}
    

document.getElementById('box__input').style.display = 'none';
document.getElementById('input__close').addEventListener('click',function(){
    document.getElementById('box__input').style.display = 'none';
    clearInput()
    resetBoderInput()
})
document.getElementById('input__bgr').addEventListener('click',function(){
    document.getElementById('box__input').style.display = 'none';
    clearInput()
    resetBoderInput()
})

let todo__list = document.getElementById('todo__list')
if (local_todo===null){
    local_todo=[];
}
document.getElementById('todo__number').innerHTML=local_todo.length


// Su kien tao task
document.getElementById('new__task').addEventListener('click',function(){
    document.getElementById('box__input').style.display = 'unset'
})
//Accept new task
document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('box__input').addEventListener('click',function(){
        if(category.value){
            document.getElementById('category').style.border= '1px solid green' 
            document.getElementById('category').style.borderRadius= '3px'  
        } 
        if(content.value){
            document.getElementById('content').style.border= '1px solid green' 
            document.getElementById('content').style.borderRadius= '3px' 
        }
        if(title.value){
            document.getElementById('title').style.border= '1px solid green' 
            document.getElementById('title').style.borderRadius= '3px'
        }
    })   
    submit.addEventListener('click',function(){
        if(content.value && title.value && category.value){
            document.getElementById('box__input').style.display = 'none'; // Ẩn ô nhập task mới  
            createNewTask()
            localStorage.setItem('todo_task',JSON.stringify(local_todo));
            clearInput()
            document.getElementById('todo__number').innerHTML=local_todo.length
            resetBoderInput()
        }
        else{
            checkContent()
        }
    })
})



//Ham lay ngay hien tai
function takeDate(){
    return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
    });
}

//Ham tao task moi
function createNewTask() {
    var obj_todo={
        obj_cate: category.value,
        obj_title: title.value,
        obj_content: content.value,
        obj_hour: takeDate(),
        status: 'todo'
    }
    local_todo.push(obj_todo);
    console.log(local_todo)
    var li = document.createElement('li')
    li.setAttribute('class','task')
    todo__list.append(li)
    li.innerHTML = `    
                    <div class="task__container">
                            <div class="category">
                                <div class="text">
                                    <u id="name__cate">${category.value}</u>
                                    <h4 id="h4">${title.value}</h4>
                                </div>
                                <div class="icon">
                                    <i class="fa-regular fa-pen-to-square" id="pen"></i>
                                    <i class="fa-regular fa-trash-can " id="trash"></i>
                                </div>
                            </div>
                            <div class="task__content">
                                <p id="main__content">${content.value}</p>
                                <div class="now">
                                    <div class="clock">
                                        <i class="fa-regular fa-clock"></i>
                                        <p id="hour"> 
                                        ${takeDate()} 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `  
    li.querySelector('#trash').addEventListener('click',deleteTask)
    li.querySelector('#pen').addEventListener('click',repairTask)
    
}

// Function clear input
function clearInput(){
    category.value=''
    title.value=''
    content.value=''
}

// Hàm check content

function checkContent(){
    if(!category.value){
        document.getElementById('category').style.border= '1px solid red' 
        document.getElementById('category').style.borderRadius= '3px' 
    }
    else{
        document.getElementById('category').style.border= '1px solid green' 
        document.getElementById('category').style.borderRadius= '3px' 
    }
    if(!content.value){
        document.getElementById('content').style.border= '1px solid red' 
        document.getElementById('content').style.borderRadius= '3px' 
    }else{
        document.getElementById('content').style.border= '1px solid green' 
        document.getElementById('content').style.borderRadius= '3px' 
    }
    if(!title.value){
        document.getElementById('title').style.border= '1px solid red' 
        document.getElementById('title').style.borderRadius= '3px' 
    }
    else{
        document.getElementById('title').style.border= '1px solid green' 
        document.getElementById('title').style.borderRadius= '3px' 
    }
}

//Ham reset boder input
function resetBoderInput(){
    document.getElementById('category').style.border= '1px solid rgb(118, 118, 118)' 
    document.getElementById('content').style.border= '1px solid rgb(118, 118, 118)' 
    document.getElementById('title').style.border= '1px solid rgb(118, 118, 118)' 
}

//Function printf all task
function printfAllTask(i){
    var task = document.createElement('li'); //tao the task moi
    task.setAttribute('class','task');
    todo_task.appendChild(task)
    task.innerHTML=`
            <div class="task__container">
                <div class="category">
                    <div class="text">
                        <u id="name__cate">${local_todo[i].obj_cate}</u>
                        <h4 id="h4">${local_todo[i].obj_title}</h4>
                    </div>
                    <div class="icon">
                        <i class="fa-regular fa-pen-to-square" id="pen"></i>
                        <i class="fa-regular fa-trash-can " id="trash"></i>
                    </div>
                </div>
                <div class="task__content">
                    <p id="main__content">${local_todo[i].obj_content}</p>
                    <div class="now">
                        <div class="clock">
                            <i class="fa-regular fa-clock"></i>
                            <p id="hour"> 
                            ${local_todo[i].obj_hour} 
                            </p>
                        </div>
                    </div>
                </div>
            </div>`  
    task.querySelector('.fa-trash-can').addEventListener('click',deleteTask)  
    task.querySelector('#pen').addEventListener('click',repairTask)
}


//Ham xoa task

function deleteTask(){
    local_todo = JSON.parse(localStorage.getItem('todo_task'))
    // console.log(this)
    let deleting =this.closest('li')
    console.log(deleting)
    var delete_cate = deleting.querySelector('#name__cate').textContent
    var delete_title = deleting.querySelector('#h4').textContent
    var delete_content = deleting.querySelector('#main__content').textContent
    console.log(delete_cate,delete_title,delete_content)
    deleting.remove()   
    for(let a=0;a<local_todo.length;a++){
            if(local_todo[a].obj_cate == delete_cate && 
                local_todo[a].obj_title == delete_title &&
                local_todo[a].obj_content == delete_content){
                        console.log(local_todo[a])
                        local_todo.splice(a,1)  
                    }
                }
    document.getElementById('todo__number').innerHTML=local_todo.length
    localStorage.setItem('todo_task',JSON.stringify(local_todo));
}
            
            
    
    
//Sua task
var repair__category = document.getElementById('repair__category')
var repair__title = document.getElementById('repair__title')
var repair__content = document.getElementById('repair__content')
            
//Ham repair task
var repairing
var id
function repairTask(){
        document.getElementById('box__repair').style.display="unset"
        repairing = this.closest('li')
        console.log(repairing)
        // var parent =
        // if(repairing.parentElement.id=='todo__list') console.log('hehehe')
        // switch(true){
        //     case status__todo.checked:{
        //         console.log('todo');
        //         break;
        //     }
        //     case (status__doing.checked && (local_todo[id].status != 'doing')) :{
        //         console.log('doing');
        //         createNewTaskTest(doing__list,'obj_doing',local_doing,'hihi','hahah','111','doing')
        //         break;
        //     }
        //     case status__finished.checked:{
        //         console.log('finshed');
        //         break;
        //     }
        //     case status__blocked.checked:{
        //         console.log('blocked');
        //         break;
        //     }
        // } 
        id = getContentTask(arrayTask,repairing)
    }

document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('repair__submit').addEventListener('click',function(){
        local_todo = JSON.parse(localStorage.getItem('todo_task'))
        console.log("jiji")
        if(document.getElementById('repair__category').value &&
        document.getElementById('repair__title').value &&
        document.getElementById('repair__content').value) 
        {
            local_todo[id].obj_cate= repairing.querySelector('#name__cate').textContent = document.getElementById('repair__category').value
            local_todo[id].obj_title = repairing.querySelector('#h4').textContent = document.getElementById('repair__title').value
            local_todo[id].obj_content = repairing.querySelector('#main__content').textContent = document.getElementById('repair__content').value
            local_todo[id].obj_hour = repairing.querySelector('#hour').textContent=takeDate()
            localStorage.setItem('todo_task',JSON.stringify(local_todo));
            resetBoderRepair()
            document.getElementById('box__repair').style.display='none'
        }
        else checkContent2()
        setStatusTask()
    })
})

// Function get content task
function getContentTask(arrayTask,repairing){
    arrayTask = JSON.parse(localStorage.getItem('todo_task'))
    var repair_cate = repairing.querySelector('#name__cate').textContent
    var repair_title = repairing.querySelector('#h4').textContent
    var repair_content = repairing.querySelector('#main__content').textContent
    let i=0;
    for(i ;i<arrayTask.length;i++){
            console.log('jijii')
            if(arrayTask[i].obj_cate == repair_cate && 
                arrayTask[i].obj_title == repair_title &&
                arrayTask[i].obj_content == repair_content)
            break       
    }
    document.getElementById('repair__category').value = local_todo[i].obj_cate
    document.getElementById('repair__title').value = local_todo[i].obj_title
    document.getElementById('repair__content').value = local_todo[i].obj_content
    return i;
}

// Function check content
function checkContent2 () {
    if(!document.getElementById('repair__category').value){
        document.getElementById('repair__category').style.border= '1px solid red' 
        document.getElementById('repair__category').style.borderRadius= '3px' 
    }
    else{
        document.getElementById('repair__category').style.border= '1px solid green' 
        document.getElementById('repair__category').style.borderRadius= '3px' 
    }
    if(!document.getElementById('repair__content').value){
        document.getElementById('repair__content').style.border= '1px solid red' 
        document.getElementById('repair__content').borderRadius= '3px' 
    }else{
        document.getElementById('repair__content').style.border= '1px solid green' 
        document.getElementById('repair__content').style.borderRadius= '3px' 
    }
    if(!document.getElementById('repair__title').value){
        document.getElementById('repair__title').style.border= '1px solid red' 
        document.getElementById('repair__title').style.borderRadius= '3px' 
    }
    else{
        document.getElementById('repair__title').style.border= '1px solid green' 
        document.getElementById('repair__title').style.borderRadius= '3px' 
    }   
} 
// Function reset boder 
function resetBoderRepair(){
    document.getElementById('repair__category').style.border= '1px solid rgb(118, 118, 118)' 
    document.getElementById('repair__content').style.border= '1px solid rgb(118, 118, 118)' 
    document.getElementById('repair__title').style.border= '1px solid rgb(118, 118, 118)' 
}


document.getElementById('repair__close').addEventListener('click',function(){
    document.getElementById('box__repair').style.display='none'
})
document.getElementById('repair__bgr').addEventListener('click',function(){
    document.getElementById('box__repair').style.display='none'
})




// Function doi status task


let doing__list = document.getElementById('doing__list')
local_doing=JSON.parse(localStorage.getItem('doing_task'))
if (local_doing===null){
    local_doing=[];
}
document.getElementById('todo__number').innerHTML=local_todo.length
// if(status__doing.checked && local_todo[id].status!='doing'){
//     var obj_doing={
//         obj_cate: local_todo[id].obj_cate,
//         obj_title: local_todo[id].obj_title,
//         obj_content: local_todo[id].obj_content,
//         obj_hour: takeDate(),
//         status: 'doing'
//     }
//     local_doing.push(obj_doing);
//     console.log(local_doing)
//     var li = document.createElement('li')
//     li.setAttribute('class','task')
//     document.getElementById('doing__list').appendChild(li)
//     li.innerHTML = `    
//                     <div class="task__container">
//                             <div class="category">
//                                 <div class="text">
//                                     <u id="name__cate">${local_todo[id].obj_cate}</u>
//                                     <h4 id="h4">${local_todo[id].obj_title}</h4>
//                                 </div>
//                                 <div class="icon">
//                                     <i class="fa-regular fa-pen-to-square" id="pen"></i>
//                                     <i class="fa-regular fa-trash-can " id="trash"></i>
//                                 </div>
//                             </div>
//                             <div class="task__content">
//                                 <p id="main__content">${local_todo[id]}</p>
//                                 <div class="now">
//                                     <div class="clock">
//                                         <i class="fa-regular fa-clock"></i>
//                                         <p id="hour"> 
//                                         ${takeDate()} 
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     `  
//     document.getElementById('doing__number').innerHTML=local_doing.length
//     li.querySelector('#trash').addEventListener('click',deleteTask)
//     li.querySelector('#pen').addEventListener('click',repairTask)
//     localStorage.setItem('doing_task',JSON.stringify(local_doing));
//     // localStorage.setItem(JSON.stringify('local_doing'))
//     // status__todo.onclick()
// }


let status__todo = document.getElementById('status__todo')
let status__doing = document.getElementById('status__doing')
let status__finished = document.getElementById('status__finished')
let status__blocked = document.getElementById('status__blocked')

function setStatusTask(){
    console.log(status__doing.checked && (local_todo[id].status != 'doing'))
    switch(true){
        case status__todo.checked:{
            console.log('todo');
            break;
        }
        case (status__doing.checked && (local_todo[id].status != 'doing')) :{
            console.log('doing');
            createNewTaskTest(doing__list,'obj_doing',local_doing,'hihi','hahah','111','doing')
            break;
        }
        case status__finished.checked:{
            console.log('finshed');
            break;
        }
        case status__blocked.checked:{
            console.log('blocked');
            break;
        }
    } 
}

 function createNewTaskTest(nameTask,objectTask,arrayTask,categoryValue,titleValue,contentValue,statusNow) {
    var objectTask={
        obj_cate: categoryValue,
        obj_title: titleValue,
        obj_content: contentValue,
        obj_hour: takeDate(),
        status: statusNow
    }
    arrayTask.push(objectTask);
    console.log(arrayTask)
    var li = document.createElement('li')
    li.setAttribute('class','task')
    nameTask.append(li)
    li.innerHTML = `    
                    <div class="task__container">
                            <div class="category">
                                <div class="text">
                                    <u id="name__cate">${categoryValue}</u>
                                    <h4 id="h4">${titleValue}</h4>
                                </div>
                                <div class="icon">
                                    <i class="fa-regular fa-pen-to-square" id="pen"></i>
                                    <i class="fa-regular fa-trash-can " id="trash"></i>
                                </div>
                            </div>
                            <div class="task__content">
                                <p id="main__content">${contentValue}</p>
                                <div class="now">
                                    <div class="clock">
                                        <i class="fa-regular fa-clock"></i>
                                        <p id="hour"> 
                                        ${takeDate()} 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `  
    li.querySelector('#trash').addEventListener('click',deleteTask)
    li.querySelector('#pen').addEventListener('click',repairTask)
    
}
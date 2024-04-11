var todo_task = document.getElementById('todo__list') 
var submit = document.getElementById('submit')
var category = document.getElementById('category');
var title = document.getElementById('title');
var content = document.getElementById('content');
let local_todo = JSON.parse(localStorage.getItem('todo_task'));
let local_doing = JSON.parse(localStorage.getItem('doing_task'));
let local_finished = JSON.parse(localStorage.getItem('finished_task'));
let local_blocked = JSON.parse(localStorage.getItem('blocked_task'));

let todo__list = document.getElementById('todo__list')
let doing__list = document.getElementById('doing__list')
let finished__list = document.getElementById('finished__list')
let blocked__list = document.getElementById('blocked__list')

if (local_todo===null){
    local_todo=[];
    localStorage.setItem('todo_task',JSON.stringify(local_todo));
}else printfAllTask(todo__list,local_todo,'todo__number','todo_task')
if (local_doing===null){
    local_doing=[];
    localStorage.setItem('doing_task',JSON.stringify(local_doing));
}else printfAllTask(doing__list,local_doing,'doing__number','doing_task')
if (local_finished===null){
    local_finished=[];
    localStorage.setItem('finished_task',JSON.stringify(local_finished));

}else printfAllTask(finished__list,local_finished,'finished__number','finished_task')
if (local_blocked===null){
    local_blocked=[];
    localStorage.setItem('blocked_task',JSON.stringify(local_blocked));
    
}else printfAllTask(blocked__list,local_blocked,'blocked__number','blocked_task')


console.log(local_todo.length)
document.getElementById('todo__number').innerHTML=local_todo.length
    


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
        day: 'numeric'
    });
}

//Ham tao task moi
var tagi
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
                                        <p id="hour"> ${takeDate()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `  
    li.querySelector('#trash').addEventListener('click',function(){
            tagi = this
            deleteTask(tagi,local_todo,'todo__number','todo_task')
            localStorage.setItem('todo_task',JSON.stringify(local_todo))

        })
    li.querySelector('#pen').addEventListener('click',function(){
        tagi = this
        console.log(this)
        repairTask()
        localStorage.setItem('todo_task',JSON.stringify(local_todo))

    })
    
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
function printfAllTask(nameTask,arrayTask,nameTaskNumber,nameLocal){
    // arrayTask = JSON.parse(localStorage.getItem(nameLocal));
    for(let i=0;i<arrayTask.length ;i++){      
        var task = document.createElement('li'); //tao the task moi
        task.setAttribute('class','task');
        nameTask.appendChild(task)
        task.innerHTML=`
                <div class="task__container">
                    <div class="category">
                        <div class="text">
                            <u id="name__cate">${arrayTask[i].obj_cate}</u>
                            <h4 id="h4">${arrayTask[i].obj_title}</h4>
                        </div>
                        <div class="icon">
                            <i class="fa-regular fa-pen-to-square" id="pen"></i>
                            <i class="fa-regular fa-trash-can " id="trash"></i>
                        </div>
                    </div>
                    <div class="task__content">
                        <p id="main__content">${arrayTask[i].obj_content}</p>
                        <div class="now">
                            <div class="clock">
                                <i class="fa-regular fa-clock"></i>
                                <p id="hour">${arrayTask[i].obj_hour}</p>
                            </div>
                        </div>
                    </div>
                </div>`  
        document.getElementById(nameTaskNumber).innerHTML=arrayTask.length
        task.querySelector('#trash').addEventListener('click',function(){
            var tagi = this
            deleteTask(tagi,arrayTask,nameTaskNumber,nameLocal)
            localStorage.setItem(nameLocal,JSON.stringify(arrayTask))

        })
        task.querySelector('#pen').addEventListener('click',function(){
            tagi = this
            console.log(this)
            repairTask()
            localStorage.setItem(nameLocal,JSON.stringify(arrayTask))

        })
        localStorage.setItem(nameLocal,JSON.stringify(arrayTask))

    }
}


//Ham xoa task

function deleteTask(tagi,arrayTask,nameTaskNumber,nameLocal){
    console.log(tagi)
    console.log(arrayTask)
    // arrayTask = JSON.parse(localStorage.getItem(nameLocal));
    let deleting =tagi.closest('li');
    console.log(deleting)
    var delete_cate = deleting.querySelector('#name__cate').textContent
    var delete_title = deleting.querySelector('#h4').textContent
    var delete_content = deleting.querySelector('#main__content').textContent
    deleting.remove()   
    for(let a=0;a<arrayTask.length;a++){
            if(arrayTask[a].obj_cate == delete_cate && 
                arrayTask[a].obj_title == delete_title &&
                arrayTask[a].obj_content == delete_content){
                        console.log(arrayTask[a])
                        arrayTask.splice(a,1)  
                        console.log(arrayTask)
                        break;
                    }
                }
    document.getElementById(nameTaskNumber).innerHTML=arrayTask.length
    localStorage.setItem(nameLocal,JSON.stringify(arrayTask));
}
            
            
    
    
//Sua task
var repair__category = document.getElementById('repair__category')
var repair__title = document.getElementById('repair__title')
var repair__content = document.getElementById('repair__content')
            
//Ham repair task
var repairing
var id
var whatTask
function repairTask(){
    // arrayTask = JSON.parse(localStorage.getItem(nameLocal));
    document.getElementById('box__repair').style.display="unset"
    repairing = tagi.closest('li')
    console.log(repairing)
    var parent = repairing.parentElement.id
    switch(true){
        case parent == 'todo__list'  :{
            id = getContentTask(local_todo,repairing,'todo_task')
            whatTask = local_todo   
            console.log('todo');
            break;
        }
        case parent == 'doing__list' :{
            id = getContentTask(local_doing,repairing,'doing_task')
            whatTask = local_doing
            console.log('doing');
            break;
        }
        case parent == 'finished__list':{
            id = getContentTask(local_finished,repairing,'finished_task')
            whatTask = local_finished
            console.log('finished');
            break;
        }
        case parent == 'blocked__list':{
            id = getContentTask(local_blocked,repairing,'blocked_task')
            whatTask = local_blocked
            console.log('blocked');
            break;
        }
    } 
    console.log(whatTask)
    console.log(id)
}



// Function get content task
function getContentTask(arrayTask,repairing,nameLocal){
    arrayTask = JSON.parse(localStorage.getItem(nameLocal))
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
    document.getElementById('repair__category').value = arrayTask[i].obj_cate
    document.getElementById('repair__title').value = arrayTask[i].obj_title
    document.getElementById('repair__content').value = arrayTask[i].obj_content
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

document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('repair__submit').addEventListener('click',function(){
        if(document.getElementById('repair__category').value &&
        document.getElementById('repair__title').value &&
        document.getElementById('repair__content').value) 
        {
            whatTask[id].obj_cate= repairing.querySelector('#name__cate').textContent = document.getElementById('repair__category').value
            whatTask[id].obj_title = repairing.querySelector('#h4').textContent = document.getElementById('repair__title').value
            whatTask[id].obj_content = repairing.querySelector('#main__content').textContent = document.getElementById('repair__content').value
            whatTask[id].obj_hour = repairing.querySelector('#hour').textContent=takeDate()
            localStorage.setItem('todo_task',JSON.stringify(whatTask));
            console.log(whatTask)
            resetBoderRepair()
            document.getElementById('box__repair').style.display='none'
            setStatusTask(whatTask)
            console.log(2)

        }
        else checkContent2()
        console.log(whatTask)
    })
})

let status__todo = document.getElementById('status__todo')
let status__doing = document.getElementById('status__doing')
let status__finished = document.getElementById('status__finished')
let status__blocked = document.getElementById('status__blocked')

function setStatusTask(whatTask){
    console.log(whatTask[id].obj_cate,whatTask[id].obj_title,whatTask[id].obj_content)
    console.log(status__doing.checked && (whatTask[id].status != 'doing'))
    switch(true){
        case (status__todo.checked && (whatTask[id].status != 'todo')):{
            console.log('todo');
            console.log(whatTask)
            createNewTaskTest(todo__list,'todo_task','obj_todo',local_todo,whatTask[id].obj_cate,whatTask[id].obj_title,whatTask[id].obj_content,'todo','todo__number')
            console.log(tagi,todo__list,local_todo)
            chooseTaskDelete(whatTask)
            break;
        }
        case (status__doing.checked && (whatTask[id].status != 'doing')) :{
            console.log(whatTask)
            console.log('doing');
            createNewTaskTest(doing__list,'doing_task','obj_doing',local_doing,whatTask[id].obj_cate,whatTask[id].obj_title,whatTask[id].obj_content,'doing','doing__number')   
            chooseTaskDelete(whatTask)
            localStorage.setItem('doing_task',JSON.stringify(local_doing));

            break;
        }
        case (status__finished.checked && (whatTask[id].status != 'finished')):{
            console.log('finished');
            createNewTaskTest(finished__list,'finished_task','obj_finished',local_finished,whatTask[id].obj_cate,whatTask[id].obj_title,whatTask[id].obj_content,'finished','finished__number')
            chooseTaskDelete(whatTask)
            localStorage.setItem('finished_task',JSON.stringify(local_finished));
            
            break;
        }
        case (status__blocked.checked && (whatTask[id].status != 'blocked')):{
            console.log('blocked');
            createNewTaskTest(blocked__list,'blocked_task','obj_blocked',local_blocked,whatTask[id].obj_cate,whatTask[id].obj_title,whatTask[id].obj_content,'blocked','blocked__number')
            chooseTaskDelete(whatTask)
            localStorage.setItem('blocked_task',JSON.stringify(local_blocked));

            break;
        }
    } 
}

//Function get task is deleted
function chooseTaskDelete(whatTask){
    console.log(whatTask[id].status)
    switch (whatTask[id].status){
        case 'todo':{
            console.log('uauauauau')
            deleteTask(tagi,whatTask,'todo__number','todo_task')
            break
        }
        case 'doing':{
            deleteTask(tagi,whatTask,'doing__number','doing_task')
            break
        }
        case 'finished':{
            deleteTask(tagi,whatTask,'finished__number','finished_task')
            break
        }
        case 'blocked':{
            deleteTask(tagi,whatTask,'blocked__number','blocked_task')
            break
        }
    }
}



// Function create a new task when repair status's task

function createNewTaskTest(nameTask,nameLocal,objectTask,arrayTask,categoryValue,titleValue,contentValue,statusNow,nameTaskNumber) {
    // arrayTask = JSON.parse(localStorage.getItem(nameLocal))
    console.log(arrayTask)
    console.log('1')
    var objectTask={
        obj_cate: categoryValue,
        obj_title: titleValue,
        obj_content: contentValue,
        obj_hour: takeDate(),
        status: statusNow
    }
    console.log(objectTask)
    arrayTask.push(objectTask);
    console.log(arrayTask)
    var li = document.createElement('li')
    li.setAttribute('class','task')
    nameTask.append(li)
    li.innerHTML = `    
                    <div class="task__container">
                            <div class="category">
                                <div class="text">
                                    <u id="name__cate">${objectTask.obj_cate}</u>
                                    <h4 id="h4">${objectTask.obj_title}</h4>
                                </div>
                                <div class="icon">
                                    <i class="fa-regular fa-pen-to-square" id="pen"></i>
                                    <i class="fa-regular fa-trash-can " id="trash"></i>
                                </div>
                            </div>
                            <div class="task__content">
                                <p id="main__content">${objectTask.obj_content}</p>
                                <div class="now">
                                    <div class="clock">
                                        <i class="fa-regular fa-clock"></i>
                                        <p id="hour">${takeDate()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `  
    li.querySelector('#trash').addEventListener('click',function(){
            var tagi = this
            deleteTask(tagi,arrayTask,nameTaskNumber,nameLocal)
            localStorage.setItem(nameLocal,JSON.stringify(arrayTask))

        })
    li.querySelector('#pen').addEventListener('click',function(){
        tagi = this
        console.log(this)
        repairTask()
        localStorage.setItem(nameLocal,JSON.stringify(arrayTask))

    })
    document.getElementById('todo__number').innerHTML=local_todo.length
    document.getElementById('doing__number').innerHTML=local_doing.length
    document.getElementById('finished__number').innerHTML=local_finished.length
    document.getElementById('blocked__number').innerHTML=local_blocked.length
    localStorage.setItem(nameLocal,JSON.stringify(arrayTask))
    console.log('doi status')
}
document.getElementById('box__input').style.display = 'none';
var todo_task = document.getElementById('todo__list') 
var submit = document.getElementById('submit')
var category = document.getElementById('category');
var title = document.getElementById('title');
var content = document.getElementById('content');
var local_todo = JSON.parse(localStorage.getItem('local_todo'));
    if (local_todo===null){
        local_todo=[];
    }



// Su kien tao task
document.getElementById('new__task').addEventListener('click',function(){
    document.getElementById('box__input').style.display = 'unset'
})
//Accept new task
document.addEventListener('DOMContentLoaded',function(){   
    submit.addEventListener('click',function(){
        document.getElementById('box__input').style.display = 'none'; // Ẩn ô nhập task mới  
        createNewTask()
        localStorage.setItem('todo_task',JSON.stringify(local_todo));
        clearInput()
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
function createNewTask() {
    var obj_todo={
        obj_cate: category.value,
        obj_title: title.value,
        obj_content: content.value,
        obj_hour: '',
        status: todo
    }
    local_todo.push(obj_todo);
    console.log(local_todo)
    
    var task = document.createElement('div'); //tao the task moi
        task.setAttribute('class','task');
        todo_task.appendChild(task)

    var task__container = document.createElement('div');
        task__container.setAttribute('class','task__container')
        task.appendChild(task__container)
    
    var cate = document.createElement('div');
        cate.setAttribute('class','category');
        task__container.appendChild(cate);

    var text = document.createElement('div');
        text.setAttribute('class','text')
        cate.appendChild(text);
    var name__cate= document.createElement('u');
        name__cate.setAttribute('class','name__cate')
        text.appendChild(name__cate);
        name__cate.innerText=category.value;
    var h4 = document.createElement('h4');
        text.appendChild(h4);
        h4.innerText= title.value;

    var icon = document.createElement('div');
        icon.setAttribute('class','icon')
        cate.appendChild(icon)
    var pen = document.createElement('i')
        pen.className='fa-regular fa-pen-to-square'
        icon.appendChild(pen)
    var trash = document.createElement('i')
        trash.className='fa-regular fa-trash-can'
        icon.appendChild(trash)
    var task__content = document.createElement('div');
        task__content.setAttribute('class','task__content')
        task__container.appendChild(task__content)
    var main__content = document.createElement('div');
        main__content.setAttribute('class','main__content');
        task__content.appendChild(main__content)
        main__content.innerText=content.value
    var now = document.createElement('div');
        now.setAttribute('class','now')
        task__content.appendChild(now)
    var clock = document.createElement('div');
        clock.setAttribute('class','clock')
        now.appendChild(clock)
    var clock_icon = document.createElement('i')
        clock_icon.className='fa-regular fa-clock'
        clock.appendChild(clock_icon)
        
    var hour = document.createElement('div');
        hour.setAttribute('class','hour')
        clock.appendChild(hour)
        hour.innerHTML=takeDate()


}

// Function clear input
function clearInput(){
    category.value=''
    title.value=''
    content.value=''
}

//Function printf all task

function printfAllTask(){
    todo_array = JSON.parse(localStorage.getItem('todotask'))
    for(let i=0;i<todo_task.length;i++){

    }
}
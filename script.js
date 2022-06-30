const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
let tasks = []


if(localStorage.getItem('tasks')){
   tasks = JSON.parse(localStorage.getItem('tasks'))
}
tasks.forEach(function (task){
    const cssClass = task.done ? 'task-title whiteList' : 'task-title'
    const doList = `
                    <li  id="${task.id}" class="doList"><span class="${cssClass}">${task.text}</span>
                    <div class="button-group">
                    <button class="btn-done" data-action="Done"><i class="fa-solid fa-check"></i></button>
                    <button class="btn-delete" data-action="Delete"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    </li>`;

    tasksList.insertAdjacentHTML('beforeend', doList);
})
//click
form.addEventListener('submit', addTask)
tasksList.addEventListener('click',deleteTask)
tasksList.addEventListener('click',doneTask)


//func
function addTask(event){
    if(taskInput.value === "") return
    event.preventDefault()
    const taskText = taskInput.value

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    }
    tasks.push(newTask)
    console.log(tasks)

    const cssClass = newTask.done ? 'task-title whiteList' : 'task-title'
    const doList = `
                    <li  id="${newTask.id}" class="doList"><span class="${cssClass}">${newTask.text}</span>
                    <div class="button-group">
                    <button class="btn-done" data-action="Done"><i class="fa-solid fa-check"></i></button>
                    <button class="btn-delete" data-action="Delete"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    </li>`;

    tasksList.insertAdjacentHTML('beforeend', doList);

    taskInput.value = ""
    taskInput.focus()
    saveToLS()
}
function deleteTask(){
    if(event.target.dataset.action !== 'Delete') return

        const parentNode = event.target.closest('li')
        const id = Number(parentNode.id)
        tasks = tasks.filter((task) => task.id !== id)
        saveToLS()
        parentNode.remove()


}
function doneTask(){
    if(event.target.dataset.action === 'Done') return

    const id = Number(parent.node.id)
    const task = tasks.find((task) => task.id === id)

    task.done = !task.done
    saveToLS()
}

function saveToLS() {
localStorage.setItem('tasks', JSON.stringify(tasks))
}
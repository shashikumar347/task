let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editTaskid = null;

const taskform = document.getElementById("taskform");
const tasktablebody = document.getElementById("tasktablebody");
 
window.addEventListener("DOMContentLoaded", () => {
    rendertasks();
});

window.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("duedate").setAttribute("min",today)
})

window.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split('T')[0];
    console.log(today);
    document.getElementById("startdate").value=today;
})
taskform.addEventListener("submit",function(e){
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const duedate = document.getElementById("duedate").value;
    // const startdate = new Date().toISOString().split('T')[0];
    const startdate = document.getElementById("startdate").value;

    if(duedate<startdate){
        alert("due date cannot be before today's date");
        return;
    }
    const task = {
        id:tasks.length+1,
        title,
        description,
        startdate,
        duedate
    };
    tasks.push(task);
    rendertasks();
    taskform.reset();
    savetasks();
});
function rendertasks() {
    tasktablebody.innerHTML = "";
    tasks.forEach(task=>{
        const row= document.createElement("tr");

        row.innerHTML = `
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.startdate}</td>
        <td>${task.duedate}</td>
        <td>
        <button onclick = "edittask(${task.id})">Edit</button>
        <button id = 'del' onclick= "deletetask(${task.id})">Delete</button>
        </td>
        `;
        tasktablebody.appendChild(row);
});
}
function deletetask(id) {
    tasks = tasks.filter(tasks => tasks.id !== id);
    rendertasks();
    savetasks();
}
function savetasks () {
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function edittask(id) {
    editTaskid = id;
    const task = tasks.find(t=> t.id === id);
    document.getElementById("edittitle").value = task.title;
    document.getElementById("editdescription").value = task.description;
    document.getElementById("editduedate").value = task.duedate;
    document.getElementById("overlay").style.display = "block";
    document.getElementById("editpopup").style.display = "block";
}
function updatetask() {
    const newtitle = document.getElementById("edittitle").value;
    const newdesc = document.getElementById("editdescription").value;
    const newdue = document.getElementById("editduedate").value;

    // const today = new Date().toISOString().split('T')[0];

    const task = tasks.find(t => t.id === editTaskid);
    if(task) {
        task.title = newtitle;
        task.description = newdesc;
        task.duedate = newdue;
        rendertasks();
        closepopup();
    }
}
function closepopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("editpopup").style.display = "none";
}
// add event listeners for click events to control delete API requests

let delButtonUser = Array.from(document.querySelectorAll('.delUser'))
delButtonUser.forEach(element => element.addEventListener('click', delUserFunct))

let delButtonEx = Array.from(document.querySelectorAll('.delEx'))
delButtonEx.forEach(element => element.addEventListener('click', delExFunct))

// function to send API delete requests for deleting a user

function delUserFunct(click){
    const userName = click.target.parentElement.firstElementChild.innerText.split(":")[1]
    fetch('/removeUser', {method: 'delete', 
    headers: {'Content-Type':'application/JSON'},
    body: JSON.stringify({'removeName':userName})})
        .then(() => {
        location.reload()
    }) 
}

// function to send API delete requests for deleting an exercise

function delExFunct(click){
    const exerciseRemove = click.target.parentElement.firstElementChild.innerText.split(":")[1]
    fetch('/removeExercise', {method: 'delete', 
    headers: {'Content-Type':'application/JSON'},
    body: JSON.stringify({'removeEx':exerciseRemove})})
        .then(() => {
        location.reload()
    }) 
}






    
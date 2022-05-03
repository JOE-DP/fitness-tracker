let delButtonUser = Array.from(document.querySelectorAll('.delUser'))
delButtonUser.forEach(element => element.addEventListener('click', delUserFunct))

function delUserFunct(click){
    const userName = click.target.parentElement.firstElementChild.innerText.split(":")[1]
    fetch('/removeUser', {method: 'delete', 
    headers: {'Content-Type':'application/JSON'},
    body: JSON.stringify({'removeName':userName})})
        .then(() => {
        location.reload()
    }) 
}

let delButtonEx = Array.from(document.querySelectorAll('.delEx'))
delButtonEx.forEach(element => element.addEventListener('click', delExFunct))

function delExFunct(click){
    const exerciseRemove = click.target.parentElement.firstElementChild.innerText.split(":")[1]
    console.log(exerciseRemove)
    fetch('/removeExercise', {method: 'delete', 
    headers: {'Content-Type':'application/JSON'},
    body: JSON.stringify({'removeEx':exerciseRemove})})
        .then(() => {
        location.reload()
    }) 
}



let theUrl = window.location.href.split('/')
let theQuery = theUrl[theUrl.length - 1]





    
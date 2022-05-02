let delButton = Array.from(document.querySelectorAll('.delEx'))
delButton.forEach(element => element.addEventListener('click', delFunct))

function delFunct(click){
    const exName = click.target.parentElement.firstElementChild.innerText.split(":")[1]
    fetch('/remove', {method: 'delete', 
    headers: {'Content-Type':'application/JSON'},
    body: JSON.stringify({'exTitle': exName})})
        .then(() => {
        console.log(exName)
        location.reload()
    }) 
}



let theUrl = window.location.href.split('/')
let theQuery = theUrl[theUrl.length - 1]





    
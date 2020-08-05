/*
Discussion Topics
-Asynchronous and Synchronous Programming 
-Promises
-Fetch
*/

//Synchronous - runs your code / program from top to bottom

let a = 1
let b = 2

//setTimeout is a method which is Aynchronous by nature
setTimeout(function() {
    console.log("Asynchronous")
}, 0.1)

console.log(a)
console.log(b)

/*
Real life example of Asynchronous and Synchronous
by making a soup are :
    - onions
    - carrots
    - flour
    - salt
    - pepper
    - water

Synchronous way of making the soup :
-Chop the onion
-Chop the carrots
-Open the stove and heat the water
-Put chop onion on the soup pan
-Put chop carrots on the soup pan
-Add salt
-Add pepper
-Put the flour and mix it 

Asynchronous way of making the soup:
-Open the stove and heat the water
-Chop the onion
-Chop the carrots
-Season your carrots and onion with salt and pepper
-Add flour and then mix it


Asynchronous is like a chef and synchronous is like a beginner cook */

/*
Synchronous - do something one by one from top to bottom

Asychronous - will do something if it waits for something to finish
*/

/*Promise in js is a good example of asynchronous
-Promises in js is like a promise in real life. Its either you do the promise or reject the promise */
let p = new Promise(function(resolve, reject) {
    let sum = 5 + 5
    if (sum == 10) {
        resolve({message: 'Promises is resolves', status : 200})
    } else {
        reject('Promises is rejected')
    }
})

p.then(function(res){
    console.log(res)
}).catch(function(e){
    console.log(e)
}).finally(function(){
    console.log("This will run either the promises is resolved or rejected")
})
// console.log(p)

//If the promise is resolved the value being reuruned is gonna be stored in the first then
//If the promise is rejected the value being returned is gonna be stored in the catch

fetch("https://jsonplaceholder.typicode.com/posts")
.then(function(res) {
    return res.json(res)
})
.then(function(data) {
    localStorage.setItem('posts', JSON.stringify(data))
})
/*
fetch(url) fetch - decode - execute cycle       
.then()
.then()
*/


function getPosts(){
    let posts = JSON.parse(localStorage.getItem('posts'))
    let result = posts.map((post, i) => 
    `<li data-id="${i}">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <button class = "edit" >Edit</button>
        <button class='delete'>Delete</button>
    </li>`).reverse().join('')
    document.getElementById('posts').innerHTML = result
}

document.addEventListener('DOMContentLoaded', getPosts)
document.addEventListener('click', (e) => {
    if(e.target && e.target.getAttribute('class') == 'delete') {
        let index = (e.target.parentElement.getAttribute('data-id'))
        let posts = JSON.parse(localStorage.getItem('posts'))
        if(confirm("Are you want to delete")){
            posts.splice(index, 1)
            localStorage.setItem('posts', JSON.stringify(posts))
            e.target.parentElement.remove()
        } else {
            getPosts()
        }
        
    }
})
document.addEventListener('DOMContentLoaded', getPosts)
document.addEventListener('click', (e) => {
    if(e.target.parentElement && e.target.getAttribute('class') == 'edit') {
        let editBox = document.createElement('div')
		editBox.innerHTML = `
            <input type = 'text' value = '${e.target.previousElementSibling.previousElementSibling.innerText}'   id = "new">
            <input type = 'text' value = '${e.target.previousElementSibling.innerText}'   id= "new1">
			<button class = 'confirm'>Confirm</button>
			<button class = 'cancel'>Cancel</button>
		`
		e.target.previousElementSibling.append(editBox)
		e.target.disabled = true
    }

    document.addEventListener('click', (e) => {
        if(e.target && e.target.getAttribute('class') == 'cancel') {
            e.target.parentElement.parentElement.nextElementSibling.removeAttribute('disabled')
            e.target.parentElement.remove()
        }
    })
    

    })

    document.addEventListener('click', (e) => {
        if(e.target && e.target.getAttribute('class') == 'confirm') {
            let title = document.getElementById('new').value
            let body = document.getElementById('new1').value
            // console.log(title, body)
            let post = new Object()
            post.title = title
            post.body = body
            console.log(post) //this will now be an obejct
            let posts = JSON.parse(localStorage.getItem('posts'))
            posts.push(post)
            localStorage.setItem('posts', JSON.stringify(posts))
            getPosts()
        
            
        }
    })




document.getElementById('post-form').addEventListener('submit', e => {
    e.preventDefault()
    let title = document.getElementById('title').value
    let body = document.getElementById('body').value
    // console.log(title, body)
    let post = new Object()
    post.title = title
    post.body = body
    console.log(post) //this will now be an obejct
    let posts = JSON.parse(localStorage.getItem('posts'))
    posts.push(post)
    localStorage.setItem('posts', JSON.stringify(posts))
    getPosts()

    document.getElementById('title').value = ''
    document.getElementById('body').value = ''

    
})


    




/*Excersise:
-When delete button is clicked it should ask first to confirm weather youre sure to delete the post -ok
-When adding post the input boxes should be cleared -ok
-Make the edit function work.
    -When edit button is clicked it should show up a form where the current title and body is written on the input  
    -When submited the title and body should change*/
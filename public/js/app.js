// const { response } = require("express");

console.log("This is client side javascript");

// fetch('https://puzzle.mead.io/puzzle').then ((response) => {
//     data = 
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error);
//         }else{
//             console.log(data);
//         }
//     })
// })


// // challenges



const weatherForm = document.querySelector('form')
const serach = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = serach.value

    messageOne.textContent='Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    data = 
    response.json().then((data) => {
        if(data.error){
           messageOne.textContent= data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
    // console.log(location);
} )
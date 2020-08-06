const weatherForm = document.querySelector('form#weatherForm')
const search = document.querySelector('input')
const messageOne = document.querySelector('p#successMessage')
const messageTwo = document.querySelector('p#errorMessage')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    messageTwo.textContent = ''
    messageOne.textContent = 'Loading...'

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.location
            }
        })
    })   
    
})
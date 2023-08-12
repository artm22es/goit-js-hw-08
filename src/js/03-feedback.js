import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form')
const LOCAL_KEY = 'feedback-form-state'

form.addEventListener('input', throttle(onInput, 500))
form.addEventListener('submit', onSubmit)

const { email, message } = form.elements

function onInput() {
    const obj = {
        email: email.value.trim(),
        message: message.value.trim()
    };
    localStorage.setItem(LOCAL_KEY, JSON.stringify(obj))
}
pageReload()
function onSubmit(evt) {
    evt.preventDefault()
    if (!email.value || !message.value) {
        return alert('Por favor rellene todos los campos!');
    }
    const savedData = JSON.parse(localStorage.getItem(LOCAL_KEY))
    console.log(savedData);

    localStorage.removeItem(LOCAL_KEY)
    form.reset()
}

function pageReload() {
    const savedData = JSON.parse(localStorage.getItem(LOCAL_KEY))
    
    if (savedData) {
        email.value = savedData.email || '';
        message.value = savedData.message || '';
    }
}

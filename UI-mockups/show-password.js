const showpass = document.querySelector('.show-pass');
showpass.addEventListener('click', (e) => {
    console.log(e)
    const password = document.querySelector('#password')
    password.addEventListener('pointerout' , () => {
        password.classList.remove("password-focus");
    })
    password.classList.add("password-focus");
    if (password.type === 'password') {
        password.type = 'text'
    } else {
        password.type = 'password'
    }
})
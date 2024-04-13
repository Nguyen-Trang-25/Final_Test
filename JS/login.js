const arrayUser = JSON.parse(localStorage.getItem('userLocal')) || [];

console.log(arrayUser);

1
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function register() {
    const newUsername = document.getElementById('regis__email').value;
    const newPassword = document.getElementById('regis__pass').value;

    if (!newUsername || !newPassword) {
        alert("Please enter both username and password.");
        return;
    }

    if (!validateEmail(newUsername)){
        resetInput('regis__email','login__email')
        alert("Enter the correct email format.");
        return;
    }

    if (isUsernameTaken(newUsername)) {
        alert("Email already exists! Try another.");
        return;
    }

    if(!document.getElementById('regis__check').Checked){
        alert("Accept all terms.");
    }

    const user = {
        username: newUsername,
        password: newPassword
    }
    arrayUser.push(user)
    localStorage.setItem('userLocal', JSON.stringify(arrayUser))
}

function isUsernameTaken(username) {
    for (let i = 0; i < arrayUser.length; i++) {
        if (arrayUser[i].username === username) {
            return true
        }
    }
    return false
}

async function login() {


    const username = document.getElementById('login__email').value
    const password = document.getElementById('login__pass').value

    if (!username || !password) {
        alert("Please enter both username and password.")
        return;
    }

    if (!validateEmail(username)){
        resetInput('login__email','login__pass')
        alert("Enter the correct email format.")
        return;
    }

    try {
        const response = await fetch('https://recruitment-api.pyt1.stg.jmr.pl/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: username, password: password })
        });

        if (response.status !== "ok") {
            alert('Failed to login.')
            return
        }
        
        const data = await response.json()
        
        if (data.status === 'ok') {
            alert("Login successful!")
            redirectToNewPage()
        } else {
            alert('Failed to login.');
            return
        }
    } catch (error) {
        console.error(error)
        alert("Failed to login.")
        return
    }
}
function redirectToNewPage() {
    window.location.href = "./todo.html"
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("register").addEventListener("click", function(){
        resetInput('login__email','login__pass')
        document.querySelector('.regis__content').style.display = 'flex'
        document.querySelector('.login__content').style.display = 'none'
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login").addEventListener("click", function(){
        resetInput('regis__email','login__email')
        document.querySelector('.regis__content').style.display = 'none'
        document.querySelector('.login__content').style.display = 'flex'
    });
});

function resetInput(email,pass){
    document.getElementById(email).value = ''
    document.getElementById(pass).value = ''
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("button__login").addEventListener("click", login);
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("button__register").addEventListener("click", register);
});

function redirectToRegister() {

    document.getElementById("open_login").style.display = 'none';
    document.getElementById("open_register").style.display = 'flex';
    document.getElementById("login_area").style.display = 'none';
    document.getElementById("register_area").style.display = 'flex';

    document.getElementById("register_style").style.borderBottom = '2px solid #11698E'
    document.getElementById("login_style").style.borderBottom = 'none'
}

function redirectToLogin() {

    document.getElementById("open_login").style.display = 'flex';
    document.getElementById("open_register").style.display = 'none';
    document.getElementById("login_area").style.display = 'flex';
    document.getElementById("register_area").style.display = 'none';

    document.getElementById("register_style").style.borderBottom = 'none'
    document.getElementById("login_style").style.borderBottom = '2px solid #11698E'

}
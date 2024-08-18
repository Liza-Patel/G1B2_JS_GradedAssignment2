
function storeCredentials(username, password) {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
}

// Initial setup, only run once
storeCredentials('admin', 'admin123');

window.onload = function () {


    // Redirect to resume page if already logged in
    if (localStorage.getItem('loggedIn') === 'true') {
        window.location.href = 'resume.html';
    }
};

// Login Functionality
function login() {
    const enteredUsername = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'resume.html';
    } else {
        document.getElementById('error-message').innerHTML = 'invalid username/password';
    }
}


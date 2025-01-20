function login(event) {
    event.preventDefault();
    const enteredName = document.getElementById('username').value;
    const enteredPassword = document.getElementById('password').value;
    const storedData = JSON.parse(localStorage.getItem('users'));
    if (storedData && Array.isArray(storedData)) {
        const user = storedData.find(data => data.username === enteredName && data.password === enteredPassword);
        if (user) {
            alert('Giriş uğurludur!');
            localStorage.setItem('loggedInUser', enteredName);
            window.location.href = './index.html';
        } else {
            alert('İstifadəçi tapılmadı');
        }
    } else {
        alert('İstifadəçi tapılmadı');
    }
 }
 
 
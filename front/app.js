document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const usernameHeader = document.getElementById('usernameHeader');
    const logoutButton = document.getElementById('logoutButton');
    if (usernameHeader && loggedInUser) {
        usernameHeader.textContent = `İstifadəçi adı: ${loggedInUser}`;
        logoutButton.style.display = 'inline-block';
        document.getElementById("btn").innerText = "Kompüterlerim";
        document.querySelector(".a2").href = "komputerlerim.html"
    }
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('loggedInUser');
            location.reload();
           document.getElementById("btn").innerText = "Hesaba daxil ol";
            document.getElementById("a").href = "./hesab.html";
        });
    }
});


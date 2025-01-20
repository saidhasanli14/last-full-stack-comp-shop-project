document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const user = {
        name: document.getElementById("exampleInputEmail1").value,
        phone: document.getElementById("exampleInputEmail3").value,
        username: document.getElementById("exampleInputEmail2").value,
        password: document.getElementById("exampleInputPassword1").value
    };

    fetch(api)

});



let form = document.querySelector("form");
let button = document.querySelector("#btn1");
let inputs = document.querySelectorAll("input");

inputs.forEach(input => {
    input.addEventListener("keyup", () => {
        let trueMessage = input.nextElementSibling.nextElementSibling.nextElementSibling;
        let falseMessage = input.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
        if (input.checkValidity()) {
            trueMessage.style.display = "block";
            falseMessage.style.display = "none"
            input.nextElementSibling.style.display = "none"
            input.nextElementSibling.nextElementSibling.style.display = "block"
        } else {
            trueMessage.style.display = "none";
            falseMessage.style.display = "block"
            input.nextElementSibling.style.display = "block"
            input.nextElementSibling.nextElementSibling.style.display = "none"
        }
    })
})

button.addEventListener("click", (event) => {
    event.preventDefault();
    if (form.checkValidity()) {
        addNewUser();
        form.reset();
    } else {
        console.log("Form valid deyil");
    }
})

function checkUserFromLocalStorage() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    return users
}

function addNewUser() {
    let newUser = {};
    inputs.forEach(input => {
        newUser[input.name] = input.value
    });
    let users = checkUserFromLocalStorage();
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("User Elave edildi", newUser);
    showelement()
}

function showelement() {
    document.querySelector(".message").style.display = "block";
    setTimeout(() => {
        document.querySelector(".message").style.display = "none";
    }, 3000
    )

}
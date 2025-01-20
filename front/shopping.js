let globalPhone;

function showComputerDetails(computer) {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    const computerDetailsDiv = document.getElementById('computerDetails');
    computerDetailsDiv.innerHTML = '';
    const registrationData = JSON.parse(localStorage.getItem('users')) || [];
    const user = registrationData.find(entry => entry.username === computer.owner);
    globalPhone = user ? user.phone : '';
    const computerDetails = document.createElement('div');
    computerDetails.innerHTML = `
        <h3>${computer.name}</h3>
        <img src="${computer.image}" alt="${computer.name}">
        <p>Ad: ${computer.owner}</p>
        <p>Telefon: ${globalPhone}</p>
        <p>Qiymət: ${computer.price}</p>
        <p>Yaddaş: ${computer.storage}</p>
        <p>Yaddaşın tipi: ${computer.hddorssd}</p>
        <p>RAM: ${computer.ram}</p>
        <p>Əməliyyat sistemi: ${computer.os}</p>
        <p>Mərkəzi Prosessor: ${computer.cpu}</p>
        <p>Video Card: ${computer.gpu}</p>
        <p>Yeni/Köhnə: ${computer.condition}</p>
    `;
    computerDetailsDiv.appendChild(computerDetails);
    popup.style.display = 'flex';
}
function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}
function filterComputersByCategory(category, globalPhone) {
    const computerListDiv = document.getElementById('computerList');
    computerListDiv.innerHTML = '';
    const registrationData = JSON.parse(localStorage.getItem('users')) || [];

    const addedComputers = new Set();
    for (let i = 0; i < registrationData.length; i++) {
        const user = registrationData[i].username;
        const userComputerDataKey = `computerData_${user}`;
        const userComputerData = JSON.parse(localStorage.getItem(userComputerDataKey)) || [];

        for (let j = 0; j < userComputerData.length; j++) {
            const computer = userComputerData[j];
            if ((category === undefined || computer.category === category) && !addedComputers.has(computer.name)) {
                const computerDiv = document.createElement('div');
                computerDiv.classList.add('computer-card');
                computerDiv.innerHTML = `
                    
                    <img src="${computer.image}" alt="${computer.name}">
                    <p class ="name"><span>Ad:</span> ${computer.category}</p>
                    <p><span>Təsvir:</span> ${computer.name}</p>
                    <p><span>Qiymət:</span> ${computer.price} AZN</p>
                    <p><span>Yeni:</span> ${computer.condition}</p>
                    <p><span>Telefon:</span>070-770-7070</p>
                    <button class="about">Ətraflı</button>
                `;
                computerDiv.querySelector(".about").addEventListener('click', function () {
                    showComputerDetails(computer);
                });
                computerListDiv.appendChild(computerDiv);
                addedComputers.add(computer.name);
            }
        }
    }
}

function loadAllComputersToPage() {
    const registrationData = JSON.parse(localStorage.getItem('users')) || [];
    const categories = new Set();
    for (let i = 0; i < registrationData.length; i++) {
        const user = registrationData[i].username;
        const userComputerDataKey = `computerData_${user}`;
        const userComputerData = JSON.parse(localStorage.getItem(userComputerDataKey)) || [];
        for (let j = 0; j < userComputerData.length; j++) {
            const computer = userComputerData[j];
            categories.add(computer.category);
        }
    }
   
    filterComputersByCategory();
}

window.onload = function () {
    loadAllComputersToPage();
    showComputerDetails()
};

$(document).ready(function () {
        loadAllComputersToPage();
        $('li').on('click', function () {
            $(this).addClass('blue');
            $('ul li').not(this).removeClass('blue');

            let value = $(this).text().toLowerCase();
            $(".computer-card .name").filter(function() {
              $(this).closest(".computer-card").toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });


        $("#searchInput").on("keyup", function() {
            let value = $(this).val().toLowerCase();
            $(".computer-card .name").filter(function() {
              $(this).closest(".computer-card").toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
          });
    });


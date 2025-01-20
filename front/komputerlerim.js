let editingRow = null;
var selectedStudentId = 0;
var API_URL = "https://localhost:8484";
function toggleComputerForm() {
    let formOverlay = document.getElementById('computerFormOverlay');
    formOverlay.style.display = (formOverlay.style.display === 'none' || formOverlay.style.display === '') ? 'flex' : 'none';
}

function saveComputer(event) {
    event.preventDefault();

    let category = document.getElementById('category').value;
    let computerName = document.getElementById('computerName').value;
    let computerPrice = document.getElementById('computerPrice').value;
    let condition = document.getElementById('condition').value;
    let computerImage = document.getElementById('computerImage').value;
    let ram = document.getElementById('ram').value;
    let cpu = document.getElementById('cpu').value;
    let storage = document.getElementById('storage').value;
    let hddorssd = document.getElementById('storageType').value;
    let os = document.getElementById('os').value;
    let gpu = document.getElementById('gpu').value;

    let computerObject = {}
    computerObject.id = selectedComputerId;
    computerObject.category = selectedComputercategory;
    computerObject.name = selectedComputerName;
    computerObject.price = selectedComputerPrice;
    computerObject.condition = selectedComputerCondition;
    computerObject.image = selectedComputerImage;
    computerObject.ram = selectedComputerRam;
    computerObject.cpu = selectedComputerCpu;
    computerObject.storage = selectedComputerStorage;
    computerObject.hddorssd = selectedComputerHddorssd;
    computerObject.os = selectedComputerOs;
    computerObject.gpu = selectedComputerGpu;
    let http = new XMLHttpRequest();

    if (
        !category ||
        !computerName ||
        !computerPrice ||
        !condition ||
        !computerImage ||
        !ram ||
        !cpu ||
        !storage ||
        !hddorssd ||
        !os ||
        !gpu

    ) {
        alert('Don\'t leave empty!');
        return;
    }

    http.onload = function () {
        if (http.status == 400) {
            let nameError = "";
            let priceError = "";
            let imageError = "";
            let ramError = "";
            let cpuError = "";
            let storageError = "";
            let hddorssdError = "";
            let osError = "";
            let gpuError = "";

            errorObject.validations.forEach(error => {

                if (error.field == 'name') {
                    nameError += error.message + "<br>";
                }

                if (error.field == 'price') {
                    priceError += error.message + "<br>";
                }

                if (error.field == 'image') {
                    imageError += error.message + "<br>";
                }

                if (error.field == 'ram') {
                    ramError += error.message + "<br>";
                }

                if (error.field == 'cpu') {
                    cpuError += error.message + "<br>";
                }

                if (error.field == 'storage') {
                    storageError += error.message + "<br>";
                }

                if (error.field == 'hddorssd') {
                    hddorssdError += error.message + "<br>";
                }

                if (error.field == 'os') {
                    osError += error.message + "<br>";
                }

                if (error.field == 'gpu') {
                    gpuError += error.message + "<br>";
                }

            });
            nameErrorElement.innerHTML = nameError;
            priceErrorElement.innerHTML = priceError;
            imageErrorElement.innerHTML = imageError;
            ramErrorElement.innerHTML = ramError;
            cpuErrorElement.innerHTML = cpuError;
            storageErrorElement.innerHTML = storageError;
            hddorssdErrorElement.innerHTML = hddorssdError;
            osErrorElement.innerHTML = osError;
            gpuErrorElement.innerHTML = gpuError;

        } else {
            clearErrorMessages();
            selectedComputerId = 0;
            setHeaderText("Yeni");
            loadAllComputers();
        }

    }

    http.open('POST', API_URL + "/computers", true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.send(JSON.stringify(computerObject));

    function loadAllComputers() {
        var http = new XMLHttpRequest();

        http.onload = function () {
            let response = this.responseText;
            let computersArray = JSON.parse(response);
            fillComputersTable(computersArray);
        }
        http.open('GET', API_URL + "/computers", true);
        http.send();
    }

    function fillComputersTable(computers) {
        let computersTbodyHtml = "";
        for (let i = 0; i < computers.length; i++) {
            let computer = computers[i];
            computersTbodyHtml += "<tr><td>" + computer.id + "</td>";
            computersTbodyHtml += "<td>" + computer.name + "</td>";
            computersTbodyHtml += "<td><img src='" + computer.image + "' width='100'></td>";
            computersTbodyHtml += "<td>" + computer.price + "</td>";

            computersTbodyHtml += "<td><button class ='btn btn-danger' onclick ='deleteComputer(" + computer.id + ")'>Sil</button>";
            computersTbodyHtml += "<button class ='btn btn-primary' onclick ='editComputer(" + computer.id + ")'>Redaktə et</button></td></tr>";
        }
        computerTbodyElement.innerHTML = computersTbodyHtml;

        $(document).ready(function () {
            $('#computers-table').DataTable();
        });
    }
    loadAllComputers();

    function deleteComputer(computerId) {
        if (confirm("Delete named computer?")) {
            let http = new XMLHttpRequest();
            http.onload = function () { 
                loadAllComputers();
            }

            http.open('DELETE', API_URL + "/computers" + computerId, true);
            http.send();
        }
    }

    function editComputer(computerId) {
        selectedStudentId = computerId;
        let http = new XMLHttpRequest();
        http.onload = function () {
            let response = this.responseText;
            let computerObject = JSON.parse(response);
            computerName = document.getElementById('computerName').value = computerObject.name;
            computerPrice = document.getElementById('computerPrice').value = computerObject.price;
            computerImage = document.getElementById('computerImage').value = computerObject.image;
            ram = document.getElementById('ram').value = computerObject.ram;
            cpu = document.getElementById('cpu').value = computerObject.cpu;
            storage = document.getElementById('storage').value = computerObject.storage;
            hddorssd = document.getElementById('storageType').value = computerObject.hddorssd;
            os = document.getElementById('os').value = computerObject.os;
            gpu = document.getElementById('gpu').value = computerObject.gpu;
        }
        http.open('GET', API_URL + "/computers" + computerId, true);
        http.send();
    }

    function setHeaderText(text) {
        headerTextElement.innerHTML = text;
    }
    setHeaderText("Yeni");
    
    function clearErrorMessages() {
        nameErrorElement.innerHTML ="";
        priceErrorElement.innerHTML ="";
        imageErrorElement.innerHTML ="";
        ramErrorElement.innerHTML ="";
        cpuErrorElement.innerHTML ="";
        storageErrorElement.innerHTML ="";
        hddorssdErrorElement.innerHTML ="";
        osErrorElement.innerHTML ="";
        gpuErrorElement.innerHTML ="";
    }

    function toggleComputerForm(computerId) {
        selectedComputerId = computerId;
        setHeaderText(computerId);
        let http = new XMLHttpRequest();
        http.onload = function(){
            let response = this.responseText;
            let computerObject = JSON.parse(response);
            computerName = document.getElementById('computerName').value = computerObject.name;
            computerPrice = document.getElementById('computerPrice').value = computerObject.price;
            computerImage = document.getElementById('computerImage').value = computerObject.image;
            ram = document.getElementById('ram').value = computerObject.ram;
            cpu = document.getElementById('cpu').value = computerObject.cpu;
            storage = document.getElementById('storage').value = computerObject.storage;
            hddorssd = document.getElementById('storageType').value = computerObject.hddorssd;
            os = document.getElementById('os').value = computerObject.os;
            gpu = document.getElementById('gpu').value = computerObject.gpu;
        }

        http.open('GET', API_URL + "/computers/" + computerId, true);
        http.send();
    }

    

   
}

function resetComputerForm() {
    let form = document.getElementById('addComputerForm');
    form.reset();
    editingRow = null;
}



function generateNextId(data) {
    let maxId = 0;
    for (let i = 0; i < data.length; i++) {
        let currentId = parseInt(data[i].id);
        maxId = Math.max(maxId, currentId);
    }
    return maxId + 1;
}

function updateComputer(row, category, newName, newImage, newPrice, condition, ram, cpu, storage, storageType, os, gpu) {
    let cells = row.cells;
    cells[0].textContent = generateNextId(userComputerData);
    cells[1].textContent = newName;

    let imageElement = document.createElement('img');
    imageElement.src = newImage;
    imageElement.alt = newName;
    cells[2].innerHTML = '';
    cells[2].appendChild(imageElement);

    cells[3].textContent = `${newPrice} AZN`;
    saveToLocalStorage();
}


function updateIds() {
    let tableBody = document.getElementById('computerTableBody');
    let rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].textContent = i + 1;
    }
}

function createButton(text, clickHandler, colorClass) {
    let button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    button.classList.add(colorClass);
    return button;
}

function saveToLocalStorage() {
    let tableBody = document.getElementById('computerTableBody');
    let rows = tableBody.getElementsByTagName('tr');
    let computerData = [];
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].cells;
        let computer = {
            id: cells[0].textContent,
            name: cells[1].textContent,
            image: cells[2].getElementsByTagName('img')[0].src,
            price: cells[3].textContent.slice(0, -4),
            owner: rows[i].getAttribute('data-owner')
        };
        computerData.push(computer);
    }
    localStorage.setItem('computerData', JSON.stringify(computerData));

}

function loadFromLocalStorage() {
    const tableBody = document.getElementById('computerTableBody');
    tableBody.innerHTML = '';
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userComputerDataKey = `computerData_${loggedInUser}`;
    const userComputerData = JSON.parse(localStorage.getItem(userComputerDataKey)) || [];

    const startIndex = (currentPage - 1) * computersPerPage;
    const endIndex = startIndex + computersPerPage;

    for (let i = startIndex; i < endIndex && i < userComputerData.length; i++) {
        const computer = userComputerData[i];
        const newRow = tableBody.insertRow();
        const idCell = newRow.insertCell(0);
        const nameCell = newRow.insertCell(1);
        const imageCell = newRow.insertCell(2);
        const priceCell = newRow.insertCell(3);
        const operationsCell = newRow.insertCell(4);

        idCell.textContent = computer.id;
        nameCell.classList.add("name-cell")
        nameCell.textContent = computer.name;

        const imageElement = document.createElement('img');
        imageElement.src = computer.image;
        imageElement.alt = computer.name;
        imageElement.classList.add('table-img');
        imageElement.addEventListener('click', function () {
            showEnlargedImage(computer.image);
        });
        imageCell.appendChild(imageElement);

        priceCell.textContent = `${computer.price} AZN`;
        newRow.setAttribute('data-owner', computer.owner);


        const deleteButton = createButton('Sil', function () {
            deleteComputer(newRow, computer.name);
        }, 'red-button');
        const editButton = createButton('Redaktə et', function () {
            editComputer(newRow);
        }, 'blue-button');
        operationsCell.appendChild(deleteButton);
        operationsCell.appendChild(editButton);

    }

    updateRowAndVisibleCount();
}

window.onload = function () {
    loadFromLocalStorage();
    updateRowAndVisibleCount();
};

let inputs = document.querySelectorAll("input")
inputs.forEach(input => {
    input.addEventListener("keyup", () => {
        let trueMessage = input.nextElementSibling;
        let falseMessage = input.nextElementSibling.nextElementSibling;
        if (input.checkValidity()) {
            trueMessage.style.display = "block";
            falseMessage.style.display = "none"
        } else {
            trueMessage.style.display = "none";
            falseMessage.style.display = "block"
        }
    });

})

function closeComputerForm() {
    document.getElementById('computerFormOverlay').style.display = 'none';
}
function previewImage(input) {
    const imagePreview = document.getElementById('imagePreview');
    const imageUrl = input.value;
    imagePreview.src = imageUrl;
}




document.addEventListener('DOMContentLoaded', function () {
    const headers = document.querySelectorAll('th');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            sortTable(header);
        });
    });
    function sortTable(header) {
        const table = header.closest('table');
        const tbody = table.querySelector('tbody');
        const column = header.cellIndex;
        const rows = Array.from(tbody.querySelectorAll('tr'));

        const isAscending = header.classList.contains('asc');


        headers.forEach(h => h.classList.remove('asc', 'desc'));


        const sortedRows = rows.sort((a, b) => {
            const aValue = a.cells[column].textContent.trim();
            const bValue = b.cells[column].textContent.trim();
            return isAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });


        header.classList.toggle('asc', !isAscending);
        header.classList.toggle('desc', isAscending);


        tbody.innerHTML = '';
        sortedRows.forEach(row => tbody.appendChild(row));
    }


});

/////////////show entres
function updateRowCount() {
    const rowCount = document.getElementById('rowCount');
    const rowCountVisible = document.getElementById('rowCountVisible');
    const tableBody = document.getElementById('computerTableBody');
    const visibleRows = tableBody.querySelectorAll('tr').length;
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userComputerDataKey = `computerData_${loggedInUser}`;
    const userComputerData = JSON.parse(localStorage.getItem(userComputerDataKey)) || [];

    rowCount.textContent = visibleRows;
    rowCountVisible.textContent = userComputerData.length;
}
function updateRowAndVisibleCount() {
    updateRowCount();
}

/////////////////back and next

let currentPage = 1;
const computersPerPage = 5;

function showNextPage() {
    currentPage++;
    loadFromLocalStorage();
}

function showPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        loadFromLocalStorage();
    }
}

document.querySelector('button#nextButton').addEventListener('click', showNextPage);
document.querySelector('button#backButton').addEventListener('click', showPreviousPage);
////////////////////////modal

function showEnlargedImage(imageUrl) {
    const enlargedImage = document.getElementById('enlargedImage');
    enlargedImage.src = imageUrl;

    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    imageModal.show();
}

$(document).ready(function () {
    $("#search-1").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#computerTableBody .name-cell").filter(function () {
            $(this).closest("tr").toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
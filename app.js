const form = document.getElementById('data-form');
const resultDiv = document.getElementById('result');
const dataDiv = document.getElementById('data');
let totalCost = 0;
let totalPrice = 0;
let entries = JSON.parse(localStorage.getItem('entries')) || [];
let currentId = entries.length ? Math.max(...entries.map(entry => parseInt(entry.id))) + 1 : 1;

function init() {
    calculateTotals();
    displayEntries();
    displayResults();
    document.getElementById('id').value = String(currentId).padStart(4, '0'); //ID เริ่มต้น
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const id = String(currentId).padStart(4, '0'); // แปลง string 4 ตัว
    const username = document.getElementById('username').value || '';
    const information = document.getElementById('information').value || '';
    const gmail = document.getElementById('gmail').value || '';
    const cost = parseFloat(document.getElementById('cost').value) || 0;
    const price = parseFloat(document.getElementById('price').value) || 0;

    const entry = { id, username, information, gmail, cost, price };
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));

    currentId++; // เพิ่ม ID +1
    form.reset();
    document.getElementById('id').value = String(currentId).padStart(4, '0');

    calculateTotals();
    displayEntries();
    displayResults();
});

function calculateTotals() {
    totalCost = entries.reduce((sum, entry) => sum + entry.cost, 0);
    totalPrice = entries.reduce((sum, entry) => sum + entry.price, 0);
}

function displayEntries() {
    let tableContent = `
        <h3>ข้อมูลที่บันทึก</h3>
        <table border="1">
            <tr>
                <th id="safe-id">ID</th>
                <th id="safe-user">USERNAME</th>
                <th id="safe-info">INFORMATION</th>
                <th id="safe-gm">GMAIL</th>
                <th id="safe-cost">COST</th>
                <th id="safe-price">PRICE</th>
                <th id="safe-btn"></th>
            </tr>
`;
    
    entries.forEach((entry, index) => {
        tableContent += `
            <tr>
                <td>${entry.id}</td>
                <td>${entry.username}</td>
                <td>${entry.information}</td>
                <td>${entry.gmail}</td>
                <td>${entry.cost > 0 ? entry.cost.toFixed(2) : ''}</td>
                <td>${entry.price > 0 ? entry.price.toFixed(2) : ''}</td>
                <td><button onclick="deleteEntry(${index})">DEL</button></td>
            </tr>
        `;
    });

    tableContent += `</table>`;
    dataDiv.innerHTML = tableContent;
}

function deleteEntry(index) {
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));

    calculateTotals();
    displayEntries();
    displayResults();
}

function displayResults() {
    const profit = totalPrice - totalCost;
    resultDiv.innerHTML = `
        <h3>ผลลัพธ์</h3>
        <table border="1">
            <tr>
                <th>จำนวน ID</th>
                <th>COST (รวม)</th>
                <th>PRICE (รวม)</th>
                <th>PROFIT</th>
            </tr>
            <tr>
                <td>${entries.length}</td>
                <td>${totalCost.toFixed(2)}</td>
                <td>${totalPrice.toFixed(2)}</td>
                <td>${profit.toFixed(2)}</td>
            </tr>
        </table>
    `;
}

init();
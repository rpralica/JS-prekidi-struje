'use strict';

const tBody = document.getElementById('tBody');
const btnRegija = document.getElementById('btnRegija');
const btnJedinica = document.getElementById('btnJedinica');
const btnObjekat = document.getElementById('btnObjekat');
const btnPodrucje = document.getElementById('btnPodrucje');
const table = document.getElementById('table');
const divButtons = document.getElementById('divButtons');
const selRegija = document.getElementById('selRegija');
const inpObjekat = document.getElementById('inpObjekat');
const inpPodrucje = document.getElementById('inpPodrucje');
const exportToExcel = document.getElementById('export');
const result = document.getElementById('result');
const substring = document.getElementById('substring');
const inpOd = document.getElementById('inpOd');
const inpDo = document.getElementById('inpDo');
//Dodavanje reda

//Kreiranje array textArea
const inpText = document.getElementById('inpText');
const outText = document.getElementById('outText');
const prebaci = document.getElementById('prebaci');

let textArray = [];
let objekatArray = [];
let podrucjeArray = [];

function lineText(val) {
  textArray = val.value.split('\n');
}

//**************************************************** */

//Regija

//Izvršna jedinica
const inpRegija = document.getElementById('inpRegija');

btnJedinica.addEventListener('click', function (e) {
  //e.preventDefault();
  dodaj();
});

function dodaj() {
  lineText(inpText);

  textArray.forEach((el, i) => {
    let tr = `
   <tr>
<td >${selRegija.value}</td>
<td >${el}</td>
<td>${inpObjekat.value.split('\n')[i]}</td>
<td>${inpPodrucje.value.split('\n')[i]}</td>
<td>${inpOd.value}</td>
<td>${inpDo.value}</td>
</tr>

`;

    table.insertAdjacentHTML('beforeend', tr);
  });
  inpText.value = '';
  inpObjekat.value = '';
  inpPodrucje.value = '';
  // inpOd.value=''
  // inpDo.value=''
  saveTableData();
}

function loadTableData() {
  table.innerHTML = `
  
  
  <tr>
      <th rowspan="2">Servisna Regija</th>
      <th rowspan="2">Izvršna jedinica/Opština </th>
      <th rowspan="2">Elektroenergetski objekat</th>
      <th rowspan="2">Područje bez napajanja</th>
      <th colspan="2" >Vrijeme beznaposnkog stanja </th>
     
  </tr>
  <tr>
      
    
      <th colspan="">Od </th>
      <th colspan="">Do	 </th>
     
  </tr>
 
`;

  const data = JSON.parse(localStorage.getItem('tableData')) ?? [];
  data.forEach(row => {
    const newRow = table.insertRow();
    const regijaCell = newRow.insertCell(0);
    const jedinicaCell = newRow.insertCell(1);
    const objekatCell = newRow.insertCell(2);
    const podrucjeCell = newRow.insertCell(3);
    const odCell = newRow.insertCell(4);
    const doCell = newRow.insertCell(5);

    regijaCell.textContent = row.regija;
    jedinicaCell.textContent = row.jedinica;
    objekatCell.textContent = row.objekat;
    podrucjeCell.textContent = row.podrucje;
    odCell.textContent = row.od;
    doCell.textContent = row.do;
  });
}

// Save table data to local storage
function saveTableData() {
  const rows = table.getElementsByTagName('tr');

  const data = [];
  for (let i = 1; i < rows.length - 1; i++) {
    // Start from 1 to skip header row
    const row = rows[i + 1];
    const cells = row.getElementsByTagName('td');

    data.push({
      regija: cells[0].textContent,
      jedinica: cells[1].textContent,
      objekat: cells[2].textContent,
      podrucje: cells[3].textContent,
      od: cells[4].textContent,
      do: cells[5].textContent,
    });
  }

  localStorage.setItem('tableData', JSON.stringify(data));
}
loadTableData();

const clersStorage = document.getElementById('clersStorage');

clersStorage.addEventListener('click', function (e) {
  e.preventDefault();
  localStorage.clear();
  loadTableData();
});

function ExportToExcel(type, fn, dl) {
  var wb = XLSX.utils.table_to_book(table, { sheet: 'sheet1' });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' })
    : XLSX.writeFile(wb, fn || 'Planska_Isključenja.' + (type || 'xlsx'));
}

exportToExcel.addEventListener('click', function (e) {
  e.preventDefault();
  ExportToExcel('xlsx');
});

substring.addEventListener('click', function (e) {
  e.preventDefault();
  lineText(inpText);
  result.innerHTML = textArray;
  inpText.value = '';
  inpText.focus();
  navigator.clipboard.writeText(textArray);
});



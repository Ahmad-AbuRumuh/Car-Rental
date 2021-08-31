'use strict';

let container = document.getElementById('container');
let tabelEl = document.createElement('table');
container.appendChild(tabelEl);

let details = [];

function Info(name, model) {
  this.name = name;
  this.model = model;
  details.push(this);
}

function createHeader() {
  let trEl = document.createElement('tr');
  tabelEl.appendChild(trEl);

  let thEl = document.createElement('th');
  trEl.appendChild(thEl);
  thEl.textContent = 'Order Image';

  let thEl2 = document.createElement('th');
  trEl.appendChild(thEl2);
  thEl2.textContent = 'Order Details';
}
createHeader();

Info.prototype.render = function() {
  let trEl = document.createElement('tr');
  tabelEl.appendChild(trEl);

  let tdEl = document.createElement('td');
  let model = document.createElement('img');
  model.setAttribute('style', 'width:80px', 'height:80px');
  model.setAttribute('src', this.model);
  tdEl.appendChild(model);
  trEl.appendChild(tdEl);

  let tdEl2 = document.createElement('td');
  trEl.appendChild(tdEl2);
  tdEl2.textContent = this.name;
};

let form = document.getElementById('form');
form.addEventListener('submit', addOrder);

function addOrder(event) {
  event.preventDefault();

  let name = event.target.name.value;
  let model = event.target.model.value;

  let newOrder = new Info(name, model);
  newOrder.render();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  let data = JSON.stringify(details);
  localStorage.setItem('key', data);
}

function readFromLocalStrorage() {
  let read = localStorage.getItem('key');
  let normalData = JSON.parse(read);

  if(normalData) {
    for (let i = 0; i < normalData.length; i++) {
      new Info(normalData[i].name, normalData[i].model);
      details[i].render();
    }
  }
}
readFromLocalStrorage();

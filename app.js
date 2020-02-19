let form = null;
let list = null;
let globalList = [];


window.onload = function () {
	init();

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		let isEdit = document.getElementById('editId').value;
		let name = document.getElementById('pSiteName').value;
		let url = document.getElementById('pSiteUrl').value;

		if (isEdit == '') {
			addItems(name, url);
			console.log('Added New Website : ' + name + ' ' + url);
			clearFields();
		} else {
			updateItem({
				"id": document.getElementById('editId').value,
				"name": name,
				"url": url
			});
			document.getElementById('editId').value = '';
		}
	});
}

function clearFields() {
	document.getElementById('pSiteName').value = '';
	document.getElementById('pSiteUrl').value = '';
	document.getElementById('pSiteName').focus();
}

function init() {
	if (localStorage.getItem('dbBookMarks') === null) {
		setLocalStorage();
		console.log('Local Storage not available');
	} else {
		console.log('Local Storage available');
	}

	globalList = JSON.parse(localStorage.getItem('dbBookMarks'));

	form = document.getElementById('formInput');
	list = document.getElementById('divListBookmarks');

	loadItems();
}

function updateItem(item) {
	let index = globalList.findIndex(x => x.id == item.id);
	globalList[index].name = item.name;
	globalList[index].url = item.url;

	setLocalStorage();
	console.log('Website Updated ' + item.name + ' ' + item.url);
	hideButtons();
	clearFields();
	loadItems();
}

function addItems(name, url) {
	globalList.push({
		'id': getLatestId(),
		'name': name,
		'url': url
	});

	setLocalStorage();
	console.log('New Website Added ' + name + ' ' + url);
	loadItems();
}

function loadItems() {
	clearItems();
	globalList.forEach((item) => {
		varLeft = document.createElement('div');
		varLeft.setAttribute('class', 'divLeftRight');
		varLeft.style.textAlign = 'right';
		varLeft.style.width = '40%';

		varRight = document.createElement('div');
		varRight.setAttribute('class', 'divLeftRight');
		varRight.style.textAlign = 'left';
		varRight.style.width = '60%';

		varDiv = document.createElement('div');
		varDiv.setAttribute('class', 'divList');
		varItemLabel = document.createElement('a');
		varItemLabel.setAttribute('class', 'aItemLink');
		varItemLabel.setAttribute('href', item.url);
		varItemLabel.setAttribute('target', '_blank');
		varItemLabel.innerHTML = item.name;

		varLeft.appendChild(varItemLabel);

		varEdit = document.createElement('button');
		varEdit.setAttribute('class', 'btnItem');
		varEdit.style.backgroundColor = '#82c8a0';
		varEdit.appendChild(document.createTextNode('Edit'));
		varEdit.setAttribute('value', item.id);
		varEdit.setAttribute('onclick', 'editItem(this.value);');

		varDelete = document.createElement('button');
		varDelete.appendChild(document.createTextNode('Delete'));
		varDelete.setAttribute('class', 'btnItem');
		varDelete.style.backgroundColor = '#fa5a5a';
		varDelete.setAttribute('value', item.id);
		varDelete.setAttribute('onclick', 'deleteItem(this.value);');

		varRight.appendChild(varEdit);
		varRight.appendChild(varDelete);

		varDiv.appendChild(varLeft);
		varDiv.appendChild(varRight);

		list.appendChild(varDiv);
	});
}

function clearItems() {
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
}

function clearStorage() {
	globalList = [];
	console.log(globalList);
	setLocalStorage();
	console.log('Items on Storage has been cleared');
	loadItems();
}

function deleteItem(id) {
	let i = 0;
	globalList.forEach( (e) => {
		if (e.id == id) {
			globalList.splice(i, 1);
		}
		i++;
	});

	setLocalStorage();
	loadItems();
}

function setLocalStorage() {
	localStorage.setItem('dbBookMarks', JSON.stringify(globalList));
}

function getLatestId() {
	if (globalList.length == 0) {
		return 0;
	} else {
		return globalList[globalList.length - 1].id + 1;
	}
}

function editItem(itemValue) {
	document.getElementById('btnSave').style.display = 'none';
	document.getElementById('btnEdit').style.display = 'block';
	document.getElementById('btnCancel').style.display = 'block';

	let index = globalList.findIndex(x => x.id == itemValue);

	document.getElementById('pSiteName').value = globalList[index].name;
	document.getElementById('pSiteUrl').value = globalList[index].url;
	document.getElementById('pSiteName').focus;
	document.getElementById('editId').value = globalList[index].id;
}

function performCancel() {
	hideButtons();
	document.getElementById('editId').value = '';
	clearFields();
}

function hideButtons() {
	document.getElementById('btnSave').style.display = 'block';
	document.getElementById('btnEdit').style.display = 'none';
	document.getElementById('btnCancel').style.display = 'none';
}
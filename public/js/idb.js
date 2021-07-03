//create database connection 
//create variable to hold db connection 
let db;
//establish connection to indexedDB called budget-trackerdb
const request =indexedDB.open('budget_trackerdb', 1);

// add object store 
request.onupgradeneeded = function(event){
    const db = event.target.result;
    db.createObjectStore('new_budget', {autoIncrement: true});
};

//upon success 
request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine) {

    }
};

request.onerror = function (event) {
    console.log(event.target.errorCode);
}

// function to be executed if we attempt to submit new transaction with no internet 
function saveRecord(record) {
    const transaction = db.transaction ([ 'new_budget'], 'readwrite');

    const budgetObjectStore = transaction.objectStore('new_budget');

    budgetObjectStore.add(record);
}

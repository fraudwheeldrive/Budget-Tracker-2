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

function uploadBudget() {
    // open a transaction on your db 
    const transaction = db.transaction(['new_budget'], 'readwrite');

    //access object store 
    const budgetObjectStore = transaction.objectStore('new_budget');
    
    // get all records from store and set variable 
    const getAll = budgetObjectStore.getAll();

    // upon a successful .getAll() run this function 
    if(getAll.result.length >0) {
        fetch('/api/transaction/bulk', {
            method: 'POST',
            body: JSON.stringify(getAll.result),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(serverResponse => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // open one more transaction
          const transaction = db.transaction(['new_budget'], 'readwrite');
          // access the new_pizza object store
          const pizzaObjectStore = transaction.objectStore('new_budget');
          // clear all items in your store
          pizzaObjectStore.clear();

          alert('All Budget updates have been submitted!');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };


  //listen to app coming back online 

  window.addEventListener('online', uploadBudget);

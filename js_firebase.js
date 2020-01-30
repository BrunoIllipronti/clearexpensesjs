// Bruno Illipronti - Web Development Project

// Connection var
var con;

function load(){

    // Load the existant data
    var showbutton = document.getElementById("showall");
    showbutton.addEventListener("click", function(){
                                                                    connectToDB();  // Connect to Firebase
                                                                    loadData();
                                                                });
    // Add a new registry
    var addbutton  = document.getElementById("addexpense");
    addbutton.addEventListener("click", addExpenses);

    // Clear the table
    var clearbutton  = document.getElementById("clear");
    clearbutton.addEventListener("click", function() {
                                                                    let table  = document.getElementById("my_table");
                                                                    table.innerHTML = "";
                                                                });
}

function connectToDB() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCxQgGA9EPtUuIOixjDnsxzA8INMWmN3XI",
        authDomain: "illiprontiexpenses.firebaseapp.com",
        databaseURL: "https://illiprontiexpenses.firebaseio.com",
        projectId: "illiprontiexpenses",
        storageBucket: "illiprontiexpenses.appspot.com",
        messagingSenderId: "152423106834"
    };

    try {
        firebase.initializeApp(config);
    } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
        if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error', err.stack)
        }
    }

    con = firebase.database().ref("illiprontiexpenses");
}


function loadData(){
    // Print the whole DB with all keys
    /*
    con.on("value", function (snapshot) {
        console.log(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    */

    let validator = 0;

    // Print the whole DB separating by row (key)
    con.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            var id = childData.id;
//////////////////////////////////////////////////////////////////////////////

                let table = document.getElementById("my_table");

                let tr = document.createElement("tr");
                let tr_head = document.createElement("tr");
                let td = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");

                let th = document.createElement("th");
                let th2 = document.createElement("th");
                let th3 = document.createElement("th");
                let th4 = document.createElement("th");


                table.appendChild(tr_head); // Append a TR to TABLE

                if (validator == 0) {
                    tr_head.appendChild(th);    // Append a TH to TR
                    th.innerHTML = "Name";
                    tr_head.appendChild(th2);    // Append a TH to TR
                    th2.innerHTML = "Expense";
                    tr_head.appendChild(th3);    // Append a TH to TR
                    th3.innerHTML = "Cost";
                    tr_head.appendChild(th4);    // Append a TH to TR
                    th4.innerHTML = "Category";
                    validator++;
                }

                table.appendChild(tr); // Append a TR to TABLE
                tr.appendChild(td);    // Append a TD to TR
                td.innerHTML = childData.name;
                tr.appendChild(td2);    // Append a TD to TR
                td2.innerHTML = childData.expense;
                tr.appendChild(td3);    // Append a TD to TR
                td3.innerHTML = childData.cost;
                tr.appendChild(td4);    // Append a TD to TR
                td4.innerHTML = childData.category;
            //}
//////////////////////////////////////////////////////////////////////////////
            //console.log(childData);
            //console.log(childData.id);
        });
    });

    validator = 0;
}

function addExpenses(){

    var MyExpenses = {
        idexpense: 100,
        expense,
        cost,
        category,
        name
    }

    MyExpenses.idexpense = 100;
    MyExpenses.expense = document.getElementById("expense").value;
    MyExpenses.cost = document.getElementById("cost").value;
    MyExpenses.category = document.getElementById("category").value;
    MyExpenses.name = "admin";

    con.push(MyExpenses);

    // Clean the table
    let table  = document.getElementById("my_table");
    table.innerHTML = "";

    // Reload the data with the new line
    loadData();
}

document.addEventListener("DOMContentLoaded", load);

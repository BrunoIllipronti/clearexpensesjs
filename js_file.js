// Bruno Illipronti - Web Development Project

function load(){
    // Login attempt
    var loginButton = document.getElementById("loginbtn");
    loginButton.addEventListener("click", validateUser);

    // Reset Button (Contacts)
    var resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", resetForm);

    // Send Information (Contacts)
    var resetButton = document.getElementById("sendinfo");
    resetButton.addEventListener("click", validate);
}

function validateUser(){
    let user = document.getElementById("login");
    let pw   = document.getElementById("pw");
    let usererror = document.getElementById("usererror");

    if( user.value.toUpperCase() == "ADMIN"){
        user.setAttribute("style", "border-color: black;");
        pw.setAttribute("style", "border-color: black;");
        usererror.setAttribute("style", "display: none;");
        window.open("workarea.html");

        connectToDB();  // Connect to Firebase
        loadData();     // Load the existant data

    } else {
        user.setAttribute("style", "border-color: red;");
        pw.setAttribute("style", "border-color: red;");
        usererror.setAttribute("style", "display: block;");
    }
}

/*
 * Hides all of the error elements.
 */
function hideErrors()
{
    array = ["usererror","name_error","phone_error","email_error"];

    //  Hiding "Required field" messages
    for(var i=0; i<array.length; i++)
    {
        document.getElementById(array[i]).style.display = 'none';
    }
}

/*
 * Reset Button (Contacts Page).
 */
function resetForm(e)
{
    if ( confirm('Clear Contacts Form?') )
    {
        // Ensure all error fields are hidden
        hideErrors();

        // When using onReset="resetForm()" in markup, returning true will allow the form to reset
        return true;
    }
    // Prevents the form from resetting
    e.preventDefault();

    // When using onReset="resetForm()" in markup, returning false would prevent the form from resetting
    return false;
}

/*
 *  Validate if there are null values (Contacts)
 */
function validate(e)
{
    // Confirm that the user wants to submit the form.
    if ( formHasErrors() )
    {
        e.preventDefault();
        return false;
    }

    // Prevents the form from resetting
    //e.preventDefault();
    alert("Sending Information...")
    return true;
}


/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors()
{
    var errorFlag = false; // error? true / no errors? false

//////////////////////////////////////////////////////////////////////

    var val_null_fields = ["name","phone","email"];

    // Validating if fields are Null
    for(var i=0; i<val_null_fields.length; i++){
        var textField = document.getElementById(val_null_fields[i]);

        // Validating if Name is Number....
        console.log(textField.id);
        if( textField.id == "name" ){
            if( !isNaN(textField.value || textField.value) ){
                console.log("Nome tem numero " + textField.value);
                document.getElementById("name_error").style.display = "block";
                errorFlag = true;
            } else {
                console.log("Nome nao tem numero");
                document.getElementById("name_error").style.display = "none";
            }
        } else if( !textField.value && textField.value != "name"){       // Validating if other fields are null
            document.getElementById(val_null_fields[i] + "_error").style.display = "block";
            errorFlag = true;
        } else{
            document.getElementById(val_null_fields[i] + "_error").style.display = "none";
        }
    }

    return errorFlag;
}

document.addEventListener("DOMContentLoaded", load);
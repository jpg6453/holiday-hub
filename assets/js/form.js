// Modal displayed after booking form is submitted

// Get form elements
let inputName = document.getElementById("name");
let inputPhone = document.getElementById("phone");
let inputEmail = document.getElementById("email");
let textArea = document.getElementById("textarea");
let btn = document.getElementById("formBtn");

// Get Modal elements
let modal = document.getElementById("bookingModal");

// Function to check that form fields have not been left blank
// If so, send button remains disabled
function checkForm(){
    if (inputName.value.trim() !== "" && inputPhone.value !== "" && inputEmail.value !=="" && textArea.value.trim() !== ""){
        btn.disabled = false;
    } else { 
        btn.disabled = true;
    }
}

function showModal() {
    modal.style.display = "block";
}

function formReset() {
   document.getElementById('contactForm').reset();
   checkForm();
  
}
window.onclick = function(event) {
  if (event.target == modal) {
    formReset();
  }
};


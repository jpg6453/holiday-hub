// Trigger onscroll functions

window.onscroll = function() {
  scrollToTop();
  hideSearchBar();
}


// When the user scrolls down 500px from the top of the document, show totop btn

function scrollToTop() {
    //scroll to top 
  const totop = document.getElementById("toTopBtn");
  if (document.body.scrollTop > 500|| document.documentElement.scrollTop > 500) {
    totop.style.display = "block";
  } else {
    totop.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//Hide search bar

function hideSearchBar() {
 //Get search bar
const searchBar = document.getElementById("search");
if (document.body.scrollTop >= 1900|| document.documentElement.scrollTop >= 1900) {
    searchBar.style.display = "none";
  } else {
    searchBar.style.display = "block";
  }
}

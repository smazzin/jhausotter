(function () {

  var navButton = document.getElementById("nav-menu-button"),
      navUl = document.getElementsByClassName("nav-ul");
      navHeader = document.getElementsByClassName("bg-none");

  function toggleMobileMenu() {
    navUl[0].style.transition = "max-height 0.5s";
    navUl[0].classList.toggle("hide-ul");
    //navHeader[0].classList.toggle("bg-white");
  }

  navButton.onclick = toggleMobileMenu;
}());

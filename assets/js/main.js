document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(
      "#nav-desktop img, #nav-desktop .brand-logo, #nav-mobile img"
    )
    .forEach(function (elm) {
      elm.addEventListener("click", function (event) {
        page = event.target.parentElement.getAttribute("href").substr(1);
        loadPage(page);
      });
    });

  var page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        var content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});

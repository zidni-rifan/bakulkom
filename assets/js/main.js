document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll("#nav-desktop img, .brand-logo, #nav-mobile img")
    .forEach((elm) => {
      elm.addEventListener("click", (event) => {
        page = event.target.parentElement.getAttribute("href").substr(1);
        loadPage(page);
      });
    });

  let page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const content = document.querySelector("#body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", `pages/${page}.html`, true);
    xhttp.send();
  }
});

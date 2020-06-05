/*
 * app_JavaScript :
 * Using pure JavaScript for exchanging data between the client and the server using AJAX request (GET + POST).
 */

$(document).ready(function () {
  /*
   * Retrieving data from the server
   */
  var btn_data = document.getElementById("btn_data");
  btn_data.addEventListener("click", function (event) {
    event.preventDefault();
    var choice = document.getElementById("source_choice");

    if (choice.options[choice.selectedIndex].text == "Fichier XML") {
      loadXmlData(choice.options[choice.selectedIndex].value);
    } else {
      loadJsonData(choice.options[choice.selectedIndex].value);
    }
  });

  /*
   * Retrieving data from the server -> XML data
   */
  function loadXmlData(link) {
    var spin_btn = document.getElementById("spin_btn_get");
    spin_btn.style.display = "inline";

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var xmlData = this.responseXML;
          xmlData = xmlData.getElementsByTagName("personne");
          document.getElementById("table_content").innerHTML = "";

          for (var i = 0; i < xmlData.length; i++) {
            document.getElementById("table_content").innerHTML += `<tr>
                            <td>${
                              xmlData[i].getElementsByTagName("nom")[0]
                                .childNodes[0].nodeValue
                            }</td>
                            <td>${
                              xmlData[i].getElementsByTagName("prenom")[0]
                                .childNodes[0].nodeValue
                            }</td>
                            <td>${
                              xmlData[i].getElementsByTagName("fonction")[0]
                                .childNodes[0].nodeValue
                            }</td>
                        </tr>`;
          }
        } else {
          // Quand une erreur se produit
          alert("Impossible de récupérer les données !");
        }

        spin_btn.style.display = "none";
      }
    };

    xhttp.open("GET", link, true);
    xhttp.send();
  }

  /*
   * Retrieving data from the server -> JSON data
   */
  function loadJsonData(link) {
    var spin_btn = document.getElementById("spin_btn_get");
    spin_btn.style.display = "inline";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var jsonData = JSON.parse(this.responseText);
          document.getElementById("table_content").innerHTML = "";

          for (var i = 0; i < jsonData.length; i++) {
            document.getElementById("table_content").innerHTML += `<tr>
                            <td>${jsonData[i].nom}</td>
                            <td>${jsonData[i].prenom}</td>
                            <td>${jsonData[i].fonction}</td>
                        </tr>`;
          }
        } else {
          alert("Impossible de récupérer les données !");
        }

        spin_btn.style.display = "none";
      }
    };
    xhttp.open("GET", link, true);
    xhttp.send();
  }

  /*
   * Sending data to the server -> JSON data
   */
  var form_data = document.getElementById("form_data");
  form_data.addEventListener("submit", function (event) {
    event.preventDefault();
    sendJsonData();
  });

  function sendJsonData() {
    var spin_btn = document.getElementById("spin_btn_post");
    spin_btn.style.display = "inline";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) {
          alert("Impossible de récupérer les données !");
        }

        spin_btn.style.display = "none";
      }
    };

    var dataForm = new FormData(form_data);

    var object = {};
    dataForm.forEach(function (value, key) {
      object[key] = value;
    });

    var dataJson = JSON.stringify(object);

    xhttp.open("POST", form_data.getAttribute("action"), true);
    xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhttp.send(dataJson);
  }
});
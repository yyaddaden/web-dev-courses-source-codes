/*
 * app_jQuery :
 * Using the jQuery framework for exchanging data between the client and the server using AJAX request (GET + POST).
 */

$(document).ready(function () {
  /*
   * Retrieving data from the server
   */
  var btn_data = $("#btn_data");
  btn_data.click(function (event) {
    event.preventDefault();
    var choice = $("#source_choice");

    if (choice.children("option:selected").text() == "Fichier XML") {
      loadXmlData(choice.children("option:selected").val());
    } else {
      loadJsonData(choice.children("option:selected").val());
    }
  });

  /*
   * Retrieving data from the server -> XML data
   */
  function loadXmlData(link) {
    var spin_btn = $("#spin_btn_get");
    spin_btn.show();

    var jxhttp = $.get(
      link,
      function (xmldata) {
        $("#table_content").html("");

        $(xmldata)
          .find("personne")
          .each(function () {
            $("#table_content").append(`<tr>
                            <td>${$(this).find("nom").text()}</td>
                            <td>${$(this).find("prenom").text()}</td>
                            <td>${$(this).find("fonction").text()}</td>
                        </tr>`);
          });
      },
      "xml"
    );

    jxhttp.fail(function () {
      alert("Impossible de récupérer les données !");
    });

    jxhttp.always(function () {
      spin_btn.hide();
    });
  }

  /*
   * Retrieving data from the server -> JSON data
   */
  function loadJsonData(link) {
    var spin_btn = $("#spin_btn_get");
    spin_btn.show();

    var jxhttp = $.get(
      link,
      function (jsonData) {
        $("#table_content").html("");

        for (var i = 0; i < jsonData.length; i++) {
          document.getElementById("table_content").innerHTML += `<tr>
                    <td>${jsonData[i].nom}</td>
                    <td>${jsonData[i].prenom}</td>
                    <td>${jsonData[i].fonction}</td>
                </tr>`;
        }
      },
      "json"
    );

    jxhttp.fail(function () {
      alert("Impossible de récupérer les données !");
    });

    jxhttp.always(function () {
      spin_btn.hide();
    });
  }

  /*
   * Sending data to the server -> JSON data
   */
  var form_data = $("#form_data");

  form_data.submit(function (event) {
    event.preventDefault();
    sendJsonData();
  });

  function sendJsonData() {
    var spin_btn = $("#spin_btn_post");
    spin_btn.show();

    var dataForm = new FormData(form_data[0]);

    var object = {};
    dataForm.forEach(function (value, key) {
      object[key] = value;
    });

    var dataJson = JSON.stringify(object);

    var jxhttp = $.post(form_data.attr("action"), dataJson);

    jxhttp.fail(function () {
      alert("Impossible de récupérer les données !");
    });

    jxhttp.always(function () {
      spin_btn.hide();
    });
  }
});

<%-- 
    Document   : app
    Created on : 2020-05-22, 00:35:54
    Author     : yacin
--%>

<jsp:include page="header.jsp">
    <jsp:param name="title" value="Accueil"/>
</jsp:include>

<div class="jumbotron jumbotron-fluid">
    <div class="container">
        
        <h1 class="display-4">Cours - <b>AJAX</b></h1>
        <p class="lead">
            Ceci est la page principale pour le cours d'<b>AJAX</b>.
        </p>
        
        <hr>
        
        <div style="max-width: 60%;">
            <form>
                <div class="row">
                    <div class="col">
                        <button id="btn_data" class="btn btn-primary" type="button">Charger les données</button>
                        <button id="spin_btn_get" class="btn btn-danger" type="button" disabled style="display: none;">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </button>
                    </div>
                    
                    <div class="col">
                        <select class="custom-select" id="source_choice">
                            <option selected value="${pageContext.request.contextPath}/Data/data.xml">Fichier XML</option>
                            <option selected value="${pageContext.request.contextPath}/Data/data.json">Fichier JSON</option>
                            <option value="${pageContext.request.contextPath}/json_data">Servlet</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
        
        <br>
        
        <table class="table table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Fonction</th>
                </tr>
            </thead>
            <tbody id="table_content">

            </tbody>     
        </table>

        <div>
            <form id="form_data" action="${pageContext.request.contextPath}/json_data" method="POST">
                <div class="row">
                    <div class="col">
                        <input class="form-control" type="text" required name="nom" placeholder="Nom">
                    </div>

                    <div class="col"> 
                        <input class="form-control" type="text" required name="prenom" placeholder="Prénom">
                    </div>

                    <div class="col">
                        <input class="form-control" type="text" required name="fonction" placeholder="Fonction">
                    </div>    
                    
                    <div class="col">
                        <button type="submit" class="btn btn-primary mb-2">Envoyer</button>
                        <button id="spin_btn_post" class="btn btn-danger" type="button" disabled style="display: none;">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </button>
                    </div>                    
                </div>
            </form>
        </div>
        
    </div>
</div>

<%@ include file="footer.jsp"%>

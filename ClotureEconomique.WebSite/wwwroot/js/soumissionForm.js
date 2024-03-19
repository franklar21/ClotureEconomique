$(document).ready(function () {

    //Afficher ou pas le formulaire de la clôture selon le choix du type de service
    $("#typeService").change(function () {
        var typeCloture = $(this).val();
        if (typeCloture === "cloture") {
            $(".sectionClotureForm").removeClass('d-none').addClass('d-inline');
        } else {
            $(".sectionClotureForm").addClass('d-none').removeClass('d-inline');
        }
    });

    //Afficher les champs selon le type de clôture sélectionné
    $("#typeCloture").change(function () {
        var typeCloture = $(this).val();
        switch (typeCloture) {

            case "mailles": //Clôture de mailles

                $("#divHauteurCloture").removeClass('d-none').addClass('d-inline'); //Hauteur
                $("#divCouleurCloture").removeClass('d-none').addClass('d-inline'); //Couleur
                $("#divLatteCloture").removeClass('d-none').addClass('d-inline'); //Lattes d'intimité
                $(".optionCouleurTaupe").removeClass('d-none').addClass('d-inline'); //Couleur : Taupe
                $(".optionCouleurTaupe").removeClass('d-none').addClass('d-inline'); //Couleur : Vert
                $(".optionCouleurTaupe").removeClass('d-none').addClass('d-inline'); //Couleur : Galvanisé

                break;

            case "ornemental": //Clôture ornemental

                $("#divHauteurCloture").removeClass('d-none').addClass('d-inline'); //Hauter
                $("#divCouleurCloture").addClass('d-none').removeClass('d-inline'); //Couleur
                $("#divLatteCloture").addClass('d-none').removeClass('d-inline'); //Lattes d'intimité

                break;

            case "composite": //Clôture en composite

                $("#divHauteurCloture").removeClass('d-none').addClass('d-inline'); //Hauteur
                $("#divCouleurCloture").removeClass('d-none').addClass('d-inline'); //Couleur
                $("#divLatteCloture").addClass('d-none').removeClass('d-inline'); //Lattes d'intimité
                $(".optionCouleurTaupe").addClass('d-none').removeClass('d-inline'); //Couleur : Taupe
                $(".optionCouleurTaupe").addClass('d-none').removeClass('d-inline'); //Couleur : Vert
                $(".optionCouleurTaupe").addClass('d-none').removeClass('d-inline'); //Couleur : Galvanisé

                break

            case "bois": //Clôture en bois

                $("#divHauteurCloture").removeClass('d-none').addClass('d-inline'); //Hauteur
                $("#divCouleurCloture").addClass('d-none').removeClass('d-inline'); //Couleur
                $("#divLatteCloture").addClass('d-none').removeClass('d-inline'); //Lattes d'intimité

                break;

            case "verre": //Clôture de verre

                $("#divHauteurCloture").addClass('d-none').removeClass('d-inline'); //Hauteur
                $("#divCouleurCloture").addClass('d-none').removeClass('d-inline'); //Couleur
                $("#divLatteCloture").addClass('d-none').removeClass('d-inline'); //Lattes d'intimité

                break;

            case "": //Sélectionnez

                $("#divHauteurCloture").removeClass('d-none').addClass('d-inline'); //Hauteur
                $("#divCouleurCloture").addClass('d-none').removeClass('d-inline'); //Couleur
                $("#divLatteCloture").addClass('d-none').removeClass('d-inline'); //Lattes d'intimité

                break;
        }
    });

    //Valider que le nombre de pieds est bel et bien un chiffre
    $("#nbPiedsCloture").on('change', function () {
        var inputValue = $(this).val();

        //Faire les actions seulement si l'input n'est pas vide
        if (inputValue !== null && $.trim(inputValue) !== '') {

            //Alerte si l'input contient des caractères autres que des chiffres
            if (!/^\d+$/.test(inputValue)) {

                alert("Vous devez seulement inscrire des chiffres.");
            }

            //Afficher le span d'avertissement si le nombre de pieds est de 25 pieds et moins
            if (parseInt(inputValue) < 25) {
                $(".msgLivraison").removeClass('d-none').addClass('d-inline');
            } else {
                $(".msgLivraison").addClass('d-none').removeClass('d-inline');
            }
        }
    });


    $("#envoyerForm").click(function () {

        var inputOk = validerChamps();

        if (inputOk) {
            alert('Formulaire ok');
        } else {
            sweetAlert({
                title: "Erreur",
                text: "Un ou plusieurs champs ne sont pas complétés ou sont incorrects",
                type: "error",
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: '#0039a6'
            });
        }

    });

    //Valider les champs du formulaire
    function validerChamps() {

        var inputOk = true;

        //Valider le nom
        var nomClient = $("#nomClient").val();
        if (!nomClient) {
            $("#msgNomClient").removeClass('d-none').addClass('d-inline');
            $("#msgNomClient").text("Vous devez inscrire votre nom.");
            $("#nomClient").focus();

            inputOk = false;
        }

        //Valider le courriel
        var emailClient = $("#emailClient").val();
        if (!emailClient) {
            $("#msgEmailClient").removeClass('d-none').addClass('d-inline');
            $("#msgEmailClient").text("Vous devez inscrire votre courriel.");
            $("#emailClient").focus();

            inputOk = false;
        }
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (emailClient && !testEmail.test(emailClient)) {
            $("#msgEmailClient").removeClass('d-none').addClass('d-inline');
            $("#msgEmailClient").text("Courriel invalide");
            $("#emailClient").focus();
        }
        //Valider le téléphone
        var telClient = $("#telClient").val();
        if (!telClient) {
            $("#msgTelClient").removeClass('d-none').addClass('d-inline');
            $("#msgTelClient").text("Vous devez inscrire votre numéro de téléphone.");
            $("#telClient").focus();

            inputOk = false;
        }
        if (telClient.trim()) {

            let phoneCleaned = parseInt(telClient.replace(/\D/g, '')).toString();
            if (phoneCleaned.length < 10) {

                $("#msgTelClient").removeClass('d-none').addClass('d-inline');
                $("#msgTelClient").text("Numéro de téléphone invalide. Il doit avoir un minimum de 10 chiffres");
                $("#telClient").focus();

                inputOk = false;
            }
        }
        //Valider l'adresse 
        var adresseClient = $("#adresseClient").val();
        if (!adresseClient) {
            $("#msgAdresseClient").removeClass('d-none').addClass('d-inline');
            $("#msgAdresseClient").text("Vous devez inscrire votre adresse.");
            $("#adresseClient").focus();

            inputOk = false;
        }
        //Valider la ville
        var villeClient = $("#villeClient").val();
        if (!villeClient) {
            $("#msgVilleClient").removeClass('d-none').addClass('d-inline');
            $("#msgVilleClient").text("Vous devez inscrire votre ville.");
            $("#villeClient").focus();

            inputOk = false;
        }
        //Valider le code postal
        var codePostalClient = $("#codePostalClient").val();
        if (!codePostalClient) {
            $("#msgCodePostalClient").removeClass('d-none').addClass('d-inline');
            $("#msgCodePostalClient").text("Vous devez inscrire votre code postal.");
            $("#codePostalClient").focus();

            inputOk = false;
        }
        //Valider le type de service
        var typeService = $("#typeService").val();
        if (!typeService) {
            $("#msgTypeService").removeClass('d-none').addClass('d-inline');
            $("#msgTypeService").text("Vous devez sélectionner le type de service.");
            $("#typeService").focus();

            inputOk = false;
        }
        //Valider que les champs sont complétés si le type de service sélectionné est le service de clôture
        if (typeService === "cloture") {

            //Valider le type de clôture
            var typeCloture = $("#typeCloture").val();
            if (!typeCloture) {
                $("#msgTypeCloture").removeClass('d-none').addClass('d-inline');
                $("#msgTypeCloture").text("Vous devez sélectionner le type de clôture.");
                $("#typeCloture").focus();

                inputOk = false;
            }



            //Afficher certaines alertes selon le type de clôture sélectionné
            switch (typeCloture) {
                case "mailles": //Clôture de mailles

                    break;

                case "ornemental": //Clôture ornemental

                    break;

                case "composite": //Clôture en composite

                    break

                case "bois": //Clôture en bois

                    break;

                case "verre": //Clôture de verre

                    break;
            }
        }

        return inputOk;
    }

    //Enlever msg erreur champ "Nom"
    $("#nomClient").change(function () {
        $("#msgNomClient").addClass('d-none').removeClass('d-inline');
    });
    //Enlever msg erreur champ "Courriel"
    $("#emailClient").change(function () {
        $("#msgEmailClient").addClass('d-none').removeClass('d-inline');
    });
    //Enlever msg erreur champ "Numéro de téléphone"
    $("#telClient").change(function () {
        $("#msgTelClient").addClass('d-none').removeClass('d-inline');
    });
    //Enlever msg erreur champ "Adresse"
    $("#adresseClient").change(function () {
        $("#msgAdresseClient").addClass('d-none').removeClass('d-inline');
    });
    //Enlever msg erreur champ "Ville"
    $("#villeClient").change(function () {
        $("#msgVilleClient").addClass('d-none').removeClass('d-inline');
    });
    //Enlever msg erreur champ "CodePostal"
    $("#codePostalClient").change(function () {
        $("#msgCodePostalClient").addClass('d-none').removeClass('d-inline');
    });
    //Enlever msg erreur champ "Type de service"
    $("#typeService").change(function () {
        $("#msgTypeService").addClass('d-none').removeClass('d-inline');
    });

    //Afficher les sweetalerts
    function sweetAlertInput(message, inputId) {
        inputOk = false;
        sweetAlert({
            title: "Erreur",
            text: "" + message + "",
            type: "error",
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonColor: '#0039a6'
        });
        $("#" + inputId + "").focus();
    };

});
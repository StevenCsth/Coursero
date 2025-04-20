// @charset "UTF-8";

document.getElementById("exerciseForm").addEventListener
(
    "submit", function(event)
    {
        event.preventDefault();

        const theme = document.getElementById("theme").value;
        const language = document.getElementById("language").value;
        const exercises = [...document.querySelectorAll("input[name='exercise']:checked")]
                    .map(e => e.value)
                    .join("_");

        let errorMessages = [];

        // V  rifier si un th  me est s  lectionn
        if (!theme) {
            errorMessages.push("Veuillez selectionner une thematique.");
        }

        // V  rifier si un langage est s  lectionn
        if (!language) {
            errorMessages.push("Veuillez selectionner un langage.");
        }

        // V  rifier si un exercice est s  lectionn
        if (!exercises) {
            errorMessages.push("Veuillez selectionner au moins un exercice.");
        }

        // Si des erreurs sont pr  sentes, afficher les messages
        if (errorMessages.length > 0) {
            document.getElementById("errorMessages").innerHTML = errorMessages.join("<br>");
        } else {
            // Si aucune erreur, rediriger vers la page
            window.location.href = `exos/${theme}_${exercises}_${language}.html`;
        }
    }
);
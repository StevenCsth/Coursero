<?php
// home.php
session_start(); // Démarrer la session

// Vérifier si l'utilisateur est authentifié (si l'ID est dans la session)
if (!isset($_SESSION['user_id'])) {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    header("Location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coursero | Accueil</title>
    <link rel="stylesheet" href="styles.css">
    <script src="js/verifChoix.js"></script>
</head>
<body>
    <div class="container">
        <h2>Bienvenue, <?php echo explode('@', $_SESSION['user_email'])[0]; ?> !</h2>
        
        <form id="exerciseForm">
            <label for="theme">Thématique :</label>
            <select id="theme" name="theme">
                <option value="" disabled selected>Choisir un thème</option>
                <option value="boucles">Les boucles</option>
                <option value="listes">Les listes</option>
                <option value="conditions">Les conditions</option>
            </select>
            <br>
            
            <p>Numéro de l'exercice :</p>
            <label for="exercise1"><input type="radio" id="exercise1" name="exercise" value="1"> 1</label>
            <label for="exercise2"><input type="radio" id="exercise2" name="exercise" value="2"> 2</label>
            <label for="exercise3"><input type="radio" id="exercise3" name="exercise" value="3"> 3</label>
            <br>
            
            <label for="language">Langage :</label>
            <select id="language" name="language">
                <option value="" disabled selected>Choisir un langage</option>
                <option value="python">Python</option>
                <option value="c">C</option>
            </select>
            <br>
            
            <button type="submit">Valider</button>
        </form>

        <div id="errorMessages" style="color: red;"></div>
    </div>
    
    <script src="js/verifChoix.js"></script>
</body>
</html>

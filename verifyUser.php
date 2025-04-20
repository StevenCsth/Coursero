<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();  // Démarrer la session

// Inclure le fichier de connexion à la base de données
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email']) && isset($_POST['password'])) {
        $email = htmlspecialchars($_POST['email']);
        $password = $_POST['password'];

        // Préparer la requête SQL pour éviter les injections SQL
        $query = "SELECT id, email, password FROM users WHERE email = $1";
        $result = pg_query_params($conn, $query, array($email));

        // Vérifier si la requête a échoué
        if ($result === false) {
            die("Erreur de requête SQL : " . pg_last_error());
        }

        // Récupérer l'utilisateur
        $user = pg_fetch_assoc($result);

        if ($user) {
            // Vérifier le mot de passe avec password_verify
            if (password_verify($password, $user['password'])) {
                // Connexion réussie, définir la session
                $_SESSION['user_id'] = $user['id'];  // Enregistrer l'ID de l'utilisateur
                $_SESSION['user_email'] = $user['email'];  // Enregistrer l'email

                // Débogage, vérifie que l'utilisateur est connecté avant la redirection
                echo "Utilisateur connecté, redirection vers home.php";

                // Rediriger vers la page d'accueil
                header("Location: home.php");
                exit();        
            } else {
                echo "Identifiants incorrects.";
            }
        } else {
            echo "Identifiants incorrects.";
        }
    } else {
        echo "Le formulaire est incomplet.";
    }
}
?>

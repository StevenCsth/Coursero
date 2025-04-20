<!-- index.php -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coursero | Connexion</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h2>Veuillez vous identifier</h2>
        <form action="verifyUser.php" method="POST">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" required
                pattern="^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" name="password" placeholder="Mot de passe" required>
            <button type="submit">Se connecter</button>            
        </form>
    </div>
</body>
</html>
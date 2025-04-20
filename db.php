<?php
// db.php

function loadEnv($path) {
    if (!file_exists($path)) {
        return false;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        putenv(trim("$name=$value"));
        $_ENV[trim($name)] = trim($value);
    }
    return true;
}

$envLoaded = loadEnv(__DIR__ . '/.env');

// Si .env chargé, on utilise ses valeurs
if ($envLoaded) {
    $config = [
        'host' => getenv('DB_HOST'),
        'port' => getenv('DB_PORT'),
        'dbname' => getenv('DB_NAME'),
        'user' => getenv('DB_USER'),
        'password' => getenv('DB_PASS')
    ];
} else {
    $config = [
        'host' => 'localhost',  
        'port' => '5432',      
        'dbname' => 'coursero', 
        'user' => 'postgres',   
        'password' => 'password'
    ];
}

// Connexion à PostgreSQL
$conn = pg_connect("host={$config['host']} port={$config['port']} dbname={$config['dbname']} user={$config['user']} password={$config['password']}");
if (!$conn) {
    die("Échec de la connexion à la base de données : " . pg_last_error());
} else {
    echo "Connexion à la base de données réussie. <br>";  // Affiche un message de succès si la connexion est réussie
}
?>

<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file'])) {
        if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['file']['tmp_name'];
            $fileName = $_FILES['file']['name'];
            $fileSize = $_FILES['file']['size'];
            $fileType = $_FILES['file']['type'];

            echo "Type de fichier : $fileType<br>";

            // Modification de la vérification des types de fichiers
            $allowedTypes = ['text/x-python', 'application/x-c', 'text/plain'];  // Ajout de 'text/plain' pour le cas où le fichier C est détecté comme tel

            // Vérifier si le type MIME est autorisé ou si l'extension est correcte
            $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
            if (!in_array($fileType, $allowedTypes) && $fileExt !== 'c') {
                die('Type de fichier non autorisé.<br>');
            }

            $uploadDir = 'uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
                echo "Répertoire 'uploads/' créé.<br>";
            }

            $destination = $uploadDir . basename($fileName);
            if (move_uploaded_file($fileTmpPath, $destination)) {
            } else {
                die('Erreur lors du téléchargement du fichier.<br>');
            }

            $exo_id = $_POST['exo_id'] ?? '';
            if (!$exo_id) {
                die('ID d\'exercice manquant.<br>');
            }

            // Traitement exo_id textuel
            if (!is_numeric($exo_id)) {
                if (preg_match('/([a-zA-Z]+)_(\d+)/', $exo_id, $matches)) {
                    $thematique = ucfirst(strtolower($matches[1]));
                    $numero = intval($matches[2]);
                    $langage = ($fileType === 'text/x-python') ? 'Python' : 'C';
                    $query = "SELECT id FROM exos WHERE thematique = $1 AND numero = $2 AND langage = $3";
                    $res = pg_query_params($conn, $query, [$thematique, $numero, $langage]);

                    if ($res && pg_num_rows($res) > 0) {
                        $row = pg_fetch_assoc($res);
                        $exo_id = $row['id'];
                    } else {
                        die("Exercice '$exo_id' introuvable.<br>");
                    }
                } else {
                    die("Format d'exercice invalide.<br>");
                }
            }

            // Récupération résultat attendu
            $query = "SELECT resultat FROM exos WHERE id = $1";
            $result = pg_query_params($conn, $query, [$exo_id]);

            if (!$result || pg_num_rows($result) === 0) {
                die("Exercice introuvable (id = $exo_id).<br>");
            }

            $exo = pg_fetch_assoc($result);
            $expected_output = trim($exo['resultat']);
            echo "Résultat attendu : $expected_output<br>";

            $output = '';
            $file_ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

            if ($file_ext === 'py') {
                $output = shell_exec("python3 $destination");
            } elseif ($file_ext === 'c') {
                $compiled_file = 'uploads/' . pathinfo($fileName, PATHINFO_FILENAME);
                $compile_output = shell_exec("gcc $destination -o $compiled_file 2>&1");  // capture les erreurs de compilation
                if ($compile_output) {
                    echo "Erreur de compilation :<br>" . $compile_output . "<br>";
                    die("Échec de la compilation.<br>");
                }
                $output = shell_exec($compiled_file);
            }

            echo "Sortie obtenue : " . trim($output) . "<br>";

            // Nettoyage pour les résultats numériques
            if (is_numeric($expected_output)) {
                // Suppression de tout caractère non numérique dans la sortie et le résultat attendu
                $output = preg_replace('/\D/', '', $output);
                $expected_output = preg_replace('/\D/', '', $expected_output);
            }

            // Comparaison des résultats
            if (trim($output) === $expected_output) {
                echo "<strong>✔ Code correct !</strong><br>";
                $note = 10;
            } else {
                echo "<strong>✖ Code incorrect.</strong><br>";
                $note = 0;
            }

            $user_id = 1;
            $query = "INSERT INTO notes (user_id, exo_id, note) VALUES ($1, $2, $3)";
            pg_query_params($conn, $query, [$user_id, $exo_id, $note]);

            echo "Note enregistrée : $note<br>";

        } else {
            echo 'Erreur de téléchargement : ' . $_FILES['file']['error'] . "<br>";
        }
    } else {
        echo 'Aucun fichier reçu.<br>';
    }
}
?>

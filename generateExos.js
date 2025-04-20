const fs = require('fs');
const themes = ['boucles', 'listes', 'conditions'];
const exercises = ['1', '2', '3'];
const languages = ['python', 'c'];

// Contenu des énoncés pour chaque exercice
const exerciseStatements = {
    boucles: {
        '1': {
            enonce: `
                <p>Exercice 1 : Créez une fonction <strong>sumNumbers</strong> qui prend en paramètre un tableau de nombres et renvoie leur somme.</p>
                <ul>
                    <li>Fonction à implémenter : <strong>sumNumbers(arr)</strong></li>
                    <li>Paramètre : <strong>arr</strong> (tableau de nombres)</li>
                    <li>Retour : un nombre représentant la somme des éléments du tableau.</li>
                </ul>
                <p>Exemple d'entrée : [1, 2, 3]</p>
                <p>Exemple de sortie : 6</p>
                <p><strong>Tableau de nombre à utiliser pour l'exercice : [3,2,5]</strong></p>
            `
        },
        '2': {
            enonce: `
                <p>Exercice 2 : Créez une fonction <strong>findEvenNumbers</strong> qui prend en paramètre un tableau de nombres et renvoie un tableau avec uniquement les nombres pairs.</p>
                <ul>
                    <li>Fonction à implémenter : <strong>findEvenNumbers(arr)</strong></li>
                    <li>Paramètre : <strong>arr</strong> (tableau de nombres)</li>
                    <li>Retour : un tableau de nombres pairs.</li>
                </ul>
                <p>Exemple d'entrée : [1, 2, 3, 4]</p>
                <p>Exemple de sortie : [2, 4]</p>
                <p><strong>Tableau de nombre à utiliser pour l'exercice : [3,2,5]</strong></p>
            `
        },
        '3': {
            enonce: `
                <p>Exercice 3 : Créez une fonction <strong>countDown</strong> qui prend en paramètre un nombre et affiche un compte à rebours jusqu'à zéro.</p>
                <ul>
                    <li>Fonction à implémenter : <strong>countDown(n)</strong></li>
                    <li>Paramètre : <strong>n</strong> (un entier positif)</li>
                    <li>Retour : aucune valeur retournée, mais un message de type "n", "n-1", ..., "0" doit être affiché à chaque itération.</li>
                </ul>
                <p>Exemple d'entrée : 5</p>
                <p>Exemple de sortie : 5, 4, 3, 2, 1, 0</p>
                <p><strong>Valeur à utiliser pour l'exercice : 8</strong></p>
            `
        }
    },
    listes: {
        '1': {
            enonce: `
                <p>Exercice 1 : Créez une fonction <strong>reverseList</strong> qui prend en paramètre une liste et renvoie une nouvelle liste avec les éléments dans l'ordre inverse.</p>
                <ul>
                    <li>Fonction à implémenter : <strong>reverseList(lst)</strong></li>
                    <li>Paramètre : <strong>lst</strong> (une liste de nombres ou de chaînes)</li>
                    <li>Retour : une nouvelle liste avec les éléments inversés.</li>
                </ul>
                <p>Exemple d'entrée : [1, 2, 3]</p>
                <p>Exemple de sortie : [3, 2, 1]</p>
                <p><strong>Liste de nombre à utiliser pour l'exercice : [3,2,5]</strong></p>
            `
        },
        '2': {
            enonce: `
                <p>Exercice 2 : Créez une fonction <strong>sumList</strong> qui prend en paramètre une liste de nombres et renvoie la somme de tous les éléments.</p>
                <ul>
                    <li>Fonction à implémenter : <strong>sumList(lst)</strong></li>
                    <li>Paramètre : <strong>lst</strong> (une liste de nombres)</li>
                    <li>Retour : un nombre représentant la somme des éléments de la liste.</li>
                </ul>
                <p>Exemple d'entrée : [1, 2, 3]</p>
                <p>Exemple de sortie : 6</p>
                <p><strong>Liste de nombre à utiliser pour l'exercice : [3,2,5]</strong></p>
            `
        },
        '3': {
            enonce: `
                <p>Exercice 3 : Créez une fonction <strong>filterEvenNumbers</strong> qui prend en paramètre une liste de nombres et renvoie une liste avec uniquement les nombres pairs.</p>
                <ul>
                    <li>Fonction à implémenter : <strong>filterEvenNumbers(lst)</strong></li>
                    <li>Paramètre : <strong>lst</strong> (une liste de nombres)</li>
                    <li>Retour : une liste de nombres pairs.</li>
                </ul>
                <p>Exemple d'entrée : [1, 2, 3, 4]</p>
                <p>Exemple de sortie : [2, 4]</p>
                <p><strong>Liste de nombre à utiliser pour l'exercice : [3,2,5]</strong></p>
            `
        }
    },
    conditions: {
        '1': {
            enonce: `
                <p>Exercice 1 : Créez une fonction <strong>isPositive</strong> qui prend en paramètre un nombre et renvoie "positif" si le nombre est positif, "négatif" si le nombre est négatif, et "zéro" si c'est zéro.</p>
                <ul>
                    <li>Fonction à implémenter : <strong>isPositive(n)</strong></li>
                    <li>Paramètre : <strong>n</strong> (un entier)</li>
                    <li>Retour : une chaîne de caractères ("positif", "négatif", "zéro").</li>
                </ul>
                <p>Exemple d'entrée : -5</p>
                <p>Exemple de sortie : "négatif"</p>
                <p><strong>Valeur à utiliser pour l'exercice : -14</strong></p>
            `
        },
        '2': {
            enonce: `
                <p>Exercice 2 : Créez une fonction <strong>isEven</strong> qui prend en paramètre un nombre et renvoie "pair" si le nombre est pair et "impair" si le nombre est impair.</p>
                <ul>
                    <li>Fonction à implémenter : <strong>isEven(n)</strong></li>
                    <li>Paramètre : <strong>n</strong> (un entier)</li>
                    <li>Retour : une chaîne de caractères ("pair", "impair").</li>
                </ul>
                <p>Exemple d'entrée : 4</p>
                <p>Exemple de sortie : "pair"</p>
                <p><strong>Valeur à utiliser pour l'exercice : 3</strong></p>
            `
        },
        '3': {
            enonce: `
                <p>Exercice 3 : Créez une fonction <strong>isPrime</strong> qui prend en paramètre un nombre et renvoie "premier" si le nombre est premier et "non premier" sinon.</p>
                <ul>
                    <li>Fonction à implémenter : <strong>isPrime(n)</strong></li>
                    <li>Paramètre : <strong>n</strong> (un entier)</li>
                    <li>Retour : une chaîne de caractères ("premier", "non premier").</li>
                </ul>
                <p>Exemple d'entrée : 7</p>
                <p>Exemple de sortie : "premier"</p>
                <p><strong>Valeur à utiliser pour l'exercice : 45</strong></p>
            `
        }
    }
};

// Créer un dossier "exos" s'il n'existe pas
const exosDir = './exos';
if (!fs.existsSync(exosDir)){
    fs.mkdirSync(exosDir);
}

// Fonction pour générer le contenu HTML
const generateHTML = (theme, exercise, language) => {
    const statement = exerciseStatements[theme][exercise].enonce;
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coursero | ${theme.charAt(0).toUpperCase() + theme.slice(1)} - Exercice ${exercise} - ${language}</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <div class="container">
        <h2 class="exo-header">${theme.charAt(0).toUpperCase() + theme.slice(1)} - Exercice ${exercise}</h2>
        <p class="exo-description">Langage : ${language}</p>
        <h3>Énoncé de l'exercice :</h3>
        <div class="exo-statement">${statement}</div>
        <form action="../submit-exercise.php" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="exo_id" value="${theme}_${exercise}">
            <label for="codeInput">Sélectionnez un fichier :</label>
            <br><br>
            <input type="file" name="file" id="fileInput" accept=".py, .c" required>
            <button type="submit">Soumettre</button>
        </form>
    </div>
</body>
</html>
    `;
};

// Générer les pages pour chaque exercice
themes.forEach(theme => {
    exercises.forEach(exercise => {
        languages.forEach(language => {
            const fileName = `exos/${theme}_${exercise}_${language}.html`; 
            const htmlContent = generateHTML(theme, exercise, language);
            fs.writeFileSync(fileName, htmlContent, 'utf8');
        });
    });
});

console.log("Les pages des exercices ont été générées avec succès !");
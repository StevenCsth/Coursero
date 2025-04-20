def countDown(n):
    for i in range(n, -1, -1):  # Commence à n et finit à 0
        print(i, end=", " if i > 0 else "")  # Affiche chaque nombre suivi d'une virgule, sauf le dernier

# Exemple d'utilisation de la fonction
countDown(8)

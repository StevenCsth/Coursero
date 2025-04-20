# Fichier à mettre dans la VM script pour qu'elle se connecte à la base de données 
import psycopg2

# Connexion à la base de données PostgreSQL
try:
    conn = psycopg2.connect(
        host="192.168.1.210",  # Adresse IP de srv-db-1
        dbname="coursero",
        user="postgres",  # Utilisateur PostgreSQL
        password="yourpassword"  # Remplace par le mot de passe approprié
    )
    print("Connexion à la base de données réussie")
    
    # Crée un curseur pour exécuter des requêtes
    cursor = conn.cursor()
    
    # Exemple de requête
    cursor.execute("SELECT * FROM users;")
    rows = cursor.fetchall()
    for row in rows:
        print(row)
    
    cursor.close()
    conn.close()

except Exception as e:
    print(f"Erreur de connexion à la base de données : {e}")

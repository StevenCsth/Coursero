import sys
import subprocess
import psycopg2
import os

if len(sys.argv) != 4:
    print("Usage: python3 verifier_exo.py <fichier> <exo_id> <user_id>")
    sys.exit(1)

fichier = sys.argv[1]
exo_id = sys.argv[2]
user_id = sys.argv[3]

try:
    conn = psycopg2.connect(
        host="192.168.1.210",
        dbname="coursero",
        user="postgres"
    )
    cur = conn.cursor()

    # Récupération du résultat attendu
    cur.execute("SELECT resultat FROM exos WHERE id = %s", (exo_id,))
    row = cur.fetchone()

    if not row:
        print("Exercice introuvable.")
        sys.exit(1)

    resultat_attendu = row[0].strip()

except Exception as e:
    print(f"Erreur DB : {e}")
    sys.exit(1)

# Exécution du fichier
try:
    extension = os.path.splitext(fichier)[1]
    if extension == ".py":
        result = subprocess.run(["python3", fichier], capture_output=True, text=True, timeout=5)
    elif extension == ".c":
        executable = fichier.replace(".c", "")
        compile = subprocess.run(["gcc", fichier, "-o", executable])
        if compile.returncode != 0:
            print("Erreur compilation C.")
            sys.exit(1)
        result = subprocess.run([f"./{executable}"], capture_output=True, text=True, timeout=5)
    else:
        print("Extension non supportée.")
        sys.exit(1)

    sortie = result.stdout.strip()
    bonne_reponse = int(sortie == resultat_attendu)

    # Affichage
    if bonne_reponse:
        print("Bonne réponse !")
    else:
        print("Mauvaise réponse.")
        print(f"Sortie : {sortie}")
        print(f"Attendu : {resultat_attendu}")

    # Enregistrement de la note
    cur.execute(
        "INSERT INTO notes (user_id, exo_id, note) VALUES (%s, %s, %s)",
        (user_id, exo_id, bonne_reponse)
    )
    conn.commit()

except subprocess.TimeoutExpired:
    print("Temps d'exécution dépassé.")
except Exception as e:
    print(f"Erreur exécution : {e}")
finally:
    cur.close()
    conn.close()
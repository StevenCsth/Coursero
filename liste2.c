#include <stdio.h>

// Fonction pour calculer la somme des éléments de la liste
int sumList(int lst[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += lst[i];
    }
    return sum;
}

int main() {
    // Liste de nombres à utiliser pour l'exercice
    int lst[] = {7, 2, 5};
    int size = sizeof(lst) / sizeof(lst[0]); // Calcul de la taille de la liste

    // Appel de la fonction sumList et affichage du résultat
    int result = sumList(lst, size);
    printf("%d\n", result);

    return 0;
}

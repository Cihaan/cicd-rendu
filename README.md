README - CI/CD Pipeline

Ce dépôt contient plusieurs fichiers de configuration pour les pipelines CI/CD permettant d'assurer l'intégration et le déploiement continus des différentes branches et versions du projet.

*1* Présentation des fichiers CI/CD

**dev.yml**

Objectif : Déploiement en environnement de développement.

Déclenché à chaque push sur develop.

Exécute les tests (setup-and-test).

Si les tests réussissent, une image Docker est construite et poussée sur Docker Hub avec les tags :

unstable

dev-${{ github.sha }}

**feature.yml**

Objectif : Vérification des branches de fonctionnalités.

Déclenché pour chaque pull request vers develop.

Exécute les tests.

Vérifie la construction de l’image Docker (sans la pousser).

**prod.yml**

Objectif : Déploiement en production.

Déclenché sur les tags au format v* (ex: v1.0.0).

Exécute les tests.

Si les tests réussissent, une image Docker est construite et poussée sur Docker Hub avec les tags :

Version (x.y.z)

Dernière version majeure (x.y)

stable (si sur la branche par défaut)

*2* Cycle de vie du déploiement/livraison

**Pour develop :**

Les tests sont exécutés.

Si les tests réussissent, l’image Docker est poussée vers Docker Hub avec le tag unstable.

Pour les branches de fonctionnalités :

Les tests sont exécutés.

Une image Docker est construite pour validation, mais non poussée.

**Pour production :**

Les tests sont exécutés.

Si les tests réussissent, l’image Docker est poussée vers Docker Hub avec des tags correspondant à la version.

-> Remarque

Chaque étape est conditionnée par la réussite de la précédente grâce au paramètre needs: [], garantissant qu’un échec bloque la suite du pipeline.


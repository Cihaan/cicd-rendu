README - CI/CD Pipeline



Ce dépôt contient plusieurs fichiers de configuration pour les pipelines CI/CD permettant d'assurer l'intégration et le déploiement continus des différentes branches et versions du projet.

**1 Présentation des fichiers CI/CD**

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

**2 Présentation des fichiers Docker**

docker.dev

Objectif : Fournir un environnement de développement pour l'application.

Basé sur node:23-alpine.

Utilise pnpm pour la gestion des dépendances.

Installe toutes les dépendances, y compris celles de développement.

Expose le port 3000 pour le serveur de développement.

Démarre le serveur en mode développement avec pnpm dev.

docker.prod

Objectif : Construire une image optimisée pour la production.

Utilise un processus en deux étapes :

Build stage :

Basé sur node:23-alpine.

Installe les dépendances et compile l'application.

Production stage :

Basé sur node:18-alpine pour une image plus légère.

Installe uniquement les dépendances de production.

Copie les fichiers compilés depuis l'étape de build.

Expose le port 3000.

Lance l'application avec node .output/server/index.mjs.

**3 Cycle de vie du déploiement/livraison**

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


**TEAM**:
Cihan KAFADAR
Paul NIGGLI

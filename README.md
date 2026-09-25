# To-Do-List-en-HTML-CSS-et-JavaScript

> **Nom du projet :** `To-Do-List-en-HTML-CSS-et-JavaScript`

## Description

Une application de liste de tâches (to-do list) simple et rapide : on ajoute ses tâches du quotidien, on les coche quand elles sont faites, on les supprime quand elles n'ont plus de raison d'être. Tout est sauvegardé automatiquement dans le navigateur : en rouvrant la page, la liste est toujours là — sans compte, sans serveur.

L'interface suit l'esprit du projet (HTML, CSS et JavaScript côté navigateur) : un écran unique, une saisie, une liste, des filtres. Elle est réalisée ici avec React sur le socle TanStack Start, qui fournit le rendu et la structure du projet.

## Fonctionnalités

- **Ajouter une tâche** : via le champ de saisie et le bouton « Ajouter », ou avec la touche Entrée.
- **Marquer une tâche comme terminée** : un clic sur la case (rond) bascule entre « à faire » et « terminée » (texte barré).
- **Supprimer une tâche** : bouton de suppression visible au survol de chaque tâche.
- **Filtrer la liste** : trois filtres — *Toutes*, *À faire*, *Terminées*.
- **Effacer les tâches terminées** : bouton en bas de liste, avec compteur.
- **Compteur de tâches restantes** affiché en permanence.
- **Sauvegarde automatique** dans le navigateur (localStorage) : la liste survit au rechargement de la page.
- **État vide** accompagné : message d'accueil tant qu'aucune tâche n'existe.
- **Accessibilité** : libellés explicites sur chaque bouton, navigation au clavier.
- **Responsive** : utilisable aussi bien sur mobile que sur ordinateur.

## Utilisation

### Prérequis

- [Bun](https://bun.sh/) installé sur la machine
- Git pour cloner le dépôt

### Installation

```bash
git clone <url-du-depot>
cd <nom-du-dossier>
bun install
```

### Lancer le projet

```bash
bun run dev
```

L'application est ensuite disponible à l'adresse indiquée dans le terminal.

### Utiliser la liste de tâches

1. Tapez une tâche dans le champ « Ajouter une tâche… » et validez (bouton ou touche Entrée).
2. Cliquez sur le rond à gauche d'une tâche pour la marquer comme terminée (ou pour la remettre « à faire »).
3. Survolez une tâche et cliquez sur la croix pour la supprimer.
4. Utilisez les filtres *Toutes / À faire / Terminées* pour vous concentrer sur l'essentiel.
5. Cliquez sur « Effacer les terminées » pour purger la liste d'un coup.

### Commandes disponibles

| Commande | Description |
| --- | --- |
| `bun run dev` | Démarre le serveur de développement |
| `bun run build` | Génère la version de production |
| `bun run build:dev` | Génère une version avec la configuration de développement |
| `bun run preview` | Prévisualise localement la version générée |
| `bun run lint` | Analyse la qualité du code |
| `bun run format` | Formate les fichiers avec Prettier |

### Organisation principale

```text
src/
├── routes/        # Pages (l'écran de la liste de tâches : routes/index.tsx)
├── components/    # Composants d'interface réutilisables
├── hooks/         # Hooks React partagés
├── lib/           # Fonctions utilitaires
├── router.tsx     # Configuration du routeur
├── start.ts       # Initialisation de l'application
└── styles.css     # Thème et styles globaux
public/            # Fichiers publics statiques
```

## Technologies utilisées

| Technologie | Rôle |
| --- | --- |
| [TanStack Start](https://tanstack.com/start) | Framework applicatif full-stack (rendu, serveur) |
| [TanStack Router](https://tanstack.com/router) | Routage et navigation |
| [React](https://react.dev) 19 | Bibliothèque d'interface utilisateur |
| [TypeScript](https://www.typescriptlang.org) | Typage statique du code |
| [Tailwind CSS](https://tailwindcss.com) 4 | Styles utilitaires et thème global |
| [Vite](https://vite.dev) | Outil de build et serveur de développement |
| [Radix UI](https://www.radix-ui.com) | Composants d'interface accessibles |
| [Lucide React](https://lucide.dev) | Icônes |
| [Zod](https://zod.dev) | Validation de données |
| [React Hook Form](https://react-hook-form.com) | Gestion des formulaires |
| [Bun](https://bun.sh/) | Exécution et gestion des dépendances |

Les fonctionnalités de la liste de tâches sont écrites en HTML, CSS et JavaScript côté navigateur (état de la liste, filtres, sauvegarde localStorage), sans base de données ni serveur dédié.

## Spécification

La courte spécification du projet se trouve dans [`PROJECT_SPEC.md`](./PROJECT_SPEC.md).

## Développement avec Lovable

Le projet peut être modifié dans [Lovable](https://lovable.dev) ou dans un environnement local. Les changements synchronisés avec GitHub restent dans le dépôt du projet.

## Licence

Aucune licence de distribution n'est définie à ce stade.

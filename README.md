# Application de démonstration — Déploiement & CI/CD

Petite application volontairement imparfaite utilisée comme support pédagogique.

Elle contient :

- un frontend Angular ;
- un backend Node.js / Express ;
- un faux système de connexion ;
- une "base de données" sous forme de fichier JSON ;
- une route `/api/info` reposant sur une fonction métier ;
- un test unitaire de cette fonction.

> Cette application est destinée à un exercice de formation. Elle n'est pas conçue pour être sécurisée ni utilisée en production.

## Prérequis

- Node.js 22 ou 24 recommandé
- npm

## Démarrer le backend

```bash
cd backend
npm install
npm install cors dotenv

```
Créer le .env du backend :
```
PORT=3000
CORS_ORIGINS=http://localhost:4200
```
Configurer CORS dans le serveur "server.js" : 
Ajouter :
```javascript
require('dotenv').config();
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);
```
Remplacer : 
```javascript
app.use(cors({})
```
Par :
```javascript
app.use(cors({
  origin: (origin, callback) => {
    // Accepte les requêtes sans origine (curl, Postman, appels serveur à serveur)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`Origine non autorisée par CORS : ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```
et enfin dans le terminal:

```bash
npm start
```

Le backend écoute sur : `http://localhost:3000`

Pour lancer les tests :

```bash
npm test
```

## Démarrer le frontend

Dans un second terminal :

```bash
cd frontend
npm install
ng add @ngx-env/builder

```
Créer le .env à la racine du projet Angular avec :

```
# .env : utilisé en local
NG_APP_API_URL=http://localhost:3000/api
```

Ajouter le .env au .gitignore :
```
.env
.env.local
```

Déclarer la variable dans src/env.d.ts dans la fonction declare interface Env :
```typescript
readonly NG_APP_API_URL: string; 
```
Modifier api.service.ts :
```typescript
private readonly apiUrl = import.meta.env.NG_APP_API_URL;
```
et enfin dans le terminal:
```bash
npm start
```
Ouvrir ensuite : `http://localhost:4200`

## Comptes de démonstration

- `alice` / `password`
- `bob` / `1234`
- `admin` / `admin`

# Guide d'Intégration Strapi pour Rafa School 🚀

Ce projet est configuré avec un serveur d'arrière-plan (Backend) Node/Express complet qui sert d'adaptateur et de proxy sécurisé pour **Strapi CMS**. Vous pouvez désormais gérer l'ensemble des cours, des témoignages et recevoir les inscriptions directement dans votre panneau d'administration Strapi !

---

## 🛠️ 1. Configuration des Variables d'Environnement

Dans les paramètres de votre projet ou dans votre fichier `.env`, configurez les clés suivantes :

```env
# URL de votre serveur Strapi (ex: https://mon-strapi.herokuapp.com ou http://localhost:1337)
STRAPI_API_URL="http://votre-url-strapi.com"

# Jeton d'API de Strapi (Strapi API Token avec permissions de lecture sur "courses", "testimonials" et d'écriture sur "registrations")
STRAPI_API_TOKEN="votre_token_api_strapi_ici"
```

*Remarque : Si ces variables ne sont pas configurées, le site fonctionnera automatiquement et de manière fluide avec les données locales d'origine (`src/data.ts`). Aucun plantage au démarrage !*

---

## 📂 2. Schémas recommandés dans Strapi (Content Types)

Créez les types de collection suivants dans votre Strapi Content-Type Builder :

### 1️⃣ Collection : `Course` (ID de l'API : `course`)
* **Champs principaux :**
  * `slug` (Text / UID, ex: `couture-et-modelisme`) - *Sert d'identifiant unique*
  * `titleAr` (Text)
  * `titleFr` (Text)
  * `descriptionAr` (Text - Long text)
  * `descriptionFr` (Text - Long text)
  * `category` (Text, valeurs recommandées : `crafts`, `tech`, `hse`)
  * `durationAr` (Text)
  * `durationFr` (Text)
  * `price` (Number)
  * `currencyAr` (Text, ex: `دج`)
  * `currencyFr` (Text, ex: `DA`)
  * `instructorId` (Text, ex: `rachid`)
  * `lecturesCount` (Number)
  * `levelAr` (Text)
  * `levelFr` (Text)
  * `accentColor` (Text, ex: `#8b5cf6`)
  * `detailsAr` (Text - Long text / Rich text)
  * `detailsFr` (Text - Long text / Rich text)
  * `image` (Media ou Text URL)
  * `bannerImage` (Media ou Text URL)
* **Champs Complexes (Optionnel, ou gérés via JSON / Composants) :**
  * `lessons` (Composant répétable ou attribut JSON contenant un tableau d'objets avec : `titleAr`, `titleFr`, `durationAr`, `durationFr`)
  * `tagsAr` (JSON ou chaîne de caractères, ex : `["خياطة", "تفصيلوباترون"]`)
  * `tagsFr` (JSON ou chaîne de caractères, ex : `["Couture", "Patronage"]`)

### 2️⃣ Collection : `Testimonial` (ID de l'API : `testimonial`)
* **Champs principaux :**
  * `authorAr` (Text)
  * `authorFr` (Text)
  * `roleAr` (Text)
  * `roleFr` (Text)
  * `rating` (Number, ex: `5`)
  * `contentAr` (Text - Long text)
  * `contentFr` (Text - Long text)
  * `avatar` (Media ou Text URL)

### 3️⃣ Collection : `Registration` (ID de l'API : `registration`)
* **Champs principaux (Pour enregistrer les inscriptions) :**
  * `fullName` (Text)
  * `email` (Text / Email)
  * `phone` (Text)
  * `courseId` (Text)
  * `experienceLevel` (Text)
  * `preferredSchedule` (Text)

---

## 🔑 3. Autorisations de l'API Strapi (Roles & Permissions)

Dans votre panneau d'administration Strapi :
1. Allez dans **Settings** > **Users & Permissions Plugin** > **Roles**.
2. Sélectionnez **Public**.
3. Cochez les cases suivantes :
   * `course` ➔ `find` et `findOne`
   * `testimonial` ➔ `find` et `findOne`
   * `registration` ➔ `create` (pour autoriser la soumission du formulaire d'inscription)
4. Cliquez sur **Save**.

---

## 🔄 Comment ça fonctionne dans le code ?
1. Le client web effectue des requêtes à `/api/courses`, `/api/testimonials` et `/api/register`.
2. Le serveur Express intercepte ces requêtes.
3. Si `STRAPI_API_URL` est défini, le serveur interroge de manière sécurisée votre instance Strapi en utilisant le jeton d'authentification `STRAPI_API_TOKEN` (ce jeton reste masqué pour le navigateur web, assurant une sécurité absolue).
4. Le serveur formate les réponses de Strapi pour correspondre aux interfaces TypeScript de l'application et les renvoie au client.
5. En cas de panne de Strapi ou de mauvaise configuration, le serveur bascule automatiquement sur les données locales statiques pour assurer la continuité du service !

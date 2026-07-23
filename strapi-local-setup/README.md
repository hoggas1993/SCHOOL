# 🚀 Guide d'Installation de Strapi Local & Déploiement VPS

Ce dossier contient tout le nécessaire pour lancer votre instance **Strapi CMS** en local sur votre machine, importer automatiquement la structure de données de **Rafa School**, puis déployer le tout en production sur votre **VPS**.

---

## 💻 Étape 1 : Initialisation de Strapi en Local

Sur votre ordinateur de bureau (pas sur le serveur de prévisualisation), ouvrez un terminal et exécutez la commande suivante pour créer un nouveau projet Strapi :

```bash
npx create-strapi-app@latest mon-strapi-backend --quickstart
```
*(L'option `--quickstart` configure automatiquement Strapi avec une base de données locale **SQLite** hyper légère).*

Une fois l'installation terminée, Strapi démarrera automatiquement sur `http://localhost:1337`. Créez votre compte administrateur initial.

---

## 📂 Étape 2 : Importation Automatique des Schémas de Données

Pour vous éviter de recréer manuellement tous les champs à la main dans le panneau d'administration, copiez les fichiers de schémas fournis dans votre nouveau projet local :

1. Arrêtez votre serveur Strapi local (`Ctrl + C`).
2. Créez les dossiers suivants dans votre projet local s'ils n'existent pas :
   * `src/api/course/content-types/course/`
   * `src/api/testimonial/content-types/testimonial/`
   * `src/api/registration/content-types/registration/`
3. Copiez le contenu des fichiers suivants (fournis dans ce dossier) vers leurs destinations respectives :
   * Copiez `schemas/course.json` ➔ `src/api/course/content-types/course/schema.json`
   * Copiez `schemas/testimonial.json` ➔ `src/api/testimonial/content-types/testimonial/schema.json`
   * Copiez `schemas/registration.json` ➔ `src/api/registration/content-types/registration/schema.json`
4. Relancez Strapi en local :
   ```bash
   npm run dev
   ```
Vos types de collection **Course**, **Testimonial** et **Registration** sont désormais entièrement configurés et prêts à l'emploi !

---

## 🔑 Étape 3 : Configuration des Droits d'Accès de l'API

Pour permettre à votre site web de lire les cours et d'envoyer les inscriptions :
1. Connectez-vous à votre panneau Strapi (`http://localhost:1337/admin`).
2. Accédez à **Settings** ➔ **Users & Permissions Plugin** ➔ **Roles**.
3. Cliquez sur le rôle **Public**.
4. Cochez les cases suivantes :
   * `course` : `find` et `findOne`
   * `testimonial` : `find` et `findOne`
   * `registration` : `create` *(permet d'enregistrer les formulaires d'inscription)*
5. Cliquez sur **Save** en haut à droite.

---

## 🚀 Étape 4 : Déploiement sur votre VPS Linux

Voici la procédure standard recommandée pour installer et héberger votre Strapi sur votre VPS de production.

### 1. Préparation du VPS
Connectez-vous à votre VPS par SSH et installez Node.js (version 18 ou 20 conseillée), npm et PM2 :
```bash
# Installer Node.js et NPM (Via NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PM2 globalement pour garder Strapi actif en arrière-plan
sudo npm install pm2 -g
```

### 2. Transférer votre projet de Local vers le VPS
Vous pouvez pousser votre code local sur un dépôt **GitHub** privé, puis le cloner sur votre VPS.
*(Veillez à ne pas inclure les dossiers `.tmp/`, `node_modules/` et `build/` dans votre Git !)*

Sur le VPS, dans le répertoire de votre projet :
```bash
# Installer les dépendances de production
npm install

# Construire l'interface d'administration de production
NODE_ENV=production npm run build
```

### 3. Configurer PM2 pour maintenir Strapi Actif
Pour démarrer Strapi en tâche de fond et faire en sorte qu'il redémarre automatiquement si le serveur redémarre, utilisez le fichier `ecosystem.config.js` fourni :
```bash
# Lancer Strapi en mode production avec PM2
pm2 start ecosystem.config.js

# Sauvegarder la configuration de démarrage pour la persistance au reboot du VPS
pm2 save
pm2 startup
```

### 4. Configurer Nginx comme Reverse Proxy (Sécurité & Port 80/443)
Configurez un bloc serveur Nginx pour rediriger le trafic public web vers l'instance interne de Strapi (qui tourne sur le port `1337`).

Créez un fichier de configuration :
```bash
sudo nano /etc/nginx/sites-available/strapi
```
Copiez-y la configuration fournie dans `nginx.conf` en remplaçant `votre-domaine.com` par votre vrai domaine.

Puis activez-la et rechargez Nginx :
```bash
sudo ln -s /etc/nginx/sites-available/strapi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Ajoutez un certificat SSL gratuit Let's Encrypt :
```bash
sudo apt-get install certbot python3-certbot-nginx -y
sudo certbot --nginx -d votre-domaine.com
```

---

## 📦 Étape 5 : Migration de Base de Données (Local ➔ VPS)

Strapi intègre un outil de transfert de données d'une simplicité remarquable.

### Exporter vos données de votre machine locale :
```bash
npm run strapi export -- --no-encrypt -f backup-local
```
Cette commande génère un fichier `.tar.gz` (ex: `backup-local.tar.gz`).

### Transférer le fichier sur votre VPS :
```bash
scp backup-local.tar.gz utilisateur@votre-ip-vps:/chemin/vers/strapi-vps/
```

### Importer les données sur votre VPS :
Connectez-vous à votre VPS, allez dans le dossier du projet Strapi et exécutez :
```bash
npm run strapi import -- -f backup-local.tar.gz
```
*Toutes vos images, textes de cours et configurations sont désormais migrés en production !*

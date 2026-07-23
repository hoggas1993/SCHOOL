module.exports = {
  apps: [
    {
      name: 'rafa-school-strapi',
      script: 'npm',
      args: 'run start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 1337,
        // Database credentials - set these or use local SQLite
        DATABASE_CLIENT: 'sqlite',
        DATABASE_FILENAME: '.tmp/data.db',
        // Security secrets (Make sure to generate cryptographically random keys for production!)
        APP_KEYS: 'key1,key2,key3,key4',
        API_TOKEN_SALT: 'yourRandomSaltHereForApiTokens',
        ADMIN_JWT_SECRET: 'yourRandomJwtAdminSecret',
        TRANSFER_TOKEN_SALT: 'yourRandomTransferSalt',
        JWT_SECRET: 'yourRandomClientJwtSecret'
      }
    }
  ]
};

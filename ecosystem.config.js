module.exports = {
  apps: [{
    name: 'nestjs-api',
    script: 'dist/main.js',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    interpreter: '/home/taidang/.nvm/versions/node/v20.19.1/bin/node',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
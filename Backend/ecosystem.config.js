// pm2 config file

module.exports = {
  apps: [
    {
      name: 'homes-for-heroes-app',
      script: 'Backend/server.js',
      instances: -1, // Spread app across all cpus except one
      exec_mode: 'cluster', // The app will be clustered
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

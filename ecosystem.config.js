module.exports = {
    apps: [
        {
            name: 'epaper',
            script: 'index.js',
            instances: 1,
            env: {
                NODE_ENV: 'production'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};

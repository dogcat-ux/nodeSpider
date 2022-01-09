module.exports = {
  apps : [{
    script: 'index.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'huangqiaoli',
      host : ['1.15.234.66'],
      port: "22",
      ref  : 'origin/master',
      repo : 'git@github.com:dogcat-ux/nodeSpider.git',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '/usr/local/www',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production && tsc src/ts/Spider.ts && pm2 start ./src/main.js',
      "pre-setup": "echo 'This is a pre-setup command'",
      "post-setup": "ls -la",    }
  }
};

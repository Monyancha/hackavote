config = {
  development: {
    redis: {
      port: 6379,
      host: '127.0.0.1',
      name: 'hackathon'
    },
    github: {
      clientID: '0f40413d1a7ec9d5aa66',
      clientSecret: 'aa4c7c2aa346d0b450c49027d33b581aedf59795',
      callbackUrl: 'http://localhost:3000/auth/github/callback' 
    }
  },
  production: {

  }
};

module.exports = config[process.NODE_ENV || 'development'];

config = {
  development: {
    redis: {
      port: 6379,
      host: '127.0.0.1',
      name: 'hackathon'
    },
    couchdb: {
      url: 'http://hackavote:monkey@localhost:5984',
      database: 'hackavote'
    },
    github: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackUrl: 'http://localhost:3000/auth/github/callback' 
    }
  },
  production: {

  }
};

module.exports = config[process.NODE_ENV || 'development'];

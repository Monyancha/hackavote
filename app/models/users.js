module.exports = function (sequelize, DataTypes) {
  
  
  var Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, validate: { isEmail: true }},
    uid: { type: DataTypes.STRING, unique: true },
    username: DataTypes.STRING,
    avatar: DataTypes.STRING,
    location: DataTypes.STRING,
    url: DataTypes.STRING, 
    bio: DataTypes.TEXT
  });

  return Users;
};

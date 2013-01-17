module.exports = function (sequelize, DataTypes) {

  var Users = sequelize.import(__dirname+'/users');
  var Events = sequelize.define('Events',  {
    name: DataTypes.STRING,
    slug: DataTypes.STRING, 
    description: DataTypes.TEXT,
    votingStatus: DataTypes.STRING,
    registrationStatus: DataTypes.STRING 
  });

  Events.belongsTo(Users);
  Events.hasMany(Users, { as: 'Follower' });
  Users.hasMany(Events);

  return Events;


};

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.import(__dirname+'/users');
  var Projects = sequelize.import(__dirname+'/projects');
  
  var Votes = sequelize.define('Votes', {

  });

  Votes.belongsTo(Users);
  Votes.belongsTo(Projects);
  
  return Votes;

};

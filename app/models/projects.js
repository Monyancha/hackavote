module.exports = function (sequelize, DataTypes) {
  
  var Users = sequelize.import(__dirname+'/users');

  var Projects = sequelize.define('Projects', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    github_url: DataTypes.STRING 
  });

  Projects.belongsTo(Users);
  Projects.hasMany(Users, { as: 'Contributor' });
  Users.hasMany(Projects);

  return Projects;

};

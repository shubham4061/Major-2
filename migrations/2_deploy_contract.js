const Project = artifacts.require("vaccine");
//var name = 'major'
module.exports = function(deployer) {
  deployer.deploy(Project); 
};

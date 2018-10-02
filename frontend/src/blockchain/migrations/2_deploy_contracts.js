var Ether = artifacts.require("./Ether.sol");

module.exports = function(deployer) {
  deployer.deploy(Ether);
};

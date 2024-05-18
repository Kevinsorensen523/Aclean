const ServiceContract = artifacts.require("ServiceContract");

module.exports = function (deployer) {
  deployer.deploy(ServiceContract);
};

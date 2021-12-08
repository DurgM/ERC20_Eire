var Eire = artifacts.require("Eire.sol");
var MyTokenSale = artifacts.require("MyTokenSale");
var MyKycContract = artifacts.require("KycContract");
require("dotenv").config({path:"../.env"});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(Eire, process.env.INITIAL_TOKENS);
    await deployer.deploy(MyKycContract);
    await deployer.deploy(MyTokenSale, 1, addr[0], Eire.address, MyKycContract.address);
    let instance = await Eire.deployed();
    await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);

}
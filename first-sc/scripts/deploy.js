const { ethers } = require("hardhat");

async function main() {
    const Helloworld = await ethers.getContractFactory("Helloworld");
    const contract = await Helloworld.deploy();
    console.log(contract.address);
}

main().then(()=> process.exit(0)).catch(error => {
    console.log(error);
    process.exit(1);
});
const { ethers, network } = require("hardhat");
const contract = require('../artifacts/contracts/helloworld.sol/Helloworld.json');

// const network_ = ethers.providers.getNetwork('sepolia');

const alchemyProvider = new ethers.providers.InfuraProvider(network.name="sepolia", process.env.API_KEY);

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, alchemyProvider);

 const helloworldContract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const message = await helloworldContract.message();
    console.log("The message is :", message);

    console.log("Updating Message...");
    const tx = await helloworldContract.update("Hiii");
    await tx.wait();

    const newMessage = await helloworldContract.message();
    console.log("The new-message is :", newMessage);
}

main().then(()=> process.exit(0)).catch(error => {
    console.log(error);
    process.exit(1);
});
//imports
const { ethers, run, network } = require("hardhat")
const {
    Contract,
} = require("hardhat/internal/hardhat-network/stack-traces/model")

//async main
async function main() {
    const CarcontractFactory = await ethers.getContractFactory("Carcontract")
    console.log("Deploying Contract...")
    const Carcontract = await CarcontractFactory.deploy()
    await Carcontract.deployed()
    console.log(Carcontract.address)
    console.log(network.config)
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        await Carcontract.deployTransaction.wait(6)
        await verify(Carcontract.address, [])
    }
    // const CurrentOwner = await Carcontract.ownerOfCar()
    // console.log("current Owner is : ${CurrentOwner}")

    // //update the current owner
    // const transactionResponse = await Carcontract.buyCar(4)
    // await transactionResponse.wait(1)
    // const UpdatedValue = await Carcontract.ownerOfCar()
    // console.log("New Owner is: ${UpdatedValue}")
}

async function verify(Contractaddress, args) {
    console.log("Verfying  contract")
    try {
        await run("verify:verify", {
            address: Contractaddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

// import { expect } from "chai"
// import { ethers } from "hardhat"
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
// import { Carcontract } from "../typechain-types"
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Carcontract", function () {
  let Carcontract;
  let owner1;
  let owner2;

  //contract deployment
  beforeEach(async () => {
    [owner1, owner2] = await ethers.getSigners();

    Carcontract = await ethers.getContractFactory("Carcontract");
    contract = await Carcontract.deploy();
  });
  describe("createCar", async () => {
    it("creating Car", async () => {
      await contract.deployed();
      const createCar = await contract.connect(owner1).createCar(4, "bmw");
      await createCar.wait();
      expect(await contract.ownerOfCar(4)).to.equal(owner1.address);
    });
  });

  describe("buyCar", async () => {
    it("buying Car", async () => {
      await contract.deployed();
      const buyCar = await contract.connect(owner2).buyCar(4);
      await buyCar.wait();
      expect(await contract.ownerOfCar(4)).to.equal(owner2.address);
    });
  });
});

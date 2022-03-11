const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("epic");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("most", {
    value: hre.ethers.utils.parseEther("0.3"),
  });
  await txn.wait();
  console.log("Minted domain most.epic");

  txn = await domainContract.setRecord("most", "This is cool af!");
  await txn.wait();
  console.log("Set record for most.epic");

  const address = await domainContract.getAddress("most");
  console.log("Owner of domain most:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

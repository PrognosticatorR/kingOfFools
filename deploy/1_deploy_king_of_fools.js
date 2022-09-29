const deployment = async (hre) => {
  const {
    deployments: { deploy },
    getNamedAccounts,
  } = hre
  const { deployer } = await getNamedAccounts()

  if (!hre.network.name.includes("mainnet")) {
    return deploy("KingOfFools", {
      from: deployer,
      log: true,
    })
  }
}

deployment.tags = ["KingOfFools", "ETH"]
module.exports = deployment

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("UploadModule", (m) => {
  const upload = m.contract("Upload");

  // Additional setup can be added here if necessary

  return { upload };
});

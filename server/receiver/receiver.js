const crypto = require("crypto");
const keyUtils = require("../key/key_utils.js");
const sender = require("../sender/sender.js");
const buffer = require("buffer");

async function verifyMessage(stringData, stringSignature) {
  const algorithm = "SHA256";
  const data = Buffer.from(stringData);
  const { publicKeyPem } = await keyUtils.getKeypair();
  const signature = Buffer.from(stringSignature, "base64");
  const isLegit = crypto.verify(algorithm, data, publicKeyPem, signature);
  return isLegit
}

module.exports.verifyMessage = verifyMessage;

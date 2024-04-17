const crypto = require("crypto");
const keytar = require("keytar");
const keyUtils = require('../key/key_utils.js')

function getFingerprint(plainText) {
  const hash = crypto.createHash("sha256");
  hash.update(plainText);
  const fingerprint = hash.digest("hex");
  return fingerprint;
}

async function generateDigitalSignature(plainText) {
  try {
    const fingerprint = getFingerprint(plainText);
    // const { privateKeyPem } = await getKeypair();
    const {privateKeyPem} = await keyUtils.getKeypair()
    console.info("creating sign object")
    const sign = crypto.createSign("SHA256");
    sign.update(fingerprint);
    console.info("updating sign object with fingerprint")
    const signature = sign.sign(privateKeyPem, "hex");
    console.info("digital signature created. returning...")
    return signature;
  } catch (err) {
    console.error(`error generating digital signature. ${err}`);
    throw err;
  }
}

module.exports.getFingerprint = getFingerprint;
module.exports.generateDigitalSignature = generateDigitalSignature;

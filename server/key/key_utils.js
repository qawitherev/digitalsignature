const crypto = require("crypto");
const keytar = require('keytar')

//todo: store it inside more secure place
const keychainService = "keychainService";
const keychainPublicKey = "keychainPublicKey";
const keychainPrivateKey = "keychainPrivateKey";

function generateKeypair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  console.info(`publickey: ${publicKey}`)
  const publicKeyPem = publicKey.export({ type: "pkcs1", format: "pem" });
  const privateKeyPem = privateKey.export({ type: "pkcs1", format: "pem" });
  return { publicKeyPem, privateKeyPem };
}

async function getKeypair() {
  const publicKeyPem = await keytar.getPassword(
    keychainService,
    keychainPublicKey
  );
  const privateKeyPem = await keytar.getPassword(
    keychainService,
    keychainPrivateKey
  );

  if (publicKeyPem === null || privateKeyPem === null) {
    console.info("no saved key found, begin generating new keypair...");
    const { publicKeyPem, privateKeyPem } = generateKeypair();
    await keytar.setPassword(keychainService, keychainPublicKey, publicKeyPem);
    console.info("saved public key inside keychain");
    await keytar.setPassword(
      keychainService,
      keychainPrivateKey,
      privateKeyPem
    );
    console.info("saved private key inside keychain");
    console.info("returning saved keypair...");
    return { publicKeyPem, privateKeyPem };
  } else {
    console.info("saved keypair found. returning....");
    return { publicKeyPem, privateKeyPem };
  }
}

function deleteKeyInsideKeychain() {
    keytar.deletePassword(keychainService, keychainPublicKey);
    keytar.deletePassword(keychainService, keychainPrivateKey);
    console.info("keypair deleted from keychain");
  }

async function getPublicKey() {
    const publicKeyPem = await keytar.getPassword(
        keychainService,
        keychainPublicKey
      );

    if (publicKeyPem === null) {
        return null
    } else {
        return extractPublicKey(publicKeyPem)
    }
}

function extractPublicKey(publicKeyPem) {
    const publicKey = publicKeyPem.replace(/-----BEGIN RSA PUBLIC KEY-----/, "")
    .replace(/-----END RSA PUBLIC KEY-----/, "").trim()
    return publicKey

}

module.exports.generateKeypair = generateKeypair;
module.exports.getKeypair = getKeypair;
module.exports.deleteKeyInsideKeychain = deleteKeyInsideKeychain
module.exports.getPublicKey = getPublicKey

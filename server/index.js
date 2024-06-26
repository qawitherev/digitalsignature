const express = require("express");
const sender = require("./sender/sender.js");
const receiver = require('./receiver/receiver.js')
const keyUtils = require("./key/key_utils.js")
const {apiKeyMiddleware, jwtMiddleware} = require('./auth/auth_middleware.js')
const { createJWT } = require('./auth/jwt_utils.js')

var app = express();
app.use(express.json())
const port = 10000;

app.get("/", function (req, res) {
  res.send("this is server root");
});

/**
 * auth using apikey
 */
app.post("/createDigitalSignature", apiKeyMiddleware, async function (req, res) {
  const { plainText } = req.body;
  try {
    const {signature, stringSignature } = await sender.generateDigitalSignatureV2(plainText);
    res.status(200).json({signature: stringSignature});
    return
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).send({ error: `error occured: ${err.message}` });
  }
});

/**
 * auth using jwt 
 */
app.post("/getPublicKey", jwtMiddleware, async function(req, res) {
    const publicKey = await keyUtils.getPublicKey()
        if (publicKey === null) {
            console.info("keypair hasn't been generated")
            res.status(401).send({error: 'key pair not generated'})
        } 
        res.status(200).json({publicKey})
})

/**
 * auth using apiKey
 */
app.post('/verifyMessage', apiKeyMiddleware, async function(req, res) {
  const { stringData, stringSignature } = req.body
  const isLegit = await receiver.verifyMessage(stringData, stringSignature)
  res.status(200).json({isLegit})
})

app.post('/loginJwt', function(req, res) {
  const userInfo = req.body
  console.info(userInfo)
  const token = createJWT(userInfo)
  console.info('token created. returning...')
  res.status(200).json({token})
})

/*************************************************************************************** */
/**
 * @deprecated this endpoint shouldn't be used by consumer
 */
app.get("/getFingerprint/:plainText", function (req, res) {
  const { plainText } = req.params;
  const fingerprint = sender.getFingerprint(plainText);
  res.send(fingerprint);
});

/**
 * @deprecated this endpoint shouldn't be used by consumer
 */
app.get("/getKeypair", async function (req, res) {
  const { publicKeyPem, privateKeyPem } = await sender.getKeypair();
  res.send(`public key \n ${publicKeyPem}`);
});

/**
 * @deprecated this endpoint shouldn't be used by consumer
 */
app.get("/deleteKeypair", function (req, res) {
  keyUtils.deleteKeyInsideKeychain();
  res.send("keypair deleted from server");
});

app.get('/testVerify', function(req, res) {
  const verified = receiver.verifyMessage()
  res.status(200).send('OK')
})

app.get('/createDigitalSignatureV2/:plainText', async function(req, res) {
  const { plainText } = req.params
  const { signature, stringSignature } = await sender.generateDigitalSignatureV2(plainText)
  res.status(200).json({signature, stringSignature})
})

/***************************************************************************************** */

app.listen(port, function () {
  console.log("server started. listening on port ", port);
});

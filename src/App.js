import "./App.css";
import { useState } from "react";
import { createDigitalSignature, getPublickey, getJwt } from "./utils/HttpHelper.js";
import { readValue, saveValue } from "./utils/LocalStorageUtils.js";

//import components 
import { Receiver } from "./components/Receiver.js";
import { PublicKeyComponent, DigitalSignComponent } from "./components/Sender.js";

function App() {
  const [plainText, setPlaintext] = useState("");
  const [digitalSignature, setDigitalSignature] = useState("");
  const [publicKey, setPublicKey] = useState("");

  async function handleGetPublicKey() {
    const jwt = readValue()
    if (jwt) {
      const publicKey = await getPublickey(jwt)
      setPublicKey(publicKey)
    } else {
      const newJwt = await getJwt()
      saveValue(newJwt)
      const publicKey = await getPublickey((newJwt))
      setPublicKey(publicKey)
    }
  }

  async function handleCreateDigitalSignature() {
    if(plainText === "") {
      alert('message cannot be empty')
      return
    }
    try {
      const signature = await createDigitalSignature(plainText);
      setDigitalSignature(signature);
    } catch (err) {
      console.error(`Error creating digital signature: ${err}`);
    }
  }

  function handlePlainTextChange(event) {
    setPlaintext(event.target.value);
  }

  return (
    <>
      <div className="py-3 px-3">
        <DigitalSignComponent onInputChange={handlePlainTextChange} handleCreateDigitalSignature={handleCreateDigitalSignature} digitalSignature={digitalSignature}/>
        <PublicKeyComponent onClickGetPublicKey={handleGetPublicKey} publicKey={publicKey} />
        <Receiver />
      </div>
    </>
  );
}

export default App;

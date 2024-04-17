import "./App.css";
import { useState } from "react";
import { copyMe } from "../src/utils/GenericUtils.js";
import { createDigitalSignature } from "./utils/HttpHelper.js";

import { Receiver } from "./components/Receiver.js";
import { Sender } from "./components/Sender.js";

function App() {
  const [plainText, setPlaintext] = useState("");
  const [digitalSignature, setDigitalSignature] = useState("");
  const [publicKey, setPublicKey] = useState("");

  //TODO: change to conform backend
  function getPublicKey() {
    fetch("/getPublicKey")
      .then((res) => {
        if (res.ok) {
          return res.text();
        } else {
          throw new Error(`Server error: ${res.statusText}`);
        }
      })
      .then((data) => setPublicKey(data))
      .catch((err) => {
        console.error(err);
      });
  }

  function copyDigiCert() {
    if (digitalSignature === "") {
      console.info(`no digital signature found. returning...`);
      return;
    }
    copyMe(digitalSignature);
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
        <p>Enter message to be digitally signed</p>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          value={plainText}
          onChange={handlePlainTextChange}
        />
        <button
          className="bg-gradient-to-br my-3 from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded relative overflow-hidden"
          onClick={handleCreateDigitalSignature}
        >
          Create digital signature
        </button>
        {digitalSignature !== "" ? (
          <Sender digitalSignature={digitalSignature} />
        ) : null}
        <div className="flex flex-col items-start">
          <div className="py-2" />
          <button
            className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded relative overflow-hidden"
            onClick={getPublicKey}
          >
            Get public key
          </button>
        </div>
        {publicKey !== "" ? (
          <div>
            <p>Public key:</p>
            <p style={{ wordWrap: "break-word" }}>{publicKey}</p>
          </div>
        ) : (
          <p></p>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-3 rounded"
          onClick={() => copyDigiCert()}
        >
          Copy public key
        </button>
        <Receiver />
      </div>
    </>
  );
}

export default App;

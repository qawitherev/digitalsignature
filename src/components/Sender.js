import { useState } from "react";
import { copyMe } from "../utils/GenericUtils";

export function DigitalSignComponent({
  onInputChange,
  handleCreateDigitalSignature,
  digitalSignature,
}) {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      <div className="flex flex-col">
        <p>Enter message to be digitally signed</p>
        <input
          type="text"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={onInputChange}
        ></input>
        <button
          style={{ width: "fit-content" }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 my-3 rounded relative overflow-hidden"
          onClick={handleCreateDigitalSignature}
        >
          Create digital signature
        </button>
        {digitalSignature !== "" ? (
          <div>
            <p style={{ wordWrap: "break-word" }}>
              Digital Signature: {digitalSignature}
            </p>
            <button
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 my-3 rounded relative overflow-hidden"
              style={{ width: "fit-content" }}
              onClick={() => {
                if (isCopied) return;
                setIsCopied(true);
                copyMe(digitalSignature);
              }}
            >
              {!isCopied ? "Copy digital sign" : "Copied"}
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export function PublicKeyComponent({ onClickGetPublicKey, publicKey }) {
  const [isPublicKeyCopied, setPublicKeyCopied] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        <button
          style={{ width: "fit-content" }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 my-3 rounded relative overflow-hidden"
          onClick={() => onClickGetPublicKey()}
        >
          Get Public Key
        </button>
        {publicKey !== "" ? (
          <div>
            <p style={{ wordBreak: "break-word" }}>{publicKey}</p>
            <button
              style={{ width: "fit-content" }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 my-3 rounded relative overflow-hidden"
              onClick={() => {
                if (isPublicKeyCopied) return;
                setPublicKeyCopied(true);
                copyMe(publicKey);
              }}
            >
              {!isPublicKeyCopied ? "copy public key" : "Copied"}
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

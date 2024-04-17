import { useState } from "react";
import { copyMe } from "../utils/GenericUtils";

export function Sender( {digitalSignature} ) {
    const [isCopied, setIsCopied] = useState(false)
  return (
    <>
      <div className="flex flex-col">
        <p style={{wordWrap: 'break-word'}}>Digital Signature: {digitalSignature}</p>
        <button
          className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 my-3 rounded relative overflow-hidden"
          style={{width: 'fit-content'}}
          onClick={() => {
            if (isCopied) return 
            setIsCopied(true)
            copyMe(digitalSignature)
          }}
        >
          {!isCopied ? 'Copy digital sign' : 'Copied'}
        </button>
      </div>
    </>
  );
}


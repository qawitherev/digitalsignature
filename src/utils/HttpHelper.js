import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

/**
 * creating digitalSignature
 */
export async function createDigitalSignature(plainText) {
  const endpoint = "/createDigitalSignature";
  const headers = { "api-key": API_KEY, "Content-Type": "application/json" };
  const body = { plainText };
  try {
    const res = await axios.post(endpoint, body, { headers });
    const { signature } = res.data;
    return signature;
  } catch (err) {
    throw err;
  }
}

/**
 * creating public key
 */
export async function getPublickey(jwtString) {
  const endpoint = "/getPublicKey";
  const headers = {
    authorization: "Bearer " + jwtString,
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.post(endpoint, {}, { headers });
    if (res.status === 200) {
      const { publicKey } = res.data;
      return publicKey;
    } else {
      const { error } = res.data;
      return error;
    }
  } catch (err) {
    throw err;
  }
}

/**
 * getting jwt from /loginJwt
 */
export async function getJwt() {
  //TODO: use current epoch as user info
  const endpoint = "/loginJwt";
  const unixEpoch = new Date().getTime();
  const data = { userInfo: unixEpoch };
  try {
    const res = await axios.post(endpoint, data);
    const { token } = res.data;
    return token;
  } catch (err) {
    throw err;
  }
}

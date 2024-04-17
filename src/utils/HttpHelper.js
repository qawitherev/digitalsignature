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

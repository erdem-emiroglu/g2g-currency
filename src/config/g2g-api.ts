import CryptoJS from "crypto-js";

const secretKey = "dJirm8nG5AqQWoh7J5EHw3373Dk95zjRHaQ3gnv99kw"; // Your API Secret Key
const apiKey = "b5769724c1cb1d52c58717d3d12ae2fe"; // Your API Key
const userId = "100000"; // Your User ID
const timestamp = "1653278884000"; // g2g-timestamp
const canonicalUrl = "/v1/offers/G1650445167989US/inventory_items/ba8551d9-47e3-424a-a809-4f043059eefb"; // API Endpoint

const canonicalString = canonicalUrl + apiKey + userId + String(timestamp);

const signature = CryptoJS.HmacSHA256(canonicalString, secretKey);

export { signature, apiKey, userId, timestamp, canonicalUrl };

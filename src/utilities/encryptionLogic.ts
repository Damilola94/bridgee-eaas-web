import CryptoJS from "crypto-js";

const ENCRYPTION_SETTINGS = {
  Key: "+cqrU6XPmDAFUGWPMECiS8zT8OU8yUrSzkh8Oo6OFZg=",
  IV: "hM7uyiVj42kMcTDdDtlS5Q=="
};

export function encryptWithPublicKey(payload: string): string {
  try {
    const key = CryptoJS.enc.Base64.parse(ENCRYPTION_SETTINGS.Key);
    const iv = CryptoJS.enc.Base64.parse(ENCRYPTION_SETTINGS.IV);

    const encrypted = CryptoJS.AES.encrypt(payload, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Failed to encrypt payload");
  }
}

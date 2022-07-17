import {
  createHash,
  randomBytes,
  scrypt,
} from "https://deno.land/std@0.148.0/node/crypto.ts";

/**
 * @exports
 * @function
 * @description Hashes a string using SHA3
 * @param {string} str - The string to hash
 * @param {number} [digest=256] - The digest to use
 * @returns
 */
export const sha3 = (str, digest = 256) =>
  createHash(`sha3-${digest}`).update(str).digest("hex");

/**
 * @exports
 * @async
 * @function
 * @description Hashes a password using Scrypt
 * @param {string} password - The password to hash
 * @returns {PromiseLike<string>} The hash
 */
// deno-lint-ignore require-await
export const hash = async (password) =>
  new Promise((resolve, reject) => {
    const salt = randomBytes(8).toString("hex");

    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        reject(err);
      }

      const derivedKeyHex = derivedKey.toString("hex");
      const hash = `${salt}:${derivedKeyHex}`;

      resolve(hash);
    });
  });

/**
 * @example
 * @async
 * @function
 * @description Verifies a password using Scrypt
 * @param {string} password - The password given by the user
 * @param {string} hash - The hash in the database
 * @returns {PromiseLike<boolean>} Whether or not the hash matches
 */
// deno-lint-ignore require-await
export const verify = async (password, hash) =>
  new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");

    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        reject(err);
      }

      const derivedKeyHex = derivedKey.toString("hex");
      const matches = (key === derivedKeyHex);

      resolve(matches);
    });
  });

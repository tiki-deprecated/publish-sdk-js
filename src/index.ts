import {isPlatformReady } from './platform';
class TikiSdk {
    private static ___instance: TikiSdk;
    private ___address: string;
    private ___origin: string;

    public static getInstance(): TikiSdk {
        if (!TikiSdk.___instance) {
            TikiSdk.___instance = new TikiSdk();
        }

        return TikiSdk.___instance;
    }

    private async exportCryptoKey(key) {
      const exported = await window.crypto.subtle.exportKey("pkcs8", key);
      const exportedKeyBuffer = new Uint8Array(exported);

      console.log(exportedKeyBuffer)
      const message = await window.___TikiSdk__KeyStorageWrite("mykeykey", exportedKeyBuffer);
      //const exportKeyOutput = document.querySelector(".exported-key");
      //exportKeyOutput.textContent = `[${exportedKeyBuffer}]`;

    }

    public async generateKeypair() {
      window.crypto.subtle.generateKey({
        name: "RSA-PSS",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
        true,
        ["sign", "verify"]
      ).then((keypair) => {
        console.log("generated key");
        console.log("doing digest");
        console.log(keypair.publicKey);

        //const exported = await window.crypto.subtle.exportKey("pkcs8", keypair.privateKey);
        this.exportCryptoKey(keypair.privateKey);

        //const exportedKeyBuffer = new Uint8Array(exported);
        //console.log(exported)
      });

    }

    public async generateAddress(): Promise<string> {
      const array = new Uint8Array(10);
      await window.crypto.getRandomValues(array);
      var address = await globalThis.crypto.subtle.digest("SHA-256", new Uint8Array(array, 0, 5));

      const hashArray = Array.from(new Uint8Array(address)); // convert buffer to byte array
      const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // convert bytes to hex string
      return hashHex;

    }
    public async withId(addy: string): Promise<string> {
      // Check if wallet address is present in indexedDB
      // Create if not found

      await globalThis.___TikiSdk__SdkWithId(addy);
      return addy;

    }

    public async init(publishing_id: string, origin: string) {
      const message = await globalThis.___TikiSdk__SdkInit(publishing_id, origin);
      return message;
    }

    get address() {
      return this.___address;
    }
    get origin() {
      return this.___origin;
    }
    set origin(o: string) {
      this.___origin = o;
    }

}

export function platformReady(): boolean {
  TikiSdk.getInstance();
  return isPlatformReady();
}

export async function getAddress(): Promise<string> {
  const c = TikiSdk.getInstance();
  return c.address;
}

export async function withId(addy: string): Promise<string> {
  const c = TikiSdk.getInstance();
  return c.withId(addy);
}


export async function init(publishing_id:string, origin: string): Promise<boolean> {
  const c = TikiSdk.getInstance();
  c.origin = origin;
  // Initialize SDK
  console.log("initializing...")
  await c.generateKeypair()
  const hashHex = c.generateAddress()
  console.log(`wallet address: ${hashHex}`);

  // Store Public Key in Tiki Storage
  // Place Private Key in IndexedDB

  c.init(publishing_id, origin)
  return new Promise((resolve) => resolve(true));
}

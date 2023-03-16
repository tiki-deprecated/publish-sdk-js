export {}
declare global {
  interface Window {
    ___TikiSdk__hasCrypto: boolean
    ___TikiSdk__hasWallet: boolean
    ___TikiSdk__sqliteVersion: boolean | string
    ___TikiSdk__SdkInit: (string, string) => boolean | string
    ___TikiSdk__SdkWithId: (string) => boolean | string
    ___TikiSdk__isSecure: boolean
  }
}

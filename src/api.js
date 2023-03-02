import { getPlatformStatus, isPlatformReady } from './platform';



export const tikiApi = () => {
  return getPlatformStatus;
};


export class TikiSdk {
  JSBuilder = null;
  constructor() {
    if (isPlatformReady() === true) {
      this.JSBuilder = window.__TikiSdk__entryPoint || {}
    }
  }
  platformReady() {
    return isPlatformReady();
  }
}

export const TikiSdkJSBuilder = () => {
};

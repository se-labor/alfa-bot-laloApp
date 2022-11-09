import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  //appId has to be the same as defined from flutter
  appId: 'de.fhms.alfabot.app',
  appName: 'Lalo',
  webDir: 'dist/alfabot',
  bundledWebRuntime: false,
  ios: {
    preferredContentMode: "mobile"
  }
};

export default config;

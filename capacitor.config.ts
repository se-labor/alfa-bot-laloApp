import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'eu.fhms.lalo',
  appName: 'Lalo',
  webDir: 'dist/alfabot',
  bundledWebRuntime: false,
  ios: {
    preferredContentMode: "mobile"
  }
};

export default config;

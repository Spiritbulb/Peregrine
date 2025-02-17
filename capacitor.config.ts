
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.47506c4b0e5240c5a37ccc2fb25527e1',
  appName: 'peregrine',
  webDir: 'dist',
  server: {
    url: 'https://47506c4b-0e52-40c5-a37c-cc2fb25527e1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    backgroundColor: "#ffffff"
  }
};

export default config;


import { Preferences } from '@capacitor/preferences';
import { Toast } from '@capacitor/toast';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

// Initialize native features
export const initializeNative = async () => {
  try {
    await StatusBar.setBackgroundColor({ color: '#ffffff' });
    await StatusBar.setStyle({ style: Style.Dark });
    await SplashScreen.hide();
  } catch (error) {
    console.log('Running in web mode');
  }
};

// Show native toast
export const showNativeToast = async (message: string) => {
  try {
    await Toast.show({
      text: message,
      duration: 'short',
      position: 'bottom'
    });
  } catch (error) {
    console.log('Toast not available:', message);
  }
};

// Store data natively
export const storeNativeData = async (key: string, value: string) => {
  await Preferences.set({
    key,
    value
  });
};

// Get stored native data
export const getNativeData = async (key: string) => {
  const { value } = await Preferences.get({ key });
  return value;
};

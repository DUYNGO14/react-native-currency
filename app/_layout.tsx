/* eslint-disable import/no-unresolved */
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, usePathname, useSegments } from "expo-router";
import { useEffect } from "react";
import { PostHogProvider, usePostHog } from 'posthog-react-native';
import '../global.css';

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

function ScreenTracker() {
  const pathname = usePathname();
  const segments = useSegments();
  const posthog = usePostHog();

  useEffect(() => {
    posthog.screen(pathname, { segments });
  }, [pathname]);

  return null;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'sans-regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    'sans-light': require('../assets/fonts/PlusJakartaSans-Light.ttf'),
    'sans-medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    'sans-bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    'sans-extrabold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'sans-semibold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
  });

  useEffect(()=>{
    if(fontsLoaded){
      SplashScreen.hideAsync();
    }
  },[fontsLoaded]);
  if(!fontsLoaded) return null;
  return (
    <PostHogProvider
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY!}
      options={{ host: process.env.EXPO_PUBLIC_POSTHOG_HOST }}
    >
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ScreenTracker />
        <Stack screenOptions={{headerShown: false}} />
      </ClerkProvider>
    </PostHogProvider>
  );
}

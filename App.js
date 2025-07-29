import { StyleSheet, View} from 'react-native';
import { useFonts } from 'expo-font';
import Onboarding from './screens/Onboarding';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './screens/Profile';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


SplashScreen.preventAutoHideAsync(); 

const Stack = createNativeStackNavigator();



export default function App() {

  const [user,setUser] = useState(''); // Simulate user state

  const [fontsLoaded] = useFonts({
    'MarkaziText-Medium': require('./assets/fonts/MarkaziText-Medium.ttf'),
    'MarkaziText-Regular': require('./assets/fonts/MarkaziText-Regular.ttf'),
    'Karla-Medium': require('./assets/fonts/Karla-Medium.ttf'),
    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),
    'Karla-ExtraBold': require('./assets/fonts/Karla-ExtraBold.ttf'),
    'Karla-Bold': require('./assets/fonts/Karla-Bold.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // hide splash once fonts are ready
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (    
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}
          initialRouteName={user ? "Profile" : "Onboarding"}>
          <Stack.Screen name="Onboarding" component={Onboarding}/>
          <Stack.Screen name="Profile" component={Profile}/>
        </Stack.Navigator>
      </NavigationContainer> 
    </SafeAreaProvider>
       
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

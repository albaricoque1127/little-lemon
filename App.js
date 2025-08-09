import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { getUserData } from './utils/storage';
import RootNavigator from './components/RootNavigator';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';


export default function App() {
 
  const [userData, setUserData] = useState(null);

  const [fontsLoaded] = useFonts({
    ...Ionicons.font, // Ionicons for vector icons
    'MarkaziText-Medium': require('./assets/fonts/MarkaziText-Medium.ttf'),
    'MarkaziText-Regular': require('./assets/fonts/MarkaziText-Regular.ttf'),
    'Karla-Medium': require('./assets/fonts/Karla-Medium.ttf'),
    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),
    'Karla-ExtraBold': require('./assets/fonts/Karla-ExtraBold.ttf'),
    'Karla-Bold': require('./assets/fonts/Karla-Bold.ttf'),
  });

  useEffect(() => {
    const loadUser = async () => {
      const data = await getUserData();
      console.log('User data loaded:', data);
      setUserData(data || { isLoggedIn: false });
    };
    loadUser();
  }, []);

  // Wait for fonts before rendering
  if (!fontsLoaded || userData === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <RootNavigator userData={userData} setUserData={setUserData}/>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


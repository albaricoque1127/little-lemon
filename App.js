import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import Onboarding from './screens/Onboarding';

export default function App() {

  const [fontsLoaded] = useFonts({
    'MarkaziText-Medium': require('./assets/fonts/MarkaziText-Medium.ttf'),
    'MarkaziText-Regular': require('./assets/fonts/MarkaziText-Regular.ttf'),
    'Karla-Medium': require('./assets/fonts/Karla-Medium.ttf'),
    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),
    'Karla-ExtraBold': require('./assets/fonts/Karla-ExtraBold.ttf'),
    'Karla-Bold': require('./assets/fonts/Karla-Bold.ttf')
  });

  return (
    <SafeAreaView style={styles.container}>
      <Onboarding user={{ profilePic: true }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

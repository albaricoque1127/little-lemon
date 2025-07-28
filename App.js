import { StyleSheet, View } from 'react-native';
import Onboarding from './screens/Onboarding';
a
export default function App() {
  return (
    <View style={styles.container}>
      <Onboarding user={{ profilePic: true }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

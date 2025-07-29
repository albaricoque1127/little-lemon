import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { fonts, sizes, textCase } from '../styles/typography';

export default function Profile({ user, navigation }) {
  return (
    <View style={styles.container}>
      <Header user={user} />
      <Hero/>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>PROFILE</Text>
        {/* Additional profile content can go here */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
contentContainer: {
    flex: 1,
    padding: 20,
},
sectionTitle: {
    fontSize: sizes.sectionTitle,
    fontFamily: fonts.sectionTitle,
    marginVertical: 20,
    fontWeight: 'bold',
  },
});    
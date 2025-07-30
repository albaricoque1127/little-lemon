import {View, Text, StyleSheet, Pressable} from 'react-native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { fonts, sizes, textCase } from '../styles/typography';
import { clearUserData } from '../utils/storage';

export default function Profile({ setIsLoggedIn, isLoggedIn }) {
    

  const handleLogout = async () => {
    try {
      await clearUserData();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header isLoggedIn={isLoggedIn} />
      <Hero/>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>PROFILE</Text>
        {/* Additional profile content can go here */}
      </View>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
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
button: {
    
    height: 35,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
untouched: {
    backgroundColor: '#F4CE14', // bright yellow
    opacity: 1,
  },
clicked: {
    backgroundColor: '#EE9972' //light orange,
  },
disabled: {
    backgroundColor: '#EDEFEE', // dark gray
    
  },
});    
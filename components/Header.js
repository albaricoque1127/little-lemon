import { View, Image, StyleSheet, Platform, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Avatar from './Avatar';

export default function Header({  navigation, userData }) {
  console.log(`Header user state: ${userData.isLoggedIn}`);
  return (    
    <View style={styles.header}>
      <View style={styles.spacer} />
      <Image
        source={require('../assets/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.spacer}>
        {userData.isLoggedIn && (
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Avatar userData={userData} size={48}/>
          </Pressable>
        )}
      </View>
    </View>    
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingBottom: 8,
    paddingHorizontal: 25,
    paddingTop: 40,
    
  },
  logo: {
    height: 32,
    alignSelf: 'center',
    marginTop: 'auto',
  },
  
  spacer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
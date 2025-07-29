import { View, Image, StyleSheet, Platform, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header({ user, navigation }) {
  console.log('Header user state:', user);
  return (    
    <View style={styles.header}>
      <View style={styles.spacer} />
      <Image
        source={require('../assets/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.spacer}>
        {user && (
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('../assets/Profile.png')}
              style={styles.profilePic}
            />
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
  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 20,
  },
  spacer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
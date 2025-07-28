import { View, Image, StyleSheet, Platform, SafeAreaView } from 'react-native';

export default function Header({ user }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.spacer} />
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.spacer}>
          {user?.profilePic && (
            <Image
              source={require('../assets/Profile.png')}
              style={styles.profilePic}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
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
    
  },
  logo: {
    height: 48,
    alignSelf: 'center',
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
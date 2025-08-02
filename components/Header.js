import { View, Image, StyleSheet, Pressable} from 'react-native';
import Avatar from './Avatar';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';



export default function Header({  navigation, userData, canGoBack }) {

  console.log(`Header user state: ${userData.isLoggedIn}`);

  return (    
    <View style={styles.header}>

      
      <Pressable
        onPress={() => navigation.goBack()}
        disabled={!canGoBack}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && styles.iconButtonPressed,
          !canGoBack && styles.iconButtonDispabled,
        ]}
      >
        <Ionicons name="arrow-back" style={styles.buttonIcon} size={25}/>
      </Pressable>
          
      <Image
        source={require('../assets/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
                  
      <Pressable 
        onPress={() => navigation.navigate('Profile')}
        disabled={!userData.isLoggedIn}
        style={({ pressed }) => { opacity: pressed ? 0.6 : 1 }}>
        <Avatar userData={userData} size={40}/>
      </Pressable>
    
      
    </View>    
  );
}

const styles = StyleSheet.create({
   
  iconButton: {
    backgroundColor: '#495E57',
    height: 36,
    width: 36,
    borderRadius:20,
    justifyContent: 'center',
    alignItems:'center'
  },
  iconButtonPressed:{
    opacity: 0.7,
  },
  iconButtonDispabled:{
    backgroundColor: '#ffffff'
  },
  buttonIcon:{    
    color:'#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingBottom: 8,
    paddingHorizontal: 25,
    paddingTop: 36,
    minHeight: 80,
    
  },
  logo: {
    height: 32,
    alignSelf: 'center',
    marginTop: 'auto',
  },
  
  
});
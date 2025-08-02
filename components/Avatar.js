import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {fonts} from '../styles/typography';




export default function Avatar({userData, size}){

    const getInitials = (firstname,lastname) => {
        if (!lastname) {
            return firstname.charAt(0).toUpperCase();
        }
        else {
            const firstInitial = firstname.charAt(0);
            const lastInitial = lastname.charAt(0);
            return (firstInitial + lastInitial).toUpperCase();
        }
    };
    const initials = getInitials(userData.firstName, userData.lastName)
    
    return(
        <View>
            {userData.profilePic ? 
                (
                    <Image
                        source={{uri: userData.profilePic}}
                        style={{ width: size, height: size, borderRadius: size / 2 }}
                    />
                    ):
                    (
                        <View style={[
                            styles.placeholder, 
                            { width: size, height: size, borderRadius: size / 2 }
                            ]}
                        >
                            <Text style={[
                                styles.initials, 
                                { fontSize: size * 0.4 }
                                ]}
                            >
                                {initials}
                            </Text>
                        </View>
            )
            }
        </View>
    )
};    
   

const styles = StyleSheet.create({
  
  placeholder: {
    backgroundColor: '#EE9972',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  initials: {
    color: '#ffffffff',
    fontFamily: fonts.categories,
    fontWeight: 'bold',
  },
});
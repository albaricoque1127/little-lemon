import {View, Text, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { fonts, sizes, textCase } from '../styles/typography';
import { clearUserData } from '../utils/storage';
import { useState } from 'react';

export default function Profile({ setIsLoggedIn, isLoggedIn, data }) {

      const [pressed, setPressed] = useState(false); // State to track button press
    
    

    const handleLogout = async () => {
        try {
        await clearUserData();
        setIsLoggedIn(false);
        } catch (error) {
        console.error('Logout failed:', error);
        }
    };

    console.log('User data stored:', data); 

    return (
               
        <View style={styles.container}>
            <Header isLoggedIn={isLoggedIn} />
            <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={40} // Adjust if header is overlapping
            >
                <ScrollView 
                        style={styles.scrollView} 
                        keyboardDismissMode="on-drag"
                        showsVerticalScrollIndicator={true}
                        indicatorStyle='white'>
                    <Hero/>
                    <View style={styles.contentContainer}>
                        <Text style={styles.sectionTitle}>PROFILE</Text>
                        {/* Additional profile content can go here */}
                        <View style={styles.form}>
                            <Text style={styles.label}>First Name</Text>
                            <Text style={styles.input}>John</Text>
                            <Text style={styles.label}>Last Name</Text>
                            <Text style={styles.input}>Doe</Text>
                            <Text style={styles.label}>Email</Text>
                            <Text style={styles.input}>Email@email.com</Text>
                            <Text style={styles.label}>Phone</Text>
                            <Text style={styles.input}>123-456-7890</Text>
                        </View>
                    </View>
                    <Pressable 
                        onPressIn={() => setPressed(true)}
                        onPressOut={() => setPressed(false)}
                        style={( ) => [
                            styles.button,
                            pressed ? styles.clicked : styles.untouched,
                        ]}
                        onPress={handleLogout}>
                            <Text style={styles.buttonText}>
                                Log Out
                            </Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    scrollView: {
        flex: 1,
    },

    contentContainer: {
        paddingHorizontal: 25,
        paddingVertical: 16,
    },
    sectionTitle: {
        fontSize: sizes.sectionTitle,
        fontFamily: fonts.sectionTitle,
        marginVertical: 20,
        fontWeight: 'bold',
    },
    form: {
    width: '100%',
    },
    label: {
        fontSize: sizes.lead,
        fontFamily: fonts.body,
        marginBottom: 8,
    },
    input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: sizes.paragraph,
    fontFamily: fonts.body,    
  },
    inputError: {
    borderColor: 'red',
    borderWidth: 1,
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
    buttonText: {
        fontSize: sizes.categories,
        fontFamily: fonts.categories,
        fontWeight: 'bold',
        color: '#333333',
    },
});    
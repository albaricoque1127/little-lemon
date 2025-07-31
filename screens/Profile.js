import {View, Text, Image, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView, TextInput} from 'react-native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { fonts, sizes, textCase } from '../styles/typography';
import { clearUserData, getUserData, storeUserData } from '../utils/storage';
import { useState } from 'react';
import { YellowButton, GreenButton } from '../components/Button';

export default function Profile({ userData, setUserData }) {

    //const [pressed, setPressed] = useState(false);
    
    const [lastNameTouched, setLastNameTouched] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const nameRegex = /^[a-zA-ZÀ-ÿ\u00C0-\u017F\s'-]+$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    const isValidLastName = (lastName) => {
        return lastName.trim().length > 0 && nameRegex.test(lastName);
    };

    const isValidPhone = (phone) => {
        return phone.trim().length > 0 && phoneRegex.test(phone)};

    const disabledSubmit = !isValidLastName(formData.lastName) ||
                    !isValidPhone(formData.phone);
                  

    const handleSubmit = async () => {
        try{
          console.log('Form submitted:', formData);
          const user = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            isLoggedIn: true
          };
    
          await storeUserData(user);
          const userUpdate = await getUserData();
          console.log('User data stored:', userUpdate);
          setUserData(userUpdate); //updates state across screens
               
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
        };
        

    const handleLogout = async () => {
        try {
        await clearUserData();
        setUserData({
          isLoggedIn: false})
        } catch (error) {
        console.error('Logout failed:', error);
        }
    };

    

    return (
               
        <View style={styles.container}>
            <Header userData={userData} />
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
                        <Text style={styles.sectionTitle}>USER DETAILS</Text>
                        
                        <View style={styles.form}>
                            <Text style={styles.label}>Avatar</Text>

                            <View style={styles.profilePicContainer}>
                            
                                <Image
                                    style={styles.profilePic}
                                    source={require('../assets/Profile.png')}
                                    />
                                <GreenButton
                                    title = "Change"
                                    onPress={() => console.log('Change Avatar pressed')}                                                                      
                                />
                                <GreenButton
                                    title = "Remove"
                                    onPress={() => console.log('Remove Avatar pressed')}
                                    disabled={true} // Disable for now, can be enabled later
                                    />
                                        
                            </View>

                            <Text style={styles.label}>First Name</Text>
                            <Text style={styles.input}>{userData.firstName}</Text>
                            <Text style={styles.label}>Last Name</Text>
                            {userData.lastName ? (
                                <Text style={styles.input}>{userData.lastName}</Text>
                            ) : (
                                <TextInput
                                    style={[
                                        styles.input,
                                        lastNameTouched && !isValidLastName(formData.lastName) && styles.inputError
                                    ]}
                                    value={formData.lastName}
                                    onChangeText={(text) => setFormData({...formData, lastName: text})}
                                    onBlur={() => setLastNameTouched(true)}
                                    placeholder="Enter your last name"
                                    clearButtonMode="always"
                                    />
                            )}                                                  
                            <Text style={styles.label}>Email</Text>
                            <Text style={styles.input}>{userData.email}</Text>
                            <Text style={styles.label}>Phone</Text>
                            {userData.phone ? (
                                <Text style={styles.input}>userData.phone</Text>
                            ):(
                                <TextInput
                                    style={[
                                        styles.input,
                                        phoneTouched && !isValidPhone(formData.phone) && styles.inputError
                                    ]}
                                    value={formData.phone}
                                    onChangeText={(text) => setFormData({...formData, phone:text})}
                                    onBlur={() => setPhoneTouched(true)}
                                    placeholder="Enter your phone number"
                                    clearButtonMode="always"
                                    />
                            )}
                            
                            
                        </View>

                        <View style={styles.footer}>
                            
                            <View style={styles.profilePicContainer}>
                                                         
                                <GreenButton
                                    title = "Cancel changes"
                                    onPress={() => console.log('Changed discarded')}                                                                      
                                />
                                <GreenButton
                                    title = "Save changes"
                                    onPress={() => console.log('Changes saved')}
                                    disabled={true} // Disable for now, can be enabled later
                                    />
                                        
                            </View>
                            
                            <YellowButton
                                
                                title="Logout"
                                onPress={handleLogout}
                            />
                        </View>                  
                       
                    </View>
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

    profilePicContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between',
        width: '100%',

        
    },

    profilePic: {
        width: 96,
        height: 96,
        borderRadius: 48,
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
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    
});
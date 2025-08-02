import {View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput} from 'react-native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { fonts, sizes } from '../styles/typography';
import { clearUserData, getUserData, storeUserData } from '../utils/storage';
import { useState } from 'react';
import { GreenButton } from '../components/Button';
import { notificationOptions, makeDefaultPrefs } from '../utils/notifications';
import EmailNotifications from '../components/EmailNotifications';
import Footer from '../components/Footer';
import * as ImagePicker from 'expo-image-picker';
import Avatar from '../components/Avatar'



export default function Profile({ userData, setUserData }) {

    //ImagePicker function
    const [profilePic, setProfilePic] = useState('')
    
    const selectProfilePic = async () => {
        // 1) Request permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Photo library access is required to select a profile picture.');
                return;
            }

        // 2) Launch picker with correct options
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        console.log('Picker result:', result);  
        
        // → { cancelled: false, uri: '...' }
        if (result.canceled) {
            console.log('User cancelled image pick');
            return;
        }
        const uri = result.assets[0].uri;

        const updatedUser = {
            ...userData,          // preserve all existing fields
            profilePic: uri,      // overwrite or add profilePic
        };

        try {
            await storeUserData(updatedUser);    
            const userUpdate = await getUserData();
            console.log('User data stored:', userUpdate);
            setUserData(userUpdate);
        } catch (error) {
                console.error('Failed to store user data:', error);
                alert('Something went wrong saving your profile picture.');
        }
    };

    const removeProfilePic = async () => {
        const updatedUser = {
            ...userData,          // preserve all existing fields
            profilePic: '',      // overwrite or add profilePic
        };

        try {
            await storeUserData(updatedUser);    
            const userUpdate = await getUserData();
            console.log('User data stored:', userUpdate);
            setUserData(userUpdate);
        } catch (error) {
                console.error('Failed to store user data:', error);
                alert('Something went wrong saving your profile picture.');
        }
    };
    
    // Form validation states
    const [lastNameTouched, setLastNameTouched] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);

    // Regular expressions for form validation
    const nameRegex = /^[a-zA-ZÀ-ÿ\u00C0-\u017F\s'-]+$/;
    const phoneRegex = /^(?:\+1\s?)?(?:\(?([2-9][0-9]{2})\)?[\s.-]?)([2-9][0-9]{2})[\s.-]?([0-9]{4})$/;

    // Form validation functions
    const isValidLastName = (lastName) => {
        return lastName.trim().length > 0 && nameRegex.test(lastName);
    };

    const isValidPhone = (phone) => {
        return phone.trim().length > 0 && phoneRegex.test(phone)};

    // Form state management
   const [formData, setFormData] = useState({        
        lastName: userData.lastName || '',
        phone:    userData.phone    || '',
        prefs:    userData.notificationPrefs || makeDefaultPrefs(),
        });
    
    // Toggle function for email notification preferences
    const togglePref = id => {
        setFormData(prev => ({
            ...prev,
            prefs: { ...prev.prefs, [id]: !prev.prefs[id] },
        }));
        };
        
    // Detect if we're in “onboarding” mode (no name & phone yet)
    const isOnboarding = !userData.lastName && !userData.phone;

    // Check if any pref actually changed
    const prefsChanged = Object.keys(formData.prefs).some(
        key => formData.prefs[key] !== (userData.notificationPrefs || {})[key]
    );

    // disabledSubmit logic for Submit and Cancel buttons
    const disabledSubmit = isOnboarding
        // onboarding: require valid name & phone
        ? !isValidLastName(formData.lastName) || !isValidPhone(formData.phone)
         // profile edit: require at least one pref change
        : !prefsChanged;
                  

    const handleSubmit = async () => {
        try{
          console.log('Form submitted:', formData);
          const user = {
            profilePic: userData.profilePic,
            firstName: userData.firstName,
            lastName: formData.lastName,
            email: userData.email,
            phone: formData.phone,
            notificationPrefs: formData.prefs,
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
    
    const handleCancel = () => {
        if (isOnboarding) {
            // Reset everything back to blank + default prefs
            setFormData({
                lastName: '',
                phone:    '',
                prefs:    makeDefaultPrefs(),
            });
        } else {
        // Only reset prefs to whatever’s stored in userData
        setFormData(prev => ({
            ...prev,
            prefs: userData.notificationPrefs || makeDefaultPrefs(),
        }));
        }

    // Clear any touched/validation flags
    setLastNameTouched(false);
    setPhoneTouched(false);
  };
        
    // Logout function
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

                            

                            <View style={styles.flexRowContainer}>
                            
                                <Avatar userData={userData} size={96}/>
                               
                                <GreenButton
                                    title = "Change"
                                    onPress={selectProfilePic}                                                                      
                                />
                                <GreenButton
                                    title = "Remove"
                                    onPress={removeProfilePic}
                                    disabled={userData.profilePic ? false : true} 
                                    />
                                        
                            </View>

                            <Text style={styles.label}>First Name</Text>
                            <Text style={styles.input}>{userData.firstName}</Text>
                            <Text style={styles.label}>Last Name*</Text>
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
                            <Text style={styles.label}>Phone*</Text>
                            {userData.phone ? (
                                <Text style={styles.input}>{userData.phone}</Text>
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

                            <EmailNotifications
                                options={notificationOptions}
                                prefs={formData.prefs}
                                onToggle={togglePref}
                                />

                        </View>

                        <View style={styles.submit}>
                            
                            <View style={styles.flexRowContainer}>
                                                         
                                <GreenButton
                                    title = "Cancel changes"
                                    onPress={handleCancel}
                                    disabled={disabledSubmit}                                                                      
                                />
                                <GreenButton
                                    title = "Save changes"
                                    onPress={handleSubmit}
                                    disabled={disabledSubmit} 
                                    />
                                        
                            </View>                          
                        </View>                                         
                    </View>
                    <Footer                                
                        title="Log out"
                        onPress={handleLogout}                        
                    />
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

    flexRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between',
        width: '100%',

        
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
    submit: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    
});
import {View, Text, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput} from 'react-native';
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
    const [firstNameTouched, setFirstNameTouched] = useState(false);
    const [lastNameTouched, setLastNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [phoneTouched, setPhoneTouched] = useState(false);

    // Regular expressions for form validation
    const nameRegex = /^[a-zA-ZÀ-ÿ\u00C0-\u017F\s'-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    // Phone regex for US numbers (can be adjusted for other formats)
    const phoneRegex = /^(?:\+1\s?)?(?:\(?([2-9][0-9]{2})\)?[\s.-]?)([2-9][0-9]{2})[\s.-]?([0-9]{4})$/;

    // Form validation functions
    const isValidFirstName = (firstName) =>
        firstName.trim().length > 0 && nameRegex.test(firstName);

    const isValidLastName = (lastName) => 
        lastName.trim().length > 0 && nameRegex.test(lastName);    

    const isValidEmail = (email) =>
        email.trim().length > 0 && emailRegex.test(email);

    const isValidPhone = (phone) => 
        phone.trim().length > 0 && phoneRegex.test(phone);
    

    // Form state management
   const [formData, setFormData] = useState({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        prefs: userData.notificationPrefs || makeDefaultPrefs(),
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

    // Check if any pref actually changed, will initially validate to true
    const prefsChanged = Object.keys(formData.prefs).some(
        key => formData.prefs[key] !== (userData.notificationPrefs || {})[key]
    );

    // disabledSubmit logic for Submit and Cancel buttons

    // Helper function to check if all fields are valid
    const allFieldsValid =
        isValidFirstName(formData.firstName) &&
        isValidLastName(formData.lastName) &&
        isValidEmail(formData.email) &&
        isValidPhone(formData.phone);
    
    // Determine if user has made any changes
    const hasChanged =
        formData.firstName !== userData.firstName ||
        formData.lastName !== userData.lastName ||
        formData.email !== userData.email ||
        formData.phone !== userData.phone ||
        (!isOnboarding && prefsChanged);
        

    const disabledSubmit = !allFieldsValid || !hasChanged;
    
    const disabledCancel = !hasChanged;

    console.log(`allFieldsValid: ${allFieldsValid}, hasChanged: ${hasChanged} prefsChanged: ${prefsChanged}`);
    console.log(`Disabled Submit: ${disabledSubmit}, Disabled Cancel: ${disabledCancel}`);
    

    const handleSubmit = async () => {
        try {
            const user = {
            profilePic: userData.profilePic,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            notificationPrefs: formData.prefs,
            isLoggedIn: true,
            };

            await storeUserData(user);
            const userUpdate = await getUserData();
            setUserData(userUpdate);
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };
    
    const handleCancel = () => {
        setFormData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            phone: userData.phone || '',
            prefs: userData.notificationPrefs || makeDefaultPrefs(),
        });

        setFirstNameTouched(false);
        setLastNameTouched(false);
        setEmailTouched(false);
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
            
            <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={80} // Adjust if header is overlapping
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

                            <Text style={styles.label}>First Name*</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    firstNameTouched && !isValidFirstName(formData.firstName) && styles.inputError,
                                ]}
                                value={formData.firstName}
                                onChangeText={(text) => setFormData({...formData, firstName: text})}
                                onBlur={() => setFirstNameTouched(true)}
                                placeholder="Enter your first name"
                                clearButtonMode="always"
                            />

                            <Text style={styles.label}>Last Name*</Text>
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
                                                 
                            <Text style={styles.label}>Email*</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    emailTouched && !isValidEmail(formData.email) && styles.inputError,
                                ]}
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                onBlur={() => setEmailTouched(true)}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                clearButtonMode="always"
                            />

                            <Text style={styles.label}>Phone*</Text>                                                           
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
                                keyboardType="default"
                                />
                            

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
                                    disabled={disabledCancel ? true : false}                                                                      
                                />
                                <GreenButton
                                    title = "Save changes"
                                    onPress={handleSubmit}
                                    disabled={disabledSubmit ? true : false} 
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
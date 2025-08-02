import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { useState } from 'react';
import { fonts, sizes, textCase } from '../styles/typography';
import { storeUserData, getUserData } from '../utils/storage';
import Footer from '../components/Footer'



export default function Onboarding({ userData, setUserData }) {
  

  
  const [formData, setFormData] = useState({
    firstName: '',    
    email: '',
  });
  
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  
  const [emailTouched, setEmailTouched] = useState(false);

  const nameRegex = /^[a-zA-ZÀ-ÿ\u00C0-\u017F\s'-]+$/;

  const isValidFirstName = (firstName) => {
    return firstName.trim().length > 0 && nameRegex.test(firstName);
  };

  const isValidEmail = (email) => {
    return email.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const disabled = !isValidFirstName(formData.firstName) ||
                  !isValidEmail(formData.email);

  const handleSubmit = async () => {
    try{
      console.log('Form submitted:', formData);
      const user = {
        profilePic: '',
        firstName: formData.firstName,
        lastName: '', // lastName is not required in this step
        email: formData.email,
        phone: '', // phone is not required in this step
        isLoggedIn: true
      };
      console.log('User data to be stored:', user);

      await storeUserData(user);
      const userUpdate = await getUserData();
      console.log('User data stored:', userUpdate);
      setUserData(userUpdate); //updates state across screens
      
           
  } catch (error) {
    console.error('Failed to submit form:', error);
  }
};

  return (
    <View style={styles.container} >
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

          <Hero />      
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>CREATE AN ACCOUNT</Text>
            
            <View style={styles.form}>
              <Text style={styles.label}>First Name*</Text>              
              <TextInput
                style={[
                  styles.input,
                  firstNameTouched && !isValidFirstName(formData.firstName) && styles.inputError
                ]}
                value={formData.firstName}
                onChangeText={(text) => setFormData({...formData, firstName: text})}
                onBlur={() => setFirstNameTouched(true)}
                placeholder="Enter your first name"
                clearButtonMode="always"
              />                      
              <Text style={styles.label}>Email Address*</Text>
              <TextInput
                style={[
                  styles.input,
                  emailTouched && !isValidEmail(formData.email) && styles.inputError
                ]}
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                placeholder="Enter your email"
                onBlur={() => setEmailTouched(true)}
                keyboardType="email-address"
                clearButtonMode="always"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer                                
        title="Submit"
        onPress={handleSubmit} 
        disabled={disabled}                       
        />
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
  
 
});
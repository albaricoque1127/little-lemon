import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { useState } from 'react';
import { fonts, sizes, textCase } from '../styles/typography';
import { storeUserData, getUserData } from '../utils/storage';



export default function Onboarding({ isLoggedIn, setIsLoggedIn }) {
  

  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [pressed, setPressed] = useState(false); // State to track button press

  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const nameRegex = /^[a-zA-ZÀ-ÿ\u00C0-\u017F\s'-]+$/;

  const isValidFirstName = (firstName) => {
    return firstName.trim().length > 0 && nameRegex.test(firstName);
  };

  const isValidLastName = (lastName) => {
    return lastName.trim().length > 0 && nameRegex.test(lastName);
  };

  const isValidEmail = (email) => {
    return email.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const disabled = !isValidFirstName(formData.firstName) ||
                  !isValidLastName(formData.lastName) ||
                  !isValidEmail(formData.email);

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

      setIsLoggedIn(true);
  } catch (error) {
    console.error('Failed to submit form:', error);
  }
};

  return (
    <View style={styles.container} >
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
      <View style={styles.footer}>
        <Pressable
            disabled={disabled}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            style={({ pressed: isPressing }) => [
                styles.button,
                disabled
                ? styles.disabled
                : pressed
                ? styles.clicked
                : styles.untouched,
            ]}
            onPress={(formData.firstName && formData.lastName && formData.email) ? handleSubmit : null}
            >
            <Text style={styles.buttonText}>
                Next
            </Text>
        </Pressable>
      </View>
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
  footer: {
    paddingHorizontal: 25,
    paddingVertical: 24,
    backgroundColor: '#495E57',
    alignItems: 'center',
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
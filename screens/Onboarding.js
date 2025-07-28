import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { useState } from 'react';
import { fonts, sizes, textCase } from '../styles/typography';

export default function Onboarding({ user }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [pressed, setPressed] = useState(false);
  const disabled = !formData.firstName || !formData.lastName || !formData.email;

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <View style={styles.container}>
      <Header user={user} />
      <ScrollView style={styles.scrollView}>
        <Hero />      
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>CREATE AN ACCOUNT</Text>
          
          <View style={styles.form}>
            <Text style={styles.label}>First Name*</Text>
            <TextInput
              style={styles.input}
              value={formData.firstName}
              onChangeText={(text) => setFormData({...formData, firstName: text})}
              placeholder="Enter your first name"
            />

            <Text style={styles.label}>Last Name*</Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(text) => setFormData({...formData, lastName: text})}
              placeholder="Enter your last name"
            />

            <Text style={styles.label}>Email Address*</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>
        </View>
      </ScrollView>
      
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
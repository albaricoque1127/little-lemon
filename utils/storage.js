// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async (user) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('user-info', jsonValue);
  } catch (e) {
    console.error('Error saving user info', e);
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user-info');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error loading user info', e);
    return null;
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('user-info');
  } catch (e) {
    console.error('Error clearing user info', e);
  }
};

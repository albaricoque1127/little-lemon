import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

export default function RootNavigator({ userData, setUserData }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userData.isLoggedIn ? (
        <Stack.Screen name="Profile">
          {props => 
            <Profile 
              {...props}               
              userData={userData}
              setUserData={setUserData} 
              
            />
          }
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Onboarding">
          {props => 
            <Onboarding
              {...props} 
              userData={userData}
              setUserData={setUserData}
            />
          }
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
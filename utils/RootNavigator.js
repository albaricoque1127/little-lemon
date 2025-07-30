import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

export default function RootNavigator({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Profile">
          {props => 
            <Profile 
              {...props} 
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn} 
            />
          }
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Onboarding">
          {props => 
            <Onboarding
              {...props} 
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
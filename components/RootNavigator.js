import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import Profile from '../screens/Profile';
import Menu from '../screens/Menu';
import Header from './Header';

const Stack = createNativeStackNavigator();

function AuthStack({ userData, setUserData }) {
  return (
    <Stack.Navigator 
      screenOptions={({ navigation }) => ({
        header: ({back}) => (
          <Header navigation={navigation} userData={userData} canGoBack={back} />
        ),
      })}>
      <Stack.Screen name="Onboarding">
        {props => (
          <Onboarding
            {...props}
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

function AppStack({ userData, setUserData }) {
  return (
    <Stack.Navigator 
      initialRouteName="Menu" 
      screenOptions={({ navigation }) => ({
        header: ({back}) => (
          <Header navigation={navigation} userData={userData} canGoBack={back} />
        ),
      })}
    >
      <Stack.Screen name="Menu">
        {props => (
          <Menu
            {...props}
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Profile">
        {props => (
          <Profile
            {...props}
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </Stack.Screen>
      {/* more logged-in screens */}
    </Stack.Navigator>
  )
}

export default function RootNavigator({ userData, setUserData }) {
  return (
    <>
      {userData.isLoggedIn
        ? <AppStack userData={userData} setUserData={setUserData}/>
        : <AuthStack userData={userData} setUserData={setUserData}/>}
    </>
  )
};
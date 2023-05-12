import React from 'react';
import { useFonts } from 'expo-font';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from './src/navigation/AuthStack';
import { AuthProvider } from './src/context/Auth';
import AppNav from './src/navigation/AppNav';
//import AppStack from './src/navigation/AppStack';

function App() {

  const [fontsLoaded] = useFonts({
    'Roboto-MediumItalic': require('./src/assets/fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
    'Inter-Bold': require('./src/assets/fonts/Inter-Bold.ttf'),

  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AppNav></AppNav>
    </AuthProvider>
  );
}

export default App;
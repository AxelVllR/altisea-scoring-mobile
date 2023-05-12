import { NavigationContainer } from '@react-navigation/native';
import React, {useContext, useEffect} from "react";
import AuthStack from "./AuthStack";
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { View } from 'react-native-animatable';
import AppStack from './AppStack';
import { Loading } from '../components/Loading';
import { useAuth } from '../context/Auth';

function AppNav() {
  const {authData, loading} = useAuth();

  if (loading) {
    return <Loading />;
  }
  //const {isLoading, userToken, getUserProfile} = useContext(AuthContext)

  /*if(isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }*/


  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack /> }
    </NavigationContainer>
  )
}

export default AppNav
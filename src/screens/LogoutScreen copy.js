import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import LoginSVG from '../assets/images/misc/login.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';
import RepsButton from '../components/RepsButton';
import { addReps, getActiveCompetition } from '../api';
import { useAuth } from '../context/Auth';
import { ERRORS } from '../api/utils/errors.enum';

function LogoutScreen({navigation}) {
  const [competition, setCompetition] = useState({});
  const [isLoading, setIsLoading] = useState({});

  const auth = useAuth();
  const profile = auth.authData;

  const signOut = () => {
    console.log('sign out')
    auth.signOut();
  };

  useEffect(() => {
    getCompetition()
  }, [])

  async function addRepsApi() {
    await addReps(profile.token, 50);
  }

  async function getCompetition() {
    try {
      setIsLoading(true);
      const {data} = await getActiveCompetition(profile.token);
      console.log(data);
      setCompetition(data)
      setIsLoading(false);
    } catch(e) {
      console.log(e.message)
      if(e.message == ERRORS.JWT_EXPIRED) {
        signOut();
      }
    }
  }




  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Bienvenue {profile.firstname} !</Text>
        <RepsButton label={"+1"} onPress={() => { addRepsApi() }}/>
        <CustomButton label={"Logout"} onPress={signOut} />
    </SafeAreaView>
  );
};

export default LogoutScreen;
import React, {useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
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
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Image } from 'expo-image';
import { useAuth } from '../context/Auth';

function LoginScreen({navigation}) {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const signIn = async () => {
    isLoading(true);
    await auth.signIn(user);
    isLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View  style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo.png')}
            placeholder='logo altisea'
          />
        </View>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Connexion Juge
        </Text>

        <InputField
          label={'Email'}
          icon={
            <MaterialIcons
            name="alternate-email"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          value={user.email}
          onChangeText={text => setUser({
            email: text,
            password: user.password
          })}
          keyboardType="email-address"
        />

        <InputField
          label={'Mot de Passe'}
          icon={
            <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          }
          value={user.password}
          onChangeText={text => setUser({
            email: user.email,
            password: text
          })}
          inputType="password"
        />
        
        <CustomButton label={"Se connecter"} isLoading={loading}  onPress={() => { signIn() }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginBottom: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default LoginScreen;
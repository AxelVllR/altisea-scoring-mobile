import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Gaming from '../assets/images/misc/gaming.svg';
import { Image } from 'expo-image';

function OnboardingScreen({navigation}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            fontWeight: 'bold',
            fontSize: 30,
            color: '#20315f',
          }}>
          Altisea Scoring
        </Text>
      </View>
      <Image
          style={{width:200, height: 200, marginBottom: 25, marginTop: 25}}
          source={require('../assets/images/logo.png')}
          placeholder='logo altisea'
        />
      <TouchableOpacity
        style={{
          backgroundColor: '#AD40AF',
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Roboto-MediumItalic',
          }}>
          Espace Juge
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
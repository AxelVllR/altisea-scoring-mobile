import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function RepsButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'cornflowerblue',
        padding: 50,
        borderRadius: 10,
        marginBottom: 30,
        width: "80%"
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 50,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

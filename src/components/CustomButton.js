import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native';
export default function CustomButton({label, onPress, isLoading}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#AD40AF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
        { isLoading ? 
          <ActivityIndicator animating={true} />
          :
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 16,
              color: '#fff',
            }}>
            {label}
          </Text> 
        }
    </TouchableOpacity>
  );
}

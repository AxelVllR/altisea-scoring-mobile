import {Text} from 'react-native';
import React from 'react';
import COLORS from '../consts/colors';

export default function Alert({label}) {
  return (
    <Text
        style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 16,
            color: COLORS.white,
            backgroundColor: COLORS.red,
            padding: 10,
        }}>
        {label}
    </Text> 
  );
}

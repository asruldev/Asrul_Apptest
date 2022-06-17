import React from 'react';
import {Text, View} from 'react-native';

export default function Loading() {
  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Loading....</Text>
    </View>
  );
}

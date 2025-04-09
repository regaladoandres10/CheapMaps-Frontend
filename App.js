import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import icon from './assets/icon.png'
import { HeaderTitle } from '@react-navigation/elements';
//const icon = require("./assets/icon.png")

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="black" />
      <Text style={{color: '#000', fontSize:50}}> Cheap Maps </Text>
      <Image 
      source={{ 
        uri:'https://www.iconsdb.com/icons/preview/white/buy-xxl.png'
      }} 
      style={{
        width:100, height:100
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
    margin: 20 
  },
  
});



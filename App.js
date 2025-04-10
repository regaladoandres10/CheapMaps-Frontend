import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
//import { useNavigation } from '@react-navigation/native';

const icon = require('./assets/Logo.jpeg');

export default function App() {
  const [showImage, setShowImage] = useState(true);
  //const navigation = useNavigation();

  useEffect(() => {
    // Después de 3 segundos cambiar de Pantalla
    const timer = setTimeout(() => {
      setShowImage(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {showImage ? (
        <Image source={icon} style={styles.image} />
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>Cheap Maps</Text>
          <Image 
            source={{ uri: 'https://www.iconsdb.com/icons/preview/white/buy-xxl.png' }} 
            style={styles.icon} 
          />
        </View>
      )}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  image: {
    width: 500, 
    height: 500, 
    resizeMode: 'contain',
  },
  title: {
    color: '#fff', 
    fontSize: 50,
    marginBottom: 20
  },
  icon: {
    width: 100,
    height: 100,
  }
});
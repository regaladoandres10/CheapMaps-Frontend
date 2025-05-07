import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text} from 'react-native';


const Home = () => {
    return (
      <View style={styles.container}>
        <Text> Mapa </Text>
        <MapView style={styles.map} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center', 
      alignItems:'center', 
      backgroundColor: '#fff'
    },
    map: {
      width: '80%',
      height: '50%',
    },
  });

export default Home;
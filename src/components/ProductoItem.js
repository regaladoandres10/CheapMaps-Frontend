import React from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';


 const ProductoItem = ({nombre, ubicacion, precio, imagen, navigation, tienda}) => {

    const onPress = () => {
      navigation.navigate('Home')
    };

    return(

<View style={style.container}>
  <Image style={style.imagen} source={{ uri: imagen }} />

  <View style={style.infoContainer}>
    <Text style={style.precio}>${precio}</Text>
    <Text style={style.text}>{nombre}</Text>
    <Text style={style.text}>{tienda}</Text>
    <Text style={style.textUbicacion}>{ubicacion}</Text>
  </View>

  <View style={style.ubicacionContainer}>
    <TouchableOpacity style={style.buttonMap} onPress={onPress}>
      <FontAwesome name="map-marker" size={60} color="silver" />
    </TouchableOpacity>
  </View>
</View>


    );
}
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    borderRadius: 12,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5
  },
  imagen: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  ubicacionContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  text: {
    color: '#444',
    fontSize: 15,
    marginBottom: 2
  },
  textUbicacion: {
    color: '#777',
    fontSize: 14,
    marginTop: 2
  },
  precio: {
    color: '#222',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4
  },
  buttonMap: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 0
  }
});
export default ProductoItem;
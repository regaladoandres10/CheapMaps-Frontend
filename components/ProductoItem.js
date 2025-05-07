import React from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';


 const ProductoItem = ({nombre, ubicacion, precio, imagen, navigation}) => {

    const onPress = () => {
      navigation.navigate('Home')
    };

    return(

            <View style={style.container}>
                <Image style={style.imagen} source={{uri: imagen}}/>
                <Text style={style.text}> {nombre} </Text>
                <Text style={style.text}> {ubicacion} </Text>
                <Text style={style.text}> ${precio} </Text>
                <TouchableOpacity style={style.buttonMap} onPress={onPress}>
                  <FontAwesome name="map-marker" size={24} color="black" />
                </TouchableOpacity>
                {/* - Calificacion: con sus respectivo puntaje 
                    - Boton de ubicacion
                */}
            </View>

    );
}

const style = StyleSheet.create({

    container: {
        padding: 10,
        backgroundColor: '#333',
        marginVertical: 5,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center'
      },
      text: {
        color: 'white',
        fontSize: 17
      },
      imagen: {
        width:50,
        height:50,
      },
      buttonMap: {
        backgroundColor: '#fff'
      }
});

export default ProductoItem;
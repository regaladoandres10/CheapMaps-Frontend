import React from 'react'
import {View, Image, Text, StyleSheet} from 'react-native'


export function ProductoItem({nombre, ubicacion, precio, imagen}) {
    return(

            <View style={style.container}>
                <Image style={style.imagen} source={{uri: imagen}}/>
                <Text style={style.text}> {nombre} </Text>
                <Text style={style.text}> {ubicacion} </Text>
                <Text style={style.text}> ${precio} </Text>
                
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
      }
});
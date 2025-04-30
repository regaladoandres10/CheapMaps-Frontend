import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper'
import {ProductoItem} from './components/ProductoItem.js'
import { ScrollView } from 'react-native-web';

export default function App() {

  const [searchQuery, setSearchQuery] = useState('')
  //mostrar/ocultar resultados
  const [mostrarResultados, setMostrarResultados] = useState(false)

  useEffect(() => {
    //El codigo que quiero que corra
    console.log(searchQuery)
    console.log(mostrarResultados)
    //opcional return
  },[searchQuery, mostrarResultados])//El arreglo de dependencia

  function handleSearchSubmit() {
    setMostrarResultados(true)
    console.log("motrar", mostrarResultados) 
  }


  //Productos

  const productos = [
    {id: 1, nombre: 'Leche', ubicacion: 'Tienda la Soledad', precio: 20.00, imagen: 'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750649501422L.jpg'},
    {id: 2, nombre: 'Coca cola', ubicacion: 'Tienda la Joya', precio: 15.00, imagen: 'https://static.vecteezy.com/system/resources/previews/037/751/381/non_2x/coca-cola-plastic-bottle-isolated-on-transparent-background-free-png.png'},
    {id: 3, nombre: 'Doritos', ubicacion: 'Tienda la Dalia', precio: 15.00, imagen: 'https://w7.pngwing.com/pngs/391/563/png-transparent-nachos-cheese-fries-doritos-tortilla-chip-corn-chip-corn-chip-food-cheese-snack-thumbnail.png'},
    {id: 4, nombre: 'Cafe', ubicacion: 'Tienda Raul Ramirez', precio: 30.00, imagen: 'https://c0.klipartz.com/pngpicture/272/17/sticker-png-instant-coffee-tea-nescafe-cappuccino-coffee-food-tea-coffee-ristretto-caffeine-thumbnail.png'},
    {id: 5, nombre: 'Papel de baño', ubicacion: 'Tienda Tecnlogico', precio: 5.00, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLX4j7aY6sy1-gPJq5MlMk09tuBd7yNdL1Yg&s'},
  ]

  let buscarProductos = mostrarResultados ? productos.filter( (producto) => producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())) : []
  
  return (
        <View style={mostrarResultados ? styles.contentResult : styles.content}>
          <Text style={mostrarResultados ? styles.titleResult : styles.title}> Cheap Maps </Text>
          {/* Colocando el buscador */}
          <Searchbar
            placeholder = 'Buscar producto...'
            onChangeText = {setSearchQuery}
            value = {searchQuery}
            style = { mostrarResultados ? styles.searchResult : styles.search}
            //hacer la programacion que haga que se muestren los resultados
            onSubmitEditing={handleSearchSubmit}
          />
          {/* Preguntamos si ya recorrio la lista  */}
          {buscarProductos.length > 0 && ( 
              <FlatList 
                //Le pasamos el arreglo
                data= {buscarProductos}
                //El id de cada elemento
                keyExtractor={item => item.id}
                //Mostramos el componente de productoItem
                renderItem={({item}) => (
                  <ProductoItem 
                    nombre = {item.nombre}
                    ubicacion = {item.ubicacion}
                    precio = {item.precio}
                    //imagen={item.imagen}
                  />
                ) }
                style = {{width: '100%'}}
              />
          )}
          {/* Recorre la lista de productos */}



          {/* Componente de cada producto 
        
          */}
        </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    //Centrar todo los componentes
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  search: {
    width: '90%',
    padding: 8
  },
  contentResult: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingLeft: 15,
  },
  titleResult: {
    marginTop: 40,
    marginBottom: 15,
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    //textAlign: 'left'
  },
  searchResult: {
    width: '95%',
    marginBottom: 10,
  }

});
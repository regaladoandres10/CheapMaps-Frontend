import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper'
import {ProductoItem} from './components/ProductoItem.js'
import { ScrollView } from 'react-native-web'
import axios from 'axios'

export default function App() {

  const [searchQuery, setSearchQuery] = useState('')

  //mostrar/ocultar resultados
  const [mostrarResultados, setMostrarResultados] = useState(false)

  const [producto, setProducto] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Cambiar la IP cuando cambie de dispositivo
    axios.get("http://172.20.10.2:8000/api/productos/")
    .then((Response) => {
      //Me devuelve el JSON con todos los productos
      setProducto(Response.data)
      setLoading(false)
      //Los muestro en consola
      console.log("Los productos son", producto)
    }
  )
    
    //Muestra el error en caso de que no haya encontrado la URL
    .catch((err) => {
      console.log(err)
      setLoading(false)
    } )
  }, [])

  useEffect(() => {
    //El codigo que quiero que corra
    console.log(searchQuery)
    console.log(mostrarResultados)
    //opcional return
  },[searchQuery, mostrarResultados])//El arreglo de dependencia

  function handleSearchSubmit() {
    setMostrarResultados(true)
    console.log("mostrar", mostrarResultados) 
  }


  let buscarProductos = mostrarResultados ? producto.filter( (p) => p.nombre.toLowerCase().includes(searchQuery.toLowerCase())) : []
  
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
    //paddingLeft: 15,
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
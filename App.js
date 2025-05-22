import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, FlatList, TextInput, Alert } from 'react-native';
import { Searchbar } from 'react-native-paper'
import ProductoItem from './components/ProductoItem.js'

import axios from 'axios'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapView from 'react-native-maps';

//Importar la configuracion de la API
import config from './config.js'

const Stack = createNativeStackNavigator();

const App = () => {
  
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          component={Main} 
          name="Buscador" 
          options={{headerShown:false}}
        />
        <Stack.Screen 
          component={Home} 
          name="Home" 
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const Main = ({navigation}) => {

  const [searchQuery, setSearchQuery] = useState('')

  //mostrar/ocultar resultados
  const [mostrarResultados, setMostrarResultados] = useState(false)

  const [producto, setProducto] = useState([])
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    axios.get(`${config.api.baseUrl}/api/productos/`)
    .then((response) => {
      //console.log("Respuesta completa:", response); // Verifica toda la respuesta
      console.log("Datos recibidos:", response.data); // Verifica específicamente los datos
      
      if (response.data && response.data.length > 0) {
        setProducto(response.data);
      } else {
        console.warn("La API respondió pero no hay datos");
      }
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error en la solicitud:", err);
      setLoading(false);
    });
}, []);

  useEffect(() => {
    //El codigo que quiero que corra
    console.log(searchQuery)
    console.log(mostrarResultados)
    console.log("Los productos son", buscarProductos)

    //opcional return
  },[searchQuery, mostrarResultados, buscarProductos])//El arreglo de dependencia

  function handleSearchSubmit() {
    
    //console.log("Data", producto)
    
    //Validaciones

    //Validando busqueda vacia
    if(!searchQuery.trim()) {
      Alert.alert("Error", "Por favor ingresa un producto", [ { text: "OK", onPress: () => console.log("OK pressed") } ]);
      setMostrarResultados(false)
      return;
    }

    //Validar caracteres especiales

    //const resultados = buscarProductos(searchQuery)
    setMostrarResultados(true)
 
  }

  let buscarProductos = mostrarResultados ? producto.filter( (p) => p.nombre.toLowerCase().includes(searchQuery.toLowerCase())) : []
  
  return (
        <View style={mostrarResultados ? styles.contentResult : styles.content}>
          <Text style={mostrarResultados ? styles.titleResult : styles.title}> Cheap Maps </Text>
          {/* Colocando el buscador */}
          <Searchbar
            placeholder = 'Buscar producto'
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
                data= {mostrarResultados ? buscarProductos : producto}
                //El id de cada elemento
                keyExtractor={item => item.id}
                //Mostramos el componente de productoItem
                renderItem={({item}) => (
                  <ProductoItem 
                    nombre = {item.nombre}
                    ubicacion = {item.precios[0]?.tienda?.direccion || 'Direccion no disponible'}
                    precio = {item.precios[0]?.precio}
                    tienda = {item.precios[0]?.tienda?.nombre}
                    imagen={item.imagen_url}
                    navigation={navigation}
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
  },
  map: {
    width: '80%',
    height: '50%',
  },
  containerMap: {
    flex: 1, 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor: '#fff'
  },
  textInput: {
    padding: 10,
  },

});

//Componente del mapa

const Home = () => {
  return (
    <View style={styles.containerMap}>
        <Text> Mapa </Text>
        <MapView style={styles.map} />
    </View>
  );
}

export default App;
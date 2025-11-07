import React, { useEffect, useState, useRef } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from "react-native-paper";
import ProductoItem from "./components/ProductoItem.js";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapView, { Marker } from "react-native-maps";

//Importar la configuracion de la API
import config from "./config.js";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Main}
          name="Buscador"
          options={{ headerShown: false }}
        />
        <Stack.Screen component={Home} name="Home" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Main = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  //mostrar/ocultar resultados
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const [producto, setProducto] = useState([]);
  const [loading, setLoading] = useState(true);

  const inputRef = useRef(null);

  //Función para limpiar el buscador
  const limpiarBuscador = () => {
    if (inputRef.current) {
      inputRef.current.clear();
    }
  };

  useEffect(() => {
    axios
      .get(`${config.api.baseUrl}/api/productos/`)
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
    console.log(searchQuery);
    console.log(mostrarResultados);
    console.log("Los productos son", buscarProductos);

    //opcional return
  }, [searchQuery, mostrarResultados, buscarProductos]); //El arreglo de dependencia

  function handleSearchSubmit() {
    const searchQueryTrimmed = searchQuery.trim();

    //Validaciones

    //Validando busqueda vacia
    if (!searchQuery.trim()) {
      Alert.alert("Error", "Por favor ingresa un producto.", [
        { text: "OK", onPress: () => console.log("OK pressed") },
      ]);
      setMostrarResultados(false);
      return;
    }

    //Hacer que no busque una cadena con un espacio al inicio
    // Validar que no empiece con espacio
    if (/^\s/.test(searchQuery)) {
      Alert.alert("Error", "Nombre del producto no valido.", [
        { text: "OK", onPress: () => console.log("OK pressed") },
      ]);
      setMostrarResultados(false);
      return;
    }

    /*
      Se buscará producto con cadena que contiene carácter + espacio + número
    */

    //Validar caracteres especiales y tambien permitir mas de un espacio en el texto
    // Validar formato: "Texto (mínimo 2 letras) + Espacio + Número"
    // Validar formato: texto (mínimo 2 letras) + número opcional
    if (
      !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}(?:\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*(?:\s\d+)?$/.test(
        searchQueryTrimmed
      )
    ) {
      Alert.alert("Error", "Nombre del producto no valido.");
      setMostrarResultados(false);
      return;
    }

    //const resultados = buscarProductos(searchQuery)
    setMostrarResultados(true);
  }

  let buscarProductos = mostrarResultados
    ? producto.filter((p) =>
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <View style={styles.mostrarResultados ? styles.contentResult : styles.content}>
      <Text style={mostrarResultados ? styles.titleResult : styles.title}>
        {" "}
        Cheap Maps{" "}
      </Text>
      {/* Colocando el buscador */}
      <Searchbar
        //Validando el campo de busqueda
        ref={inputRef}
        maxLength={50}
        placeholder="Buscar producto"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.mostrarResultados ? styles.searchResult : styles.search}
        //hacer la programacion que haga que se muestren los resultados
        onSubmitEditing={handleSearchSubmit}
      />
      {/* Preguntamos si ya recorrio la lista  */}
      {buscarProductos.length > 0 && (
        <FlatList
          //Le pasamos el arreglo
          data={mostrarResultados ? buscarProductos : producto}
          //El id de cada elemento
          keyExtractor={(item) => item.id}
          //Mostramos el componente de productoItem
          renderItem={({ item }) => (
            <ProductoItem
              nombre={item.nombre}
              ubicacion={
                item.precios[0]?.tienda?.direccion || "Direccion no disponible"
              }
              precio={item.precios[0]?.precio}
              tienda={item.precios[0]?.tienda?.nombre}
              imagen={item.imagen_url}
              navigation={navigation}
            />
          )}
          style={{ width: "100%" }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9", // gris muy claro
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  search: {
    width: "90%",
    padding: 0,
    backgroundColor: "#fff",
    borderRadius: 40,
    elevation: 2, // sombra en Android
    shadowColor: "#000", // sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentResult: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    //paddingLeft: 15,
  },
  titleResult: {
    marginTop: 40,
    marginBottom: 15,
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
  },
  searchResult: {
    width: "90%",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 40,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  map: {
    width: "80%",
    height: "40%",
    borderRadius: 12,
    overflow: "hidden",
  },
  containerMap: {
    flex: 1,
    //justifyContent:'center',
    alignItems: "center",
    backgroundColor: "#fff",
    //backgroundColor: '#000'
  },
  textInput: {
    //position: 'absolute', //Para fijarlo en la pantalla
    top: 10,
    width: "80%",
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    //marginBottom: 30,
  },
  buttonPublicar: {
    //alignItems: 'center',
    backgroundColor: "#1B396B",
    borderRadius: 15,
    marginColor: "#333",
    width: "80%",
    padding: 10,
    top: 20,
  },
  textPublicar: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});

//Componente del mapa

const Home = () => {
  //Arreglo de palabras ofensivas
  const palabrasOfensivas = [
    "Tonto",
    "tonto",
    "Tonta",
    "tonta",
    "Inutil",
    "inutil",
    "Menso",
    "menso",
    "Mensa",
    "mensa",
    "Estupido",
    "estupido",
    "Estupida",
    "estupida",
    "Baboso",
    "baboso",
    "Babosa",
    "babosa",
  ];

  function contienePalabrasOfensivas(texto, palabrasProhibidas) {
    const textoLimpio = texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return palabrasProhibidas.some((palabra) => {
      const palabraLimpia = palabra
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      //Usa una expresión regular para coincidir con la palabra completa
      const regex = new RegExp(`\\b${palabraLimpia}\\b`, "i");
      return regex.test(textoLimpio);
    });
  }

  //Colocando cada estado
  const [review, setReview] = useState("");

  //useEffect para la reseña

  useEffect(() => {
    console.log("Lo que se escribe en resenia es:", review);
  }, [review]);

  function handleReviewSubmit() {
    const trimmedReview = review.trim();
    //Validaciones

    //Validando espacios
    if (/^\s+$/.test(review)) {
      Alert.alert("Error", "Por favor, ingresa tu opinión sobre el producto.");
      return;
    }

    //Validando que no este vacio
    if (!trimmedReview) {
      Alert.alert("Error", "Por favor, ingresa tu opinión sobre el producto.");
      return;
    }

    //Validando la longitud < 10
    if (trimmedReview.length < 10) {
      Alert.alert("Error", "El valor minimo de caracteres es 10.");
      return;
    }

    //Validando la longitud > 100
    if (trimmedReview.length > 100) {
      Alert.alert(
        "Error",
        "Haz excedido el número de caracteres, el máximo es 100."
      );
      return;
    }

    //Validando caracteres permitidos
    if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,;¿?¡!()\-–—:]+$/.test(trimmedReview)) {
      Alert.alert(
        "Error",
        "Solo se permiten letras, números y signos de puntuación básicos."
      );
      return;
    }

    //Validando palabras ofensivas
    if (contienePalabrasOfensivas(trimmedReview, palabrasOfensivas)) {
      Alert.alert(
        "Error",
        "Reseña no publicada. No cumple con las políticas de CheapMaps",
        [{ text: "OK" }]
      );
      return;
    }

    //Si las validaciones no se cumplan
    Alert.alert("Éxito", "Reseña publicada correctamente");
    console.log("Reseña a publicar:", trimmedReview);
  }

  return (
    <View style={styles.containerMap}>
      <Text> Esta es la ruta: </Text>
      {/* 
          Modificar la latitudeDelta y longitudeDelta
          - 0.001 Vista muy cercana
          - 0.005 Mostrar un barrio o punto de interes.
          - 0.05 Mostrar ciudades pequeñas o zona amplia
          - 0.5 vista muy lejana
        */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20.1355,
          longitude: -101.1823,
          latitudeDelta: 0.0019, //Zoom
          longitudeDelta: 0.0019,
        }}
      >
        <Marker
          coordinate={{ latitude: 20.1355, longitude: -101.1823 }}
          //20.135503377595736, -101.18239708412416
          title="Bodega Aurrera"
        />
      </MapView>
      {/* Colocando el TextArea  */}
      <TextInput
        minLength={10}
        maxLength={105}
        onChangeText={setReview}
        value={review}
        editable
        //multiline
        numberOfLines={4}
        style={styles.textInput}
        placeholder="Escribe tu reseña aquí..."
      />

      {/* Colocar boton publicar para la reseña */}
      <TouchableOpacity
        style={styles.buttonPublicar}
        onPress={handleReviewSubmit}
      >
        <Text style={styles.textPublicar}> Publicar </Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

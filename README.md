El codigo se corre con el siguiente comando: npx expo start --tunnel
También puede ejecutarse desde un emulador de android como Android Studio.

Librerias con NPM (para el proyecto):
React native paper:
import { Searchbar } from 'react-native-paper'

AXIOS:
import axios from 'axios'

Reac native navigation:
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

React native maps:
import MapView from 'react-native-maps';

Para poder utilizar la API desde Django REST FRAMEWORK:
1. Correr el servidor desde Django REST FRAMEWORK: python manage.py runserver 0.0.0.0:8000
2. cambiar en la siguiente linea de codigo nuestra IP local (de nuestra computadora):
   axios.get("http://192.168.1.68:8000/api/productos/")

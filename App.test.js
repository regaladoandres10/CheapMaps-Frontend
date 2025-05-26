// App.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { Main, Home } from './App';
import axios from 'axios';

jest.mock('axios');
jest.spyOn(Alert, 'alert');

describe('Main Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: '1',
          nombre: 'Leche',
          precios: [
            {
              precio: 15,
              tienda: {
                direccion: 'Calle A',
                nombre: 'Tienda A',
              },
            },
          ],
          imagen_url: 'http://img.com/leche.png',
        },
      ],
    });
  });

  it('muestra alerta si búsqueda está vacía', async () => {
    const { getByPlaceholderText } = render(<Main navigation={{}} />);
    const input = getByPlaceholderText('Buscar producto');
    fireEvent.changeText(input, '');
    fireEvent(input, 'submitEditing');
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Por favor ingresa un producto.',
        [{ text: 'OK', onPress: expect.any(Function) }]
      );
    });
  });

  it('muestra alerta si empieza con espacio', async () => {
    const { getByPlaceholderText } = render(<Main navigation={{}} />);
    const input = getByPlaceholderText('Buscar producto');
    fireEvent.changeText(input, ' Leche');
    fireEvent(input, 'submitEditing');
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Nombre del producto no valido.',
        [{ text: 'OK', onPress: expect.any(Function) }]
      );
    });
  });

  it('muestra productos si la búsqueda es válida', async () => {
    const { getByPlaceholderText, queryByText } = render(<Main navigation={{}} />);
    const input = getByPlaceholderText('Buscar producto');
    fireEvent.changeText(input, 'Leche');
    fireEvent(input, 'submitEditing');
    await waitFor(() => {
      expect(queryByText('Leche')).not.toBeNull();
    });
  });
});

describe('Home Component', () => {
  it('alerta si reseña es vacía', () => {
    const { getByPlaceholderText, getByText } = render(<Home />);
    fireEvent.changeText(getByPlaceholderText('Escribe tu reseña aquí...'), '');
    fireEvent.press(getByText('Publicar'));
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Por favor, ingresa tu opinión sobre el producto.'
    );
  });

  it('alerta si reseña es muy corta', () => {
    const { getByPlaceholderText, getByText } = render(<Home />);
    fireEvent.changeText(getByPlaceholderText('Escribe tu reseña aquí...'), 'Muy mal');
    fireEvent.press(getByText('Publicar'));
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'El valor minimo de caracteres es 10.');
  });

  it('alerta si reseña contiene palabras ofensivas', () => {
    const { getByPlaceholderText, getByText } = render(<Home />);
    fireEvent.changeText(getByPlaceholderText('Escribe tu reseña aquí...'), 'Este producto es tonto');
    fireEvent.press(getByText('Publicar'));
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Reseña no publicada. No cumple con las políticas de CheapMaps',
      [{ text: 'OK' }]
    );
  });

  it('alerta si reseña es válida', () => {
    const { getByPlaceholderText, getByText } = render(<Home />);
    fireEvent.changeText(
      getByPlaceholderText('Escribe tu reseña aquí...'),
      'Buen producto, me gustó bastante.'
    );
    fireEvent.press(getByText('Publicar'));
    expect(Alert.alert).toHaveBeenCalledWith('Éxito', 'Reseña publicada correctamente');
  });
});
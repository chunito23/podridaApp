import { BotonPuntaje } from '../Components/BotonPuntaje';
import { Text, View, Button } from 'react-native';
import { useStore } from 'store/store';
import { useState } from 'react';

// Interfaz para las propiedades del componente
interface Props {
  id: string;
}

export const CartasPuntajeCumplido = ({ id }: Props) => {
  const cantidadCartar = useStore((state) => state.cantCartas);
  const cambiarpuntaje = useStore((state) => state.cambiarPuntajeJugador);
  const cartasArray = Array.from({ length: cantidadCartar + 1 }, (_, index) => index);

  // Cambiar puntaje al hacer clic en un número
  const manejarPuntaje = (numero: number) => {
    cambiarpuntaje(id, numero);
  };

  return (
    <View className="rounded-lg bg-white p-4 shadow-md">
      <Text>Ronda 1/n</Text>
      <Text>¿Cuántos puntos hizo?</Text>
      <Text>¿Cumplio?</Text>
      <View className="mt-4 gap-4 flex-row flex-wrap items-center justify-center">
        <Button title="cumplio"  />
        <Button title="no cumplio"  />
      </View>
      <View className="flex-row flex-wrap items-center justify-center">
        {cartasArray.map((numero, index) => (
          <BotonPuntaje key={index} manejarPuntaje={() => manejarPuntaje(numero)} numero={numero} />
        ))}
      </View>
      {/* Mostrar los botones adicionales si el booleano es verdadero */}
      
    </View>
  );
};

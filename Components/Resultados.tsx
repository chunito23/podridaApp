import { BotonPuntaje } from './BotonPuntaje';
import { Text, View } from 'react-native';
import { useStore } from 'store/store';

// Interfaz para las propiedades del componente
interface Props {
  id: string;
}

interface Jugador {
  id: string;
  prediccion: number;
}

export const Resultados = ({ id,prediccion}: Jugador) => {
  const cantidadCartar = useStore((state) => state.cantCartas);
  const cambiarpuntaje = useStore((state) => state.cambiarPuntajeJugador);
  const cartasArray = Array.from({ length: cantidadCartar + 1 }, (_, index) => index);

  // Cambiar puntaje al hacer clic en un número
  const manejarPuntaje = (numero: number) => {
      cambiarpuntaje(id, numero);
  };

  return (
    <View className="rounded-lg bg-white p-4 shadow-md">
      <Text className="text-lg font-semibold text-blue-700">Ronda 1/n</Text>
      <Text className="mb-4 text-gray-700">¿Cuántos puntos hizo?</Text>
      <View className="flex-row flex-wrap items-center justify-center">
        {cartasArray.map((numero, index) => (
          <BotonPuntaje key={index} manejarPuntaje={() => manejarPuntaje(numero)} numero={numero} />
        ))}
      </View>
    </View>
  );
};

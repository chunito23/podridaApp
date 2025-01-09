import { BotonPuntaje } from 'Components/BotonPuntaje';

import { Text, View } from 'react-native';

import { useStore } from 'store/store';

// Interfaz para las propiedades del componente
interface Props {
  id: string;
}

export const Predicciones = ({ id }: Props) => {
  const cantidadCartar = useStore((state) => state.cantCartas);
  const cambiarPrediccionJugador = useStore((state) => state.cambiarPrediccionJugador);
  const cartasArray = Array.from({ length: cantidadCartar + 1 }, (_, index) => index);

  const manejarPrediccion = (numero: number) => {
    cambiarPrediccionJugador(id, numero);
  };

  return (
    <View className="rounded-lg bg-gray-50 p-6 shadow-lg">
      {/* Título de la ronda */}
      <Text className="mb-2 text-lg font-semibold text-blue-700">Ronda 1/n</Text>
      {/* Pregunta sobre los puntos */}
      <Text className="mb-4 text-center text-gray-700">¿Cuántos puntos harás?</Text>
      {/* Contenedor de botones */}
      <View className="flex-row flex-wrap items-center justify-center">
        {cartasArray.map((numero, index) => (
          <BotonPuntaje key={index} manejarPuntaje={() => manejarPrediccion(numero)} numero={numero} />
        ))}
      </View>
    </View>
  );
};

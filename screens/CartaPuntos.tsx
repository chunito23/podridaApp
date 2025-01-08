import { BotonPuntaje } from '../Components/BotonPuntaje';
import { Text, View } from 'react-native';
import { useStore } from 'store/store';

// Interfaz para las propiedades del componente
interface Props {
  id: string;
}

export const CartaPuntos = ({ id }: Props) => {
  const cantidadCartar = useStore((state) => state.cantCartas);
  const cambiarpuntaje = useStore((state) => state.cambiarPuntajeJugador);
  const cartasArray = Array.from({ length: cantidadCartar + 1 }, (_, index) => index);

  const manejarPuntaje = (numero: number) => {
    cambiarpuntaje(id, numero);
  };

  return (
    <View className="rounded-lg bg-white p-4 shadow-md">
      <Text>Ronda 1/n</Text>
      <Text>¿Cuántos puntos harás?</Text>
      <View className="flex-row flex-wrap items-center justify-center">
        {cartasArray.map((numero, index) => (
          <BotonPuntaje key={index} manejarPuntaje={() => manejarPuntaje(numero)} numero={numero} /> // Arreglado el error de llaves
        ))}
      </View>
    </View>
  );
};

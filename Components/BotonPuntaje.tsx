import { useState } from 'react';
import { Pressable, Text } from 'react-native';

interface Props {
  numero: number;
  manejarPuntaje: (numero: number) => void;
}

export const BotonPuntaje = ({ numero, manejarPuntaje }: Props) => {
  // Estado para saber si el botón está seleccionado
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    manejarPuntaje(numero);
    setIsSelected(!isSelected); // Cambia el estado de selección
  };

  return (
    <Pressable
      className={`m-2 w-[45%] rounded p-2 ${isSelected ? 'bg-blue-600' : 'bg-gray-400'}`}
      onPress={handlePress}>
      <Text className="text-white">{numero}</Text>
    </Pressable>
  );
};

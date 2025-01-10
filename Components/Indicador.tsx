import React from 'react';
import { Text, View } from 'react-native';
import { useStore } from 'store/store';
import { MaterialIcons } from '@expo/vector-icons';

export const Indicador = () => {
  const Rondas = useStore((state) => state.numeroRondas);
  const cantRondas = useStore((state) => state.cantRondas);
  const CantidadCartas = useStore((state) => state.cantCartas);

  return (
    <View className="mb-4 w-full max-w-md rounded-lg border border-blue-300 bg-gradient-to-r from-blue-50 to-blue-100 p-4 shadow-md">
      <View className="flex-row items-center space-x-3">
        <MaterialIcons name="info" size={24} color="#1E3A8A" />
        <Text className="text-xl font-bold text-blue-800">Información de la Ronda</Text>
      </View>
      <View className="mt-3 space-y-2">
        <Text className="text-lg font-medium text-gray-700">
          Ronda: <Text className="font-semibold text-blue-600">{Rondas} / {cantRondas}</Text>
        </Text>
        <Text className="text-lg font-medium text-gray-700">
          Cartas totales: <Text className="font-semibold text-blue-600">{CantidadCartas}</Text>
        </Text>
      </View>
    </View>
  );
};
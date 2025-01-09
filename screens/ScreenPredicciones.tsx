import { useNavigation } from '@react-navigation/native';
import { Predicciones } from 'Components/Predicciones';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useStore } from 'store/store';

export const ScreenPredicciones = () => {
  const Jugadores = useStore((state) => state.jugadores);
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-red-50 p-4">
      {Jugadores.length > 0 ? (
        <View className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl border border-red-300">
          <Text className="mb-4 text-center text-3xl font-extrabold text-red-700">
            Predicciones
          </Text>
          <ScrollView className="w-full max-h-80 space-y-4">
            {Jugadores.map((Jugador) => (
              <View
                key={Jugador.id}
                className="rounded-lg border border-red-400 bg-red-100 p-4 shadow-md">
                <Text className="text-lg font-semibold text-red-800">
                  Nombre: {Jugador.nombre}
                </Text>
                <Predicciones id={Jugador.id} />
              </View>
            ))}
          </ScrollView>

          <Pressable
            onPress={() => navigation.navigate('ScreenJugadores')}
            className="mt-6 w-full rounded-lg bg-red-600 py-3 shadow-lg hover:bg-red-700">
            <Text className="text-center text-lg font-semibold text-white">
              ver jugadores
            </Text>
          </Pressable>
        </View>
      ) : (
        <Text className="text-center text-lg font-semibold text-red-500">
          No hay jugadores disponibles.
        </Text>
      )}
    </View>
  );
};

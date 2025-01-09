import { useNavigation } from '@react-navigation/native';
import { Resultados } from 'Components/Resultados';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useStore } from 'store/store';

export const ScreenResultados = () => {
  const Jugadores = useStore((state) => state.jugadores);
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-green-50 p-4">
      {Jugadores.length > 0 ? (
        <View className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-green-200">
          <Text className="mb-4 text-center text-3xl font-extrabold text-green-700">
            Resultados
          </Text>
          <ScrollView className="max-h-80 w-full space-y-4">
            {Jugadores.map((Jugador) => (
              <View
                key={Jugador.id}
                className="rounded-lg border border-green-300 bg-green-100 p-4 shadow-sm">
                <Text className="text-lg font-semibold text-green-800">
                  Nombre: {Jugador.nombre}
                </Text>
                <Resultados id={Jugador.id} />
              </View>
            ))}
          </ScrollView>

          <Pressable
            onPress={() => navigation.navigate('ScreenJugadores')}
            className="mt-6 w-full rounded-lg bg-green-600 py-3 shadow-lg hover:bg-green-700">
            <Text className="text-center text-lg font-semibold text-white">
              ver jugadores y pasar de ronda ronda
            </Text>
          </Pressable>
        </View>
      ) : (
        <Text className="text-center text-lg font-semibold text-green-500">
          No hay jugadores disponibles.
        </Text>
      )}
    </View>
  );
};

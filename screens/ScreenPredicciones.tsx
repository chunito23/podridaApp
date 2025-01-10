import { useNavigation } from '@react-navigation/native';
import { Predicciones } from 'Components/Predicciones';
import React, { useEffect } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useStore } from 'store/store';

export const ScreenPredicciones = () => {
  const Jugadores = useStore((state) => state.jugadores);
  const cantCartas = useStore((state) => state.cantCartas);
  const navigation = useNavigation();
  const prediccionValida = useStore((state) => state.PrediccionValida);
  const puntosRestantes = useStore((state) => state.puntosRestantes);
  const mostrarEstado = useStore((state) => state.mostrarEstado);

  useEffect(() => {
    console.log(puntosRestantes)
  }, [puntosRestantes]);

  return (
    <View className="flex-1 bg-gradient-to-b from-red-100 via-red-50 to-white">
      {Jugadores.length > 0 ? (
        <>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="p-4">
            <View className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-lg">
              <Text className="mb-6 text-center text-3xl font-extrabold text-red-600">
                Predicciones
              </Text>

              <View className="flex flex-row flex-wrap justify-center gap-4">
                {Jugadores.map((Jugador) => (
                  <View
                    key={Jugador.id}
                    className="w-full rounded-xl border border-red-300 bg-red-50 p-4 shadow-sm">
                    <Text className="mb-2 text-center text-lg font-semibold text-red-700">
                      {Jugador.nombre}
                    </Text>
                    <Predicciones id={Jugador.id} />
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <View className="absolute bottom-0 w-full bg-gradient-to-t from-white to-transparent p-4">
            <Pressable
              onPress={() => 
                prediccionValida
                  ? navigation.navigate('ScreenJugadores')
                  : alert('No es posible esta distribución de predicciones')
              }
              className="w-full rounded-full bg-red-500 py-4 shadow-md active:bg-red-600">
              <Text className="text-center text-lg font-bold text-white">Ver Jugadores</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <View className="flex-1 items-center justify-center">
          <View className="w-full max-w-md rounded-3xl border border-red-300 bg-white p-6 shadow-lg">
            <Text className="text-center text-2xl font-semibold text-red-500">
              No hay jugadores disponibles.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

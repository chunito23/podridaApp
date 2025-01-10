import { useNavigation } from '@react-navigation/native';
import { Resultados } from 'Components/Resultados';
import React, { useEffect } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useStore } from 'store/store';
import { MaterialIcons } from '@expo/vector-icons';

export const ScreenResultados = () => {
  const Jugadores = useStore((state) => state.jugadores);
  const actualizarJugadores = useStore((state) => state.actualizarPuntajes);
  const numeroRondas = useStore((state) => state.numeroRondas);
  const CantRondas = useStore((state) => state.cantRondas);
  const esValido = useStore((state) => state.PuntajeValida);
  const puntosronda = useStore((state) => state.puntosronda);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('pr ', puntosronda);
  }, [puntosronda]);

  return (
    <View className="flex-1 bg-gradient-to-b from-green-200 via-green-100 to-white">
      {Jugadores.length > 0 ? (
        <>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="p-4">
            <View className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-lg">
              <Text className="mb-6 text-center text-3xl font-extrabold text-green-800">
                🏆 Resultados 🏆
              </Text>

              <View className="flex flex-row flex-wrap justify-center gap-4">
                {Jugadores.map((Jugador) => (
                  <View
                    key={Jugador.id}
                    className="w-full rounded-xl border border-green-300 bg-gradient-to-r from-green-100 to-green-50 p-4 shadow-sm">
                    <View className="flex-row items-center space-x-3">
                      <MaterialIcons name="person" size={24} color="#047857" />
                      <Text className="text-lg font-semibold text-green-800">{Jugador.nombre}</Text>
                    </View>
                    <Resultados id={Jugador.id} prediccion={Jugador.prediccion} />
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          <View className="absolute bottom-0 w-full bg-gradient-to-t from-white to-transparent p-4">
            <Pressable
              onPress={() => {
                if (esValido) {
                  actualizarJugadores()
                  const ruta = numeroRondas === CantRondas ? 'ScreenPerdedor' : 'ScreenJugadores';
                  navigation.navigate(ruta);
                } else {
                  alert('hay mas puntos repartidos que los posibles');
                }
              }}
              className="w-full rounded-full bg-green-500 py-4 shadow-md active:bg-green-600">
              <Text className="text-center text-lg font-bold text-white">
                Ver jugadores y pasar de ronda
              </Text>
            </Pressable>
          </View>
        </>
      ) : (
        <View className="flex-1 items-center justify-center">
          <View className="w-full max-w-md rounded-3xl border border-green-300 bg-white p-6 shadow-lg">
            <Text className="text-center text-2xl font-semibold text-green-600">
              😔 No hay jugadores disponibles.
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('ScreenJugadores')}
            className="mt-4 rounded-full bg-green-400 px-6 py-2 shadow-md active:bg-green-500">
            <Text className="text-center text-lg font-bold text-white">Agregar Jugadores</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useStore } from 'store/store';

export const ScreenJugadores = () => {
  const ruta = useStore((state) => state.ruta);
  const cambiarRuta = useStore((state) => state.cambiarRuta);
  const Jugadores = useStore((state) => state.jugadores);
  const navigation = useNavigation();
  const EliminarJugadores = useStore((state) => state.eliminarJugador);
  const pasarRonda = useStore((state) => state.avanzarRonda);

  const manejarEliminarJugador = (id: string) => {
    EliminarJugadores(id);
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      {/* Título de la sección */}
      <Text className="mb-6 text-2xl font-bold text-blue-700">Lista de Jugadores</Text>

      {/* Mensaje cuando no hay jugadores */}
      {Jugadores.length === 0 ? (
        <Text className="text-lg text-gray-500">No hay jugadores en la lista.</Text>
      ) : (
        <ScrollView className="w-full max-w-md" style={{ flex: 1 }}>
          {Jugadores.map((Jugador) => (
            <View
              key={Jugador.id}
              className="mb-4 flex-row items-center justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
              {/* Información del jugador */}
              <View>
                <Text className="text-sm font-medium text-gray-500">Nombre:</Text>
                <Text className="mb-2 text-lg text-gray-900">{Jugador.nombre}</Text>
                <Text className="text-sm font-medium text-gray-500">Puntos:</Text>
                <Text className="text-lg font-semibold text-green-600">{Jugador.puntos}</Text>
                <Text className="text-sm font-medium text-gray-500">prediccion:</Text>
                <Text className="text-lg font-semibold text-green-600">{Jugador.prediccion}</Text>
              </View>

              {/* Botón para eliminar jugador */}
              <Pressable
                className="ml-4 h-10 w-10 items-center justify-center rounded-full bg-red-600 shadow-md hover:bg-red-700"
                onPress={() => manejarEliminarJugador(Jugador.id)}>
                <Text className="text-lg font-bold text-white">X</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      )}

      <Pressable
        onPress={() => {
          const direccion = (ruta ? 'ScreenResultados' : 'ScreenPredicciones')
          navigation.navigate(direccion);
          cambiarRuta();
          if (direccion == "ScreenPredicciones"){
            pasarRonda()      
          }
        }}
        className="mt-6 w-full rounded-full bg-blue-600 p-4 shadow-lg hover:bg-blue-700">
        <Text className="text-center text-lg font-semibold text-white">
          {ruta ? 'Ver resultados' : 'Ver predicciones'}
        </Text>
      </Pressable>
    </View>
  );
};

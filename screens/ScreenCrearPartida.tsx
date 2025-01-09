import React, { useState } from 'react';
import { Pressable, Text, View, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from 'store/store';

export const ScreenCrearPartida = () => {
  const navigation = useNavigation();
  const [nombre, setnombre] = useState<string>('');
  const Jugadores = useStore((state) => state.jugadores);
  const AgregarJugadores = useStore((state) => state.agregarJugador);
  const EliminarJugadores = useStore((state) => state.eliminarJugador);
  const calcularCR = useStore((state) => state.calcularCantidadRondas);

  const manejarAgregarJugador = () => {
    AgregarJugadores(nombre);
    setnombre('');
  };

  const manejarEliminarJugador = (id: string) => {
    EliminarJugadores(id);
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      {/* Contenedor principal */}
      <View className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <Text className="mb-6 text-center text-2xl font-bold text-blue-700">Partida Nueva</Text>

        {/* Campo para ingresar el nombre del jugador */}
        <TextInput
          onChangeText={(e) => setnombre(e)}
          value={nombre}
          className="mb-4 w-full rounded-lg border-2 border-blue-500 p-3"
          placeholder="Ingresa nombre del jugador"
        />

        {/* Botón para agregar jugador */}
        <Pressable
          onPress={manejarAgregarJugador}
          className="mb-6 w-full rounded-full bg-blue-600 p-4 shadow-lg hover:bg-blue-700">
          <Text className="text-center font-semibold text-white">Agregar Jugador</Text>
        </Pressable>

        {/* Lista de jugadores */}
        {Jugadores.length > 0 && (
          <ScrollView className="max-h-60 w-full">
            <Text className="mb-4 text-lg font-semibold text-gray-700">Lista de Jugadores:</Text>
            <View className="grid grid-cols-2 gap-4">
              {Jugadores.map((Jugador) => (
                <View
                  key={Jugador.id}
                  className="flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-4 shadow-md">
                  {/* Información del jugador */}
                  <View>
                    <Text className="text-sm font-medium text-gray-500">Nombre:</Text>
                    <Text className="mb-2 text-lg text-gray-900">{Jugador.nombre}</Text>
                    <Text className="text-sm font-medium text-gray-500">Puntos:</Text>
                    <Text className="text-lg font-semibold text-green-600">{Jugador.puntos}</Text>
                  </View>

                  {/* Botón para eliminar jugador */}
                  <Pressable
                    className="mt-2 h-10 w-10 items-center justify-center rounded-full bg-red-600 shadow-md hover:bg-red-700"
                    onPress={() => manejarEliminarJugador(Jugador.id)}>
                    <Text className="text-lg font-bold text-white">X</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {/* Botón para navegar a ScreenPredicciones */}
        <Pressable
          onPress={() => {
            navigation.navigate('ScreenPredicciones');
            calcularCR();
          }}
          className="mt-6 w-full rounded-full bg-blue-400 p-4 shadow-lg hover:bg-blue-500">
          <Text className="text-center text-lg font-semibold text-white">Empezar a anotar</Text>
        </Pressable>
      </View>
    </View>
  );
};

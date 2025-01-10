import { nanoid } from 'nanoid';
import { create } from 'zustand';

interface Jugador {
  id: string;
  nombre: string;
  prediccion: number;
  puntos: number;
  puntosTotales: number;
}

const JugadoresDePrueba: Jugador[] = [
  { id: 'v1StGXR8_Z5jdHi6B-myT', nombre: 'Thiago', prediccion: 0, puntos: 0, puntosTotales: 0 },
  { id: 'v1StGXR8_Z5jdHi6B-abcd', nombre: 'Mique', prediccion: 0, puntos: 0, puntosTotales: 0 },
  { id: 'v1StGXR8_Z5jdHi6B-efgh', nombre: 'Chuni', prediccion: 0, puntos: 0, puntosTotales: 0 },
  { id: 'v1StGXR8_Z5jdHi6B-ijkl', nombre: 'Lucho', prediccion: 0, puntos: 0, puntosTotales: 0 },
];

interface Partida {
  PrediccionValida: boolean;
  PuntajeValida: boolean;
  ruta: boolean;
  jugadores: Jugador[];
  numeroRondas: number;
  cantRondas: number;
  cantCartas: number;
  puntosRestantes: number;
  puntosronda: number;
  agregarJugador: (nombre: string) => void;
  eliminarJugador: (id: string) => void;
  cambiarPuntajeJugador: (id: string, puntos: number) => void;
  cambiarPuntajeTotalJugador: (id: string, puntos: number) => void;
  cambiarPrediccionJugador: (id: string, puntos: number) => void;
  avanzarRonda: () => void;
  cambiarRuta: () => void;
  calcularCantidadRondas: () => void;
  mostrarEstado: () => void;
}

const INITIAL_CARTAS = 2;
const INITIAL_PUNTOS_RESTANTES = 2;

export const useStore = create<Partida>((set, get) => ({
  PrediccionValida: true,
  PuntajeValida: true,
  ruta: true,
  jugadores: JugadoresDePrueba,
  ronda: [],
  cantRondas: 0,
  numeroRondas: 1,
  prediccion: 0,
  cantCartas: INITIAL_CARTAS,
  puntosRestantes: INITIAL_PUNTOS_RESTANTES,
  puntosronda: 0,

  mostrarEstado: () => {
    const estado = get(); // Obtén el estado actual del store
    console.log('Estado actual del store:', estado);
  },

  calcularCantidadRondas: () =>
    set((state) => ({ cantRondas: 2 * Math.floor(40 / state.jugadores.length) - 2 })),

  agregarJugador: (nombre: string) =>
    set((state) => ({
      jugadores: [
        ...state.jugadores,
        { id: nanoid(), nombre, prediccion: 0, puntos: 0, puntosTotales: 0 },
      ],
    })),

  eliminarJugador: (id: string) =>
    set((state) => ({
      jugadores: state.jugadores.filter((jugador) => jugador.id !== id),
    })),

  cambiarPuntajeTotalJugador: (id: string, puntosTotales: number) =>
    set((state) => ({
      jugadores: state.jugadores.map((jugador) =>
        jugador.id === id ? { ...jugador, puntosTotales } : jugador
      ),
    })),

  cambiarPuntajeJugador: (id: string, puntos: number) =>
    set((state) => {
      const jugadoresActualizados = state.jugadores.map((jugador) =>
        jugador.id === id ? { ...jugador, puntos } : jugador
      );

      const sumaPuntos = jugadoresActualizados.reduce(
        (acumulado, jugador) => acumulado + jugador.puntos,
        0
      );

      const esValido = state.cantCartas === sumaPuntos;
      const puntosSumaTotal = 0 + sumaPuntos;

      return {
        jugadores: jugadoresActualizados,
        PuntajeValida: esValido,
        puntosronda: puntosSumaTotal,
      };
    }),

  cambiarPrediccionJugador: (id: string, prediccion: number) =>
    set((state) => {
      // Actualizar las predicciones de los jugadores
      const jugadoresActualizados = state.jugadores.map((jugador) =>
        jugador.id === id ? { ...jugador, prediccion } : jugador
      );

      // Calcular la suma de las predicciones
      const sumaPredicciones = jugadoresActualizados.reduce(
        (acumulado, jugador) => acumulado + jugador.prediccion,
        0
      );

      // Calcular los puntos restantes y determinar si la predicción es válida
      const puntosRestantes = state.cantCartas - sumaPredicciones;
      const prediccionValida = puntosRestantes !== 0;

      return {
        jugadores: jugadoresActualizados,
        puntosRestantes,
        PrediccionValida: prediccionValida,
      };
    }),

  avanzarRonda: () =>
    set((state) => ({
      numeroRondas: state.numeroRondas + 1,
      cantCartas:
        state.numeroRondas < Math.floor(40 / state.jugadores.length) - 1
          ? state.cantCartas + 1
          : state.cantCartas - 1,
    })),

  cambiarRuta: () =>
    set((state) => ({
      ruta: !state.ruta,
    })),
}));

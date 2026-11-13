import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pacientes';

/**
 * Guarda la lista de pacientes en AsyncStorage.
 * Las fechas se serializan automáticamente a strings ISO por JSON.stringify.
 */
export const guardarPacientes = async (pacientes) => {
  try {
    const json = JSON.stringify(pacientes);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.error('Error al guardar pacientes:', error);
  }
};

/**
 * Carga la lista de pacientes desde AsyncStorage.
 * Reconstruye los objetos Date a partir de las fechas serializadas.
 */
export const cargarPacientes = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);

    if (!json) {
      return [];
    }

    return JSON.parse(json, (key, value) => {
      if (key === 'fecha' && typeof value === 'string') {
        return new Date(value);
      }
      return value;
    });
  } catch (error) {
    console.error('Error al cargar pacientes:', error);
    return [];
  }
};

/**
 * Elimina todos los pacientes almacenados (útil para debugging).
 */
export const limpiarPacientes = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error al limpiar pacientes:', error);
  }
};

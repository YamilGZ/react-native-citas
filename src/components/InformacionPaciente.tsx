import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatearFecha } from '../helpers';
import type { PacienteType } from '../types';

/**
 * Props del componente InformacionPaciente.
 */
interface InformacionPacienteProps {
  /** Paciente del cual se muestra la información; si es null no se renderiza nada */
  paciente: PacienteType | null;
  /** Cierra el modal de información */
  setModalPaciente: (visible: boolean) => void;
  /** Limpia el paciente seleccionado al cerrar */
  setPaciente: (paciente: PacienteType | null) => void;
}

/**
 * Modal que muestra todos los detalles de un paciente.
 */
const InformacionPaciente = ({
  paciente,
  setModalPaciente,
  setPaciente,
}: InformacionPacienteProps) => {
  // No renderizar nada si no hay un paciente seleccionado
  if (!paciente) {
    return null;
  }

  /**
   * Cierra el modal y limpia el paciente seleccionado.
   */
  const cerrar = () => {
    setModalPaciente(false);
    setPaciente(null);
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>
        Informacion {''}
        <Text style={styles.tituloBold}>Paciente</Text>
      </Text>

      <View>
        <Pressable style={styles.btnCerrar} onLongPress={cerrar}>
          <Text style={styles.btnCerrarTexto}>X Cerrar</Text>
        </Pressable>
      </View>

      <View style={styles.contenido}>
        <Campo label="Nombre:" valor={paciente.paciente} />
        <Campo label="Propietario:" valor={paciente.propietario} />
        <Campo label="Email:" valor={paciente.email} />
        <Campo label="Telefono:" valor={paciente.telefono} />
        <Campo label="Fecha Alta:" valor={formatearFecha(paciente.fecha)} />
        <Campo label="Síntomas:" valor={paciente.sintomas} />
      </View>
    </SafeAreaView>
  );
};

/**
 * Componente auxiliar para mostrar un campo de información del paciente.
 */
interface CampoProps {
  /** Etiqueta del campo */
  label: string;
  /** Valor a mostrar */
  valor: string;
}

const Campo = ({ label, valor }: CampoProps) => (
  <View style={styles.campo}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.valor}>{valor}</Text>
  </View>
);

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#f59e0b',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    marginTop: 30,
    color: '#fff',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCerrar: {
    marginVertical: 30,
    backgroundColor: '#e06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCerrarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  contenido: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  campo: {
    marginBottom: 10,
  },
  label: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '600',
    fontSize: 12,
  },
  valor: {
    fontWeight: '700',
    fontSize: 20,
    color: '#334155',
  },
});

export default InformacionPaciente;

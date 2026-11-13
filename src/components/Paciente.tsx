import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { formatearFecha } from '../helpers';
import type { PacienteType } from '../types';

/**
 * Props del componente Paciente.
 */
interface PacienteProps {
  /** Datos del paciente a mostrar en la tarjeta */
  item: PacienteType;
  /** Abre/cierra el modal del formulario */
  setModalVisible: (visible: boolean) => void;
  /** Carga un paciente en modo edición */
  pacienteEditar: (paciente: PacienteType) => void;
  /** Elimina un paciente por su id */
  pacienteEliminar: (id: string) => void;
  /** Abre/cierra el modal de información */
  setModalPaciente: (visible: boolean) => void;
  /** Establece el paciente seleccionado para ver/editar */
  setPaciente: (paciente: PacienteType | null) => void;
}

/**
 * Componente que renderiza una tarjeta de paciente en la lista.
 * Permite ver detalles (onLongPress en la tarjeta), editar y eliminar.
 */
const Paciente = ({
  item,
  setModalVisible,
  pacienteEditar,
  pacienteEliminar,
  setModalPaciente,
  setPaciente,
}: PacienteProps) => {
  const { paciente, fecha, id } = item;

  /**
   * Muestra el modal de información con los datos del paciente seleccionado.
   */
  const mostrarInformacion = () => {
    setModalPaciente(true);
    setPaciente(item);
  };

  /**
   * Prepara el paciente para edición y abre el formulario.
   */
  const editar = () => {
    pacienteEditar(item);
    setModalVisible(true);
  };

  return (
    <Pressable onLongPress={mostrarInformacion}>
      <View style={styles.contenedor}>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.texto}>{paciente}</Text>
        <Text style={styles.fecha}>{formatearFecha(fecha)}</Text>

        <View style={styles.contenedorBotones}>
          <Pressable style={[styles.btn, styles.btnEditar]} onLongPress={editar}>
            <Text style={styles.btnTexto}>Editar</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.btnEliminar]}
            onLongPress={() => pacienteEliminar(id)}
          >
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomColor: '#94a3b8',
    borderBottomWidth: 2,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  texto: {
    color: '#6d28d9',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  fecha: {
    color: '#374151',
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEditar: {
    backgroundColor: '#f59e0b',
  },
  btnEliminar: {
    backgroundColor: '#ef4444',
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#fff',
  },
});

export default Paciente;

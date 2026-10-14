import React,{ useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  Alert,
  StatusBar
} from 'react-native';

import Formulario from './src/components/Formulario'
import Paciente from './src/components/Paciente'
import InformacionPaciente from './src/components/InformacionPaciente'

interface PacienteType {
  id: string;
  paciente: string;
  propietario: string;
  email: string;
  telefono: string;
  fecha: Date;
  sintomas: string;
}

  const App = () => {

    const [ modalVisible, setModalVisible ] = useState(false)
    const [ modalPaciente, setModalPaciente ] = useState(false)
    const [pacientes, setPacientes ] = useState<PacienteType[]>([])
    const [paciente, setPaciente ] = useState<PacienteType | null>(null)

    const pacienteEditar = (id: string) => {
      const pacienteEditar = pacientes.find(paciente => paciente.id === id)

      if (pacienteEditar) {
        setPaciente(pacienteEditar)
      }
    }

    const pacienteEliminar = (id: string) => {
      Alert.alert(
        '¿Deseas eliminar este paciente?',
        'Un paciente eliminado no se puede recuperar',
        [
          { text: 'Cancelar' },
          { text: 'Si, Eliminar', onPress: () => {
              const pacienteActualizados = pacientes.filter(
                pacientesState => pacientesState.id !== id)

                setPacientes(pacienteActualizados)

          } }
        ]
        
      )
    }

    const cerrarModal = () => {
      setModalVisible(false)
    }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='#f3f4f6'
        translucent={false}
      />
      <Text style={styles.titulo}>Administrador de Citas {' '}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable
        onPress={() => {
          setPaciente(null)
          setModalVisible(true)
        }}
        style={styles.btnNuevaCita}
      >
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>

      {pacientes.length === 0 ? 
        <Text style={styles.noPacientes}>No hay pacientes aún</Text> : 
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {

            return(
              <Paciente 
                item={item}
                setModalVisible={setModalVisible}
                setPaciente={setPaciente}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalPaciente={setModalPaciente}
              />
            )

          }}

        />



      }

      <Formulario
        modalVisible={modalVisible}
        cerrarModal={cerrarModal}
        setPacientes={setPacientes}
        pacientes={pacientes}
        paciente={paciente}
        setPaciente={setPaciente}
      />

      <Modal
        visible={modalPaciente}
        animationType='slide'
      >
        <InformacionPaciente 
          paciente={paciente}
          setModalPaciente={setModalPaciente}
          setPaciente={setPaciente}
        />
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 30,
    fontWeight: '600',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6d28d9',
  },
  btnNuevaCita: {
    backgroundColor: '#6d28d9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  noPacientes: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 26,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  }
})

export default App;
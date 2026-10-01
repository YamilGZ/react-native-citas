import React,{ useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Text, 
  View,
  StyleSheet, 
  Pressable,
  Modal,
  FlatList,
} from 'react-native';

import Formulario from './src/components/Formulario'
import Paciente from './src/components/Paciente'

  const App = () => {

    const [ modalVisible, setModalVisible ] = useState(false)
    interface PacienteType {
      id: string;
      paciente: string;
      propietario: string;
      email: string;
      telefono: string;
      fecha: Date;
      sintomas: string;
    }

    const [pacientes, setPacientes ] = useState<PacienteType[]>([])
    const [paciente, setPaciente ] = useState({})

    const pacienteEditar = (id: string) => {
      const pacienteEditar = pacientes.filter(paciente => paciente.id === id)

      setPaciente(pacienteEditar[0])
    }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas {' '}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable
        onPress={ () => setModalVisible(!modalVisible)}
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
                pacienteEditar={pacienteEditar}
              />
            )

          }}

        />



      }

      <Formulario
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setPacientes={setPacientes}
        pacientes={pacientes}
        paciente={paciente}
        setPaciente={setPaciente}
      />

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
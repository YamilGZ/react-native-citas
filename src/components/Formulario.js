import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Modal, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';

const Formulario = ({modalVisible}) => {

    const [paciente, setPaciente] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fecha, setFecha] = useState(new Date())
    const [sintomas, setSintomas] = useState('')

    return (
        <Modal
            animationType='slide'
            visible={modalVisible}
        >
        
            <SafeAreaView style={styles.contenido}>
                <ScrollView>
                    <Text style={styles.titulo}>Nueva {''}
                        <Text style={styles.tituloBold}>Cita</Text>
                    </Text>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Paciente</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder='Nombre Paciente'
                            placeholderTextColor={'#666'}
                            value={paciente}
                            onChangeText={setPaciente}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Propietario</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder='Nombre Propietario'
                            placeholderTextColor={'#666'}
                            value={propietario}
                            onChangeText={setPropietario}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Email Propietario</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder='Email Propietario'
                            placeholderTextColor={'#666'}
                            keyboardType='email-address'
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Teléfono Propietario</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder='Teléfono Propietario'
                            placeholderTextColor={'#666'}
                            keyboardType='phone-pad'
                            value={telefono}
                            onChangeText={setTelefono}
                            maxLength={10}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Fecha Alta</Text>

                        <View style={styles.fechaContenedor}>
                            <DatePicker 
                                date={fecha}
                                locale='es'
                            />
                        </View>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Síntomas</Text>
                        <TextInput 
                            style={[styles.input, styles.sintomasInput]}
                            placeholder='Síntomas paciente'
                            placeholderTextColor={'#666'}
                            value={sintomas}
                            onChangeText={setSintomas}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>

        </Modal>
    )
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6d28d9',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    marginTop: 30,
    color: '#fff'
  },
  tituloBold: {
    fontWeight: '900'
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600'
  },
  sintomasInput: {
    height: 100,
    textAlignVertical: 'top'
  },
  fechaContenedor: {
    backgroundColor: '#fff',
    borderRadius: 10
  }
})

export default Formulario

import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Modal, StyleSheet, View, TextInput, ScrollView, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import DatePicker from 'react-native-date-picker';

const Formulario = ({
        modalVisible,
        cerrarModal,
        setPacientes,
        pacientes,
        paciente: pacienteObj,
        setPaciente: setPacienteApp
    }) => {

    const [paciente, setPaciente] = useState('')
    const [id, setId] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fecha, setFecha] = useState(new Date())
    const [sintomas, setSintomas] = useState('')

    useEffect(() => {
        if (pacienteObj && Object.keys(pacienteObj).length > 0) {
            setPaciente(pacienteObj.paciente || '')
            setId(pacienteObj.id || '')
            setPropietario(pacienteObj.propietario || '')
            setEmail(pacienteObj.email || '')
            setTelefono(pacienteObj.telefono || '')
            setFecha(pacienteObj.fecha ? new Date(pacienteObj.fecha) : new Date())
            setSintomas(pacienteObj.sintomas || '')
        } else {
            setPaciente('')
            setId('')
            setPropietario('')
            setEmail('')
            setTelefono('')
            setFecha(new Date())
            setSintomas('')
        }
    }, [pacienteObj])

    const handleCita = () => {
        // validar
        if ([paciente.trim(), propietario.trim(), email.trim(), telefono.trim(), sintomas.trim()].includes('')) {
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios'
            )

            return
        }

        // Revisar si es un registro nuevo o edicion

        const nuevoPaciente = {
            paciente,
            propietario,
            email,
            telefono,
            fecha,
            sintomas
        }

        if (id) {
            // editando

            nuevoPaciente.id = id 

            const pacientesActualizados = pacientes.map( pacienteState =>
                pacienteState.id === nuevoPaciente.id ? nuevoPaciente :
                pacienteState )

                setPacientes(pacientesActualizados)
                setPacienteApp(null)

        } else {
            // nuevo registro

            nuevoPaciente.id = Date.now()
            setPacientes([...pacientes, nuevoPaciente])
        }

        cerrarModal()

        setId('')
        setPaciente('')
        setPropietario('')
        setEmail('')
        setTelefono('')
        setFecha(new Date())
        setSintomas('')

    }

    return (
        <Modal
            animationType='slide'
            visible={modalVisible}
        >
        
            <SafeAreaView style={styles.contenido}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoiding}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    keyboardDismissMode='on-drag'
                    contentContainerStyle={styles.scrollContent}
                >
                    <Text style={styles.titulo}>
                        { pacienteObj?.id ? 'Editar' : 'Nueva' } {''}
                        <Text style={styles.tituloBold}>Cita</Text>
                    </Text>

                    <Pressable
                        style={styles.btnCancelar}
                        onLongPress={ () => {
                            cerrarModal()
                            setPacienteApp(null)
                            setId('')
                            setPaciente('')
                            setPropietario('')
                            setEmail('')
                            setTelefono('')
                            setFecha(new Date())
                            setSintomas('')
                        }}
                    >
                        <Text style={styles.btnCancelarTexto}>
                            X Cancelar
                        </Text>
                    </Pressable>

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
                                mode='date'
                                androidVariant='iosClone'
                                textColor='#000000'
                                fadeToColor='#ffffff'
                                onDateChange={(date) => setFecha(date)}
                                style={styles.datePicker}
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
                            scrollEnabled={true}
                        />
                    </View>

                    <Pressable
                        style={styles.btnNuevaCita}
                        onPress={handleCita}
                    >
                        <Text style={styles.btnNuevaCitaTexto}>
                            { pacienteObj?.id ? 'Editar' : 'Agregar' } Paciente
                        </Text>
                    </Pressable>

                </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>

        </Modal>
    )
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6d28d9',
    flex: 1
  },
  keyboardAvoiding: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 150
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
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#5827a4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10
  },
  btnCancelarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase'
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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    minHeight: 220
  },
  datePicker: {
    height: 220,
    width: '100%'
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#f59e0b',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10
  },
  btnNuevaCitaTexto: {
    color: '#5827a4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase'
  }
})

export default Formulario

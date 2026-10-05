import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatearFecha } from '../helpers'

const InformacionPaciente = ({paciente, setModalPaciente, setPaciente}) => {
  return (
    <SafeAreaView
        style={styles.contenedor}
    >
        <Text style={styles.titulo}>Informacion {''}
            <Text style={styles.tituloBold}>Paciente</Text>
        </Text>

        <View>
            <Pressable
                style={styles.btnCerrar}
                onLongPress={() => {
                    setModalPaciente(false)
                    setPaciente({})
                }}
            >
                <Text style={styles.btnCerrarTexto}>X Cerrar</Text>
            </Pressable>
        </View>

        <View
            style={styles.contenido}
        >
            <View 
                style={styles.campo} 
            >
                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.valor}>{paciente.paciente}</Text>
            </View>
            <View 
                style={styles.campo} 
            >
                <Text style={styles.label}>Propietario:</Text>
                <Text style={styles.valor}>{paciente.propietario}</Text>
            </View>
            <View 
                style={styles.campo} 
            >
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.valor}>{paciente.email}</Text>
            </View>
            <View 
                style={styles.campo} 
                >
                <Text style={styles.label}>Telefono:</Text>
                <Text style={styles.valor}>{paciente.telefono}</Text>
            </View>
            <View 
                style={styles.campo} 
            >
                <Text style={styles.label}>Fecha Alta:</Text>
                <Text style={styles.valor}>{formatearFecha(paciente.fecha)}</Text>
            </View>
            <View 
                style={styles.campo} 
            >
                <Text style={styles.label}>Síntomas:</Text>
                <Text style={styles.valor}>{paciente.sintomas}</Text>
            </View>
        </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#f59e0b',
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
  btnCerrar: {
    marginVertical: 30,
    backgroundColor: '#e06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10
  },
  btnCerrarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  contenido: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  campo: {
    marginBottom: 10
  },
  label: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '600',
    fontSize: 12
  },
  valor: {
    fontWeight: '700',
    fontSize: 20,
    color: '#334155'
  }
})

export default InformacionPaciente


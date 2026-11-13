/**
 * Representa un paciente / cita veterinaria en la aplicación.
 */
export interface PacienteType {
  /** Identificador único del paciente */
  id: string;
  /** Nombre del paciente (mascota) */
  paciente: string;
  /** Nombre del propietario */
  propietario: string;
  /** Email del propietario */
  email: string;
  /** Teléfono de contacto */
  telefono: string;
  /** Fecha de alta de la cita */
  fecha: Date;
  /** Descripción de síntomas */
  sintomas: string;
}

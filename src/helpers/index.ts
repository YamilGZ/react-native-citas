/**
 * Formatea una fecha a texto legible en español.
 * @param fecha - Fecha a formatear (Date, string o number).
 * @returns Fecha formateada en formato local español.
 */
export const formatearFecha = (fecha: Date | string | number): string => {
  const nuevaFecha = new Date(fecha);
  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return nuevaFecha.toLocaleDateString('es-ES', opciones);
};

export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    // Convertir la fecha ISO a un objeto Date
    const date = new Date(dateString);
    
    // Asegurarse de que es una fecha válida
    if (isNaN(date.getTime())) return dateString;
    
    // Obtener los componentes de la fecha
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    // Retornar en formato dd-MM-yyyy
    return `${day}/${month}/${year}`;
};

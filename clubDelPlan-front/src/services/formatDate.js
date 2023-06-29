export const formatDate = (date) => {
  date = date.slice(0, 10);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  date = date.split("-");
  const day = parseInt(date[2], 10);
  const month = months[parseInt(date[1], 10) - 1];
  const year = date[0];
  return `${day} de ${month} de ${year}`;
};

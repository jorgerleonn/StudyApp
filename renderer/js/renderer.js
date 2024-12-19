const { ipcRenderer } = require('electron');

console.log('hoala');

function enviar_fecha(){
  window.electron.recibirFecha().then(fechaFormateada => {
    document.getElementById('fecha').innerText = `${fechaFormateada}`;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.getElementById('subjects');

  selectElement.addEventListener('change', () => {
    const selectedValue = selectElement.value;
    console.log('Asignatura seleccionada', selectedValue);

    ipcRenderer.send('asignatura-seleccionada', selectedValue);
  });

  if (!selectElement) {
    console.error('No se encontró el elemento <select> CON ID "subjects"');
    return;
  }

  console.log('El combo <select> está accesible');
});



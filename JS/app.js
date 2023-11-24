// Configuración de Firebase
function initializeFirebase() {
    // Configuración de Firebase con las credenciales y detalles de la base de datos
    const firebaseConfig = {
        apiKey: "AIzaSyBDjsg7AKkipf8sw6NkuogY908kbSAGxXs",
        authDomain: "invernadero-iot-2024.firebaseapp.com",
        databaseURL: "https://invernadero-iot-2024-default-rtdb.firebaseio.com",
        projectId: "invernadero-iot-2024",
        storageBucket: "invernadero-iot-2024.appspot.com",
        messagingSenderId: "393435162252",
        appId: "1:393435162252:web:e9a0eb564923074eccbda9"
      };

    // Inicializa Firebase con la configuración proporcionada
    firebase.initializeApp(firebaseConfig);

    // Referencia a la base de datos de Firebase
    const database = firebase.database();

    // Referencias a los nodos específicos en la base de datos
    const bmbRef = database.ref('Invernadero/Actuador/Bomba');
    const focoRef = database.ref('Invernadero/Actuador/Luz')
    const humedadRef = database.ref('Invernadero/Sensores/Humedad');
    const luzRef = database.ref('Invernadero/Sensores/Luz');
    const variableSPRef = database.ref('Invernadero/Variable/sP');

    // Escucha cambios en el estado de la bomba y actualiza la interfaz de usuario
    bmbRef.on('value', (snapshot) => {
        const estadoBomba = snapshot.val();
        document.getElementById('estadoBomba').innerText = `Estado de la bomba: ${estadoBomba}`;
    });

    // Escucha cambios en el estado del foco y actualiza la interfaz de usuario
    focoRef.on('value', (snapshot) => {
        const estadoFoco = snapshot.val();
        document.getElementById('estadoFoco').innerText = `Estado del foco: ${estadoFoco}`;
    });

    // Escucha cambios en el valor del sensor de Humedad y actualiza la interfaz de usuario
    humedadRef.on('value', (snapshot) => {
        const valorHumedad = snapshot.val();
        document.getElementById('valorHumedad').innerText = `Porcentaje de humedad: ${valorHumedad} %`;
    });
    // Escucha cambios en el valor del sensor de luz y actualiza la interfaz de usuario
    luzRef.on('value', (snapshot) => {
        const valorLuz = snapshot.val();
        document.getElementById('valorLuz').innerText = `Porcentaje de luz: ${valorLuz} %`;
    });

    // Actualiza la variable sP en la base de datos según el nuevo valor ingresado en la interfaz
    window.actualizarVariableSP = function () {
        const nuevoValorSP = document.getElementById('nuevoValorSP').value;
        variableSPRef.set(parseInt(nuevoValorSP, 10));
    };
    // Escucha los cambios echos en las variables y los muestra en la interfaz
    variableSPRef.on('value', (snapshot) => {
        const valorVariable = snapshot.val();
        document.getElementById('valorVariable').innerText = `Valor de la Variable: ${valorVariable}`;
    });
    
}

// Scripts de Firebase
const firebaseScript = document.createElement('script');
// Carga el script de Firebase App y espera a que se cargue antes de continuar con el siguiente script
firebaseScript.src = 'https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js';
firebaseScript.onload = () => {
    const databaseScript = document.createElement('script');
    // Carga el script de Firebase Database y, una vez cargado, ejecuta la inicialización de Firebase
    databaseScript.src = 'https://www.gstatic.com/firebasejs/8.6.2/firebase-database.js';
    databaseScript.onload = initializeFirebase;
    document.head.appendChild(databaseScript);
};
// Agrega el script de Firebase App al encabezado del documento
document.head.appendChild(firebaseScript);


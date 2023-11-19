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
    const ledRef = database.ref('Invernadero/Actuador/Led');
    const potenciometroRef = database.ref('Invernadero/Sensores/Potenciometro');
    const variableSPRef = database.ref('Invernadero/Variable/sP');

    // Escucha cambios en el estado del LED y actualiza la interfaz de usuario
    ledRef.on('value', (snapshot) => {
        const estadoLed = snapshot.val();
        document.getElementById('estadoLed').innerText = `Estado del LED: ${estadoLed}`;
    });

    // Escucha cambios en el valor del potenciómetro y actualiza la interfaz de usuario
    potenciometroRef.on('value', (snapshot) => {
        const valorPotenciometro = snapshot.val();
        document.getElementById('valorPotenciometro').innerText = `Valor del Potenciómetro: ${valorPotenciometro}`;
    });

    // Actualiza la variable sP en la base de datos según el nuevo valor ingresado en la interfaz
    window.actualizarVariableSP = function () {
        const nuevoValorSP = document.getElementById('nuevoValorSP').value;
        variableSPRef.set(parseInt(nuevoValorSP, 10));
    };
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
    // Agrega el script de Firebase Database al encabezado del documento
    document.head.appendChild(databaseScript);
};
// Agrega el script de Firebase App al encabezado del documento
document.head.appendChild(firebaseScript);


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
    const variableSPRef = database.ref('Invernadero/Variable/sP');
    const variableBmbRef = database.ref('Invernadero/Variable/Bmb');

    // Actualiza la variable sP en la base de datos según el nuevo valor ingresado en la interfaz
    window.actualizarVariableSp = function () {
        const nuevoValorSP = document.getElementById('nuevoValorSp').value;
        variableSPRef.set(parseInt(nuevoValorSP, 10));
    };
    // Escucha los cambios echos en las variables y los muestra en la interfaz
    variableSPRef.on('value', (snapshot) => {
        const valorVariableLuz = snapshot.val();
        document.getElementById('valorVariableLuz').innerText = `Nueva variable para la luz: ${valorVariableLuz}`;
    });

    // Actualiza la variable sP en la base de datos según el nuevo valor ingresado en la interfaz
    window.actualizarVariableBmb = function () {
        const nuevoValorSP = document.getElementById('nuevoValorBmb').value;
        variableBmbRef.set(parseInt(nuevoValorSP, 10));
    };
    // Escucha los cambios echos en las variables y los muestra en la interfaz
    variableBmbRef.on('value', (snapshot) => {
        const valorVariableBomba = snapshot.val();
        document.getElementById('valorVariableBomba').innerText = `Nueva variable para la humedad: ${valorVariableBomba}`;
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


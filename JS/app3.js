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
    const bombaRef = database.ref('Invernadero/Actuador/Bomba');
    const focoRef = database.ref('Invernadero/Actuador/Luz');
    const humedadRef = database.ref('Invernadero/Sensores/Humedad');
    const luzRef = database.ref('Invernadero/Sensores/Luz');
    const datosRef = database.ref('Invernadero/Datos');

    // Escucha cambios en los datos almacenados en Firebase y actualiza la tabla
    datosRef.on('value', (snapshot) => {
        const datos = snapshot.val();
        if (datos) {
            // Limpia la tabla antes de agregar los nuevos registros
            limpiarTabla();

            // Itera sobre los registros en la base de datos y los agrega a la tabla
            Object.keys(datos).forEach((key) => {
                const registro = datos[key];
                const fecha = registro.fecha;
                const estadoBomba = registro.estadoBomba !== undefined ? registro.estadoBomba : '-';
                const estadoFoco = registro.estadoFoco !== undefined ? registro.estadoFoco : '-';
                const valorHumedad = registro.valorHumedad !== undefined ? registro.valorHumedad : '-';
                const valorLuz = registro.valorLuz !== undefined ? registro.valorLuz : '-';
                agregarFilaATabla(fecha, estadoBomba, estadoFoco, valorHumedad, valorLuz);
            });
        }
    });

    // Escucha cambios en el estado de la bomba y actualiza la tabla y Firebase
    bombaRef.on('value', (snapshotBomba) => {
        const estadoBomba = snapshotBomba.val();
        focoRef.once('value').then((snapshotFoco) => {
            const estadoFoco = snapshotFoco.val();
            humedadRef.once('value').then((snapshotHumedad) => {
                const valorHumedad = snapshotHumedad.val();
                luzRef.once('value').then((snapshotLuz) => {
                    const valorLuz = snapshotLuz.val();
                    actualizarTablaYFirebase(estadoBomba, estadoFoco, valorHumedad, valorLuz);
                });
            });
        });
    });

    // Escucha cambios en el estado del foco y actualiza la tabla y Firebase
    focoRef.on('value', (snapshotFoco) => {
        const estadoFoco = snapshotFoco.val();
        bombaRef.once('value').then((snapshotBomba) => {
            const estadoBomba = snapshotBomba.val();
            humedadRef.once('value').then((snapshotHumedad) => {
                const valorHumedad = snapshotHumedad.val();
                luzRef.once('value').then((snapshotLuz) => {
                    const valorLuz = snapshotLuz.val();
                    actualizarTablaYFirebase(estadoBomba, estadoFoco, valorHumedad, valorLuz);
                });
            });
        });
    });

    // Escucha cambios en el valor del sensor de humedad y actualiza la tabla y Firebase
    humedadRef.on('value', (snapshotHumedad) => {
        const valorHumedad = snapshotHumedad.val();
        bombaRef.once('value').then((snapshotBomba) => {
            const estadoBomba = snapshotBomba.val();
            focoRef.once('value').then((snapshotFoco) => {
                const estadoFoco = snapshotFoco.val();
                luzRef.once('value').then((snapshotLuz) => {
                    const valorLuz = snapshotLuz.val();
                    actualizarTablaYFirebase(estadoBomba, estadoFoco, valorHumedad, valorLuz);
                });
            });
        });
    });

    // Escucha cambios en el valor del sensor de luz y actualiza la tabla y Firebase
    luzRef.on('value', (snapshotLuz) => {
        const valorLuz = snapshotLuz.val();
        bombaRef.once('value').then((snapshotBomba) => {
            const estadoBomba = snapshotBomba.val();
            focoRef.once('value').then((snapshotFoco) => {
                const estadoFoco = snapshotFoco.val();
                humedadRef.once('value').then((snapshotHumedad) => {
                    const valorHumedad = snapshotHumedad.val();
                    actualizarTablaYFirebase(estadoBomba, estadoFoco, valorHumedad, valorLuz);
                });
            });
        });
    });
}

// Actualiza la tabla y Firebase con el estado de los actuadores y el valor de los sensores
function actualizarTablaYFirebase(estadoBomba, estadoFoco, valorHumedad, valorLuz) {
    const fecha = obtenerFechaActual();

    // Almacena los datos en Firebase
    const datosRef = firebase.database().ref('Invernadero/Datos');
    datosRef.push({
        fecha: fecha,
        estadoBomba: estadoBomba,
        estadoFoco: estadoFoco,
        valorHumedad: valorHumedad,
        valorLuz: valorLuz
    });
}

// Limpia todas las filas de la tabla excepto la primera (encabezados)
function limpiarTabla() {
    const tabla = $('#tablaDatos').DataTable();
    tabla.clear().draw();
}

// Agrega una fila a la tabla con la fecha, el estado de los actuadores y el valor de los sensores
function agregarFilaATabla(fecha, estadoBomba, estadoFoco, valorHumedad, valorLuz) {
    const tabla = $('#tablaDatos').DataTable();
    tabla.row.add([fecha, estadoBomba, estadoFoco, valorHumedad, valorLuz]).draw(false);

    // Ordena la tabla por la primera columna (fecha) en orden descendente (más reciente a más antiguo)
    tabla.order([0, 'desc']).draw();
}


// Obtiene la fecha y hora actual en un formato específico
function obtenerFechaActual() {
    const ahora = new Date();
    const opcionesFecha = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    return ahora.toLocaleDateString('es-ES', opcionesFecha);
}

// Inicializa Firebase y la escucha de cambios
window.onload = function () {
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
};

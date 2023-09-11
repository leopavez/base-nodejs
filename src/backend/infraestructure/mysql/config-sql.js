import mysql from 'mysql';

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'almacen_eltata',
    user: 'root',
    password: '',
});

conexion.connect(function (err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado correctamente a MySQL con el identificador ' + conexion.threadId);
});

export default conexion;

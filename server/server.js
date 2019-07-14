//var PORT = require("config/index");  // como no se esta exportando no se utiliza variable
const path = require('path');
require("./config/index");
var express = require('express');
var Server = express();
var datos = require("../public/data.json");
/* Hay que colocar este require para poder recibir los valores de busqueda */
var bodyParser = require('body-parser')

/* Estas 2 lineas hay que colocarlas para que node pueda recibir los valores de los filtros */
Server.use(bodyParser.urlencoded({ extended: false }))
Server.use(bodyParser.json())

/*  */
Server.use(express.static(path.join(__dirname, '../public')));


Server.get('/', function(req, res) {
    res.send('El servidor esta ejecutandose...');
    //res.json({nombre: "Mario", dato: "valor"}) //
    //res.json({dato:array_de_datos}) // Presenta en la web el arreglo anterior
    //res.json(datos) //Obtiene los datos del archivo: data.json

    //var arrayOrdenado = sortJSON(res,'Ciudad','asc')
    //showResult(arrayOrdenado);
});

//ruta  '/BienesRaices'
Server.post('/BienesRaices', function(req, res) {
    /* Dentro de req estan los valores de busqueda dentro del atributo body, aqui se asigna dentro de la variable busqueda para un mejor acceso*/
    var busqueda = req.body;
    /* Esta variable  filtrado es la que tendra el valor del filtrado*/
    var filtrado = [];
    for (let i = 0; i < datos.length; i++) {
        /* Este if es para validad si el valor de ciudad esta declarado */
        if (busqueda.ciudad) {
            /* Este if valida si la ciudad del inmuble actual es diferente al valor de ciudad buscado
            continua con el siguiente inmueble usando la sentencia continue  */
            if (datos[i].Ciudad != busqueda.ciudad) {
                continue;
            }
        }

         /* Este if es para validad si el valor de tipo esta declarado */
        if (busqueda.tipo) {
            /* Este if valida si la tipo del inmuble actual es diferente al valor de tipo buscado
            continua con el siguiente inmueble usando la sentencia continue  */
            if (datos[i].Tipo != busqueda.tipo) {
                continue;
            }
        }

        //FILTRAMOS POR USANDO EL RANGO DE PRECIO
        //if (busqueda.precio){        
        if(busqueda.ciudad =="" && busqueda.tipo ==""){
            
            var v1 =datos[i].Precio;

            //primer paso: fuera puntos
            v1 = v1.replace(",","");
            v1 = v1.replace("$","");
            v1=parseInt(v1);

            //console.log (v1 + " " + parseInt(busqueda.from) + " " +  parseInt(busqueda.to));
            //if (parseInt(datos[i].Precio) >= busqueda.from && parseInt(datos[i].Precio) <= busqueda.to) {
            if (v1 >= parseInt(busqueda.from) && v1 <= parseInt(busqueda.to)) {                  
                  //console.log (v1 + " " + parseInt(busqueda.from) + " " +  parseInt(busqueda.to));
            }else{continue;}
        }

        filtrado.push(datos[i])
    }
    res.json(filtrado);
});



Server.listen(process.env.PORT, (err) => {
    console.log("Servidor ejecutandose en el puerto: " + process.env.PORT)
    if (err) console.log("ERRROR: ", err);
})


//para que practiques a crear diferentes rutas, se abre el navegador 
//y simplemente al llamar localhost:8082/user
//Server.get("/mario")
/*
Server.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
*/


/* dada por el tutor

//FILTRAMOS POR USANDO EL RANGO DE PRECIO
var precio = datos[i].Precio.replace("$", "").replace(",", "");
var from = busqueda.from.substr(1);
var to = busqueda.to.substr(1);
if (busqueda.from) {
if (parseFloat(precio) >= parseFloat(from) && parseFloat(precio) <= parseFloat(to)) {

} else { continue; }
}
*/
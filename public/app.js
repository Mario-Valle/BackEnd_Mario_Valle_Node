//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    prefix: "$"
})

function setSearch() {
    let busqueda = $('#checkPersonalizada')
    busqueda.on('change', (e) => {
        if (this.customSearch == false) {
            this.customSearch = true
        } else {
            this.customSearch = false
        }
        $('#personalizada').toggleClass('invisible')
    })
}

setSearch()

//+++++++++++++++++++++++++++++++++++++++++++++++++

//CARGAMOS LOS SELECT
function init() {
    var tipos = [];
    var ciudades = [];
    $.get('data.json', function(data) {
        for (let i = 0; i < data.length; i++) {
            if (tipos.indexOf(data[i].Tipo) === -1) tipos.push(data[i].Tipo);
            if (ciudades.indexOf(data[i].Ciudad) === -1) ciudades.push(data[i].Ciudad);
        }
        for (let i = 0; i < ciudades.length; i++) {
            $('#ciudad').append('<option value="' + ciudades[i] + '">' + ciudades[i] + '</option>');
        }
        for (let j = 0; j < tipos.length; j++) {
            $('#tipo').append('<option value="' + tipos[j] + '">' + tipos[j] + '</option>');
        }
        $('select').material_select();
    });
}


//LLAMAMOS A LAS FUNCIONES DEL SLIDER Y CARGAMOS LOS SELECT AL CARGAR LA PAGINA
$(document).ready(function() {
    //inicializarSlider();
    init();
});

//AGREGAMOS Y RENDERIZAMOS LOS RESULTADOS EN EL DOM
function showResult(array) {
    $('.lista').empty();
    for (let i = 0; i < array.length; i++) {
        $('.lista').append(`<div class="card horizontal">
            <div class="card-image place-wrapper">
                <img class="img-responsive place-image" src="img/${array[i].Ciudad}.jpg">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>
                        <b>Dirección: </b>${array[i].Direccion}<br>
                        <b>Ciudad: </b>${array[i].Ciudad}<br>
                        <b>Teléfono: </b>${array[i].Telefono}<br>
                        <b>Código Postal: </b>${array[i].Codigo_Postal}<br>
                        <b>Tipo: </b>${array[i].Tipo}<br>
                        <span class="price"><b>Precio: </b>${array[i].Precio}</span>
                    </p>
                </div>
                <div class="card-action">
                    <a>Ver mas</a>
                </div>
            </div>
        </div>`);
    }
}

/*
//MOSTRAMOS TODOS LOS RESULTADOS SIN FILTRO
$('#mostrarTodos').click(function(){
    $.get('data.json', function(data){
        //showResult(data); //Lo muestra desordenado por eso uso la sg funcion de ordenamiento

        function sortJSON(data, key, orden) {
            return data.sort(function (a, b) {
                var x = a[key],
                y = b[key];

                if (orden === 'asc') {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                }

                if (orden === 'desc') {
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                }
            });
        }        
        var arrayOrdenado = sortJSON(data,'Ciudad','asc')
        showResult(arrayOrdenado);
        //FIn de ordenacion
    });    
});

*/



//FUNCION PARA LA BUSQUEDA POR FILTRO.
$('#buscar').click(function() {
    //Asignamos los valores del select del html
    let ciudad = $('#ciudad option:selected').val();
    let tipo = $('#tipo option:selected').val();
    //Seleccionamos el precio del input del hmtl
    let precio = $('#rangoPrecio').val();


// Saving it's instance to var
var slider = $("#rangoPrecio").data("ionRangeSlider");

// Get values
var from = slider.result.from;
var to = slider.result.to;
//alert("Los valores. " + from + " a " + to);


/*
   if (busqueda.precio) {
        if (datos[i].Precio >= from && datos[i].Precio<=to) {
                //
                //alert("Los valores. " + from + " a " + to);
        } else{continue;}
    }
*/

    $.ajax({
        url: '/BienesRaices',
        data: { ciudad: ciudad, tipo: tipo, precio: precio, from: from, to: to},
        type: 'POST',
        success: function(response) {            
            function sortJSON(data, key, orden) {
                return data.sort(function(a, b) {
                    var x = a[key],
                        y = b[key];

                    if (orden === 'asc') {
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    }

                    if (orden === 'desc') {
                        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                    }
                });
            }
            var arrayOrdenado = sortJSON(response, 'Ciudad', 'asc')
            showResult(arrayOrdenado);
        }
    });

});



//NO PROBADO



//var number = from; // int or float or string
//var format = '$#,###'; // you can put any format that you want... only string

//function ConvertNumber(number, format){
//    var tail=format.lastIndexOf('.');number=number.toString();
//    tail=tail>-1?format.substr(tail):'';
//    if(tail.length>0){if(tail.charAt(1)=='#'){
//       tail=number.substr(number.lastIndexOf('.'),tail.length);
//    }}
//    number=number.replace(/\..*|[^0-9]/g,'').split('');
 //   format=format.replace(/\..*/g,'').split('');
 //   for(var i=format.length-1;i>-1;i--){
//        if(format[i]=='#'){format[i]=number.pop()}
//    }
 //   return number.join('')+format.join('')+tail;
//    var ValorMin = number.join('')+format.join('')+tail;
//    alert("Los valores. " + ValorMin);
//}


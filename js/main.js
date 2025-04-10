const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const cuerpoTabla = document.getElementById("tablaListaCompras").getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
const btnClear = document.getElementById("btnClear");
//Numeración de la primera columna de la tabla
let cont = 0;
let costoTotal = 0;
let totalEnProductos = 0;
let datos = new Array();// [] Almacena elementos de la tabla

alertValidaciones.style.height="4rem";
alertValidacionesTexto.style.textAlign="center";

txtName.addEventListener("blur",formearTexto);
txtNumber.addEventListener("blur",formearTexto);

function formearTexto(event){
    event.target.value = event.target.value.trim();
}//formatearTexto

function validadCantidad(){
    let contenido = txtNumber.value;
    //longitud del campo
    if(contenido.length<1)
        return false;
    //es un número
    if(isNaN(contenido))
        return false;
    //es mayor que cero
    if(Number(contenido)<=0)
        return false;
    return true;
};//ValidarCantidad

function getPrecio(){
    return Math.round(10000*Math.random())/100;
};//getPrecio

btnAgregar.addEventListener("click",function(event){
    event.preventDefault();
    //bandera
    let isValid = true;
    
    //Deja los estilos por default del input de producto.
    txtName.style.border="";
    txtNumber.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";


    if(txtName.value.length < 3){
        txtName.style.border="solid medium rgb(224, 0, 0)";
        alertValidacionesTexto.innerHTML+=`<strong>El nombre del producto no es correcto.</strong>`;
        alertValidaciones.style.display="block";
        isValid=false;
    }
    if(! validadCantidad()){
        txtNumber.style.border="solid medium rgb(224, 0, 0)";
        alertValidacionesTexto.innerHTML+="<br /><strong>La cantidad no es correcta.</strong>";
        alertValidaciones.style.display="block";
        isValid=false;
    };//Validar cantidad

    if(isValid){
        cont ++;
        let precio = getPrecio();
        let producto = {
                        "cont":cont,
                        "nombre":txtName.value,
                        "cantidad":txtNumber.value,
                        "precio":precio
                        };

        cuerpoTabla.insertAdjacentHTML("beforeend",
            `<tr>
                <td>${producto.cont}</td>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio}</td>
            </tr>`
        );
        datos.push(producto);
        localStorage.setItem("datos",JSON.stringify(datos));//Almacena la lista de productos
        
        contadorProductos.innerText = cont;
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        let resumen = {
            "cont":cont,
            "totalEnProductos": totalEnProductos,
            "costoTotal": costoTotal
        }
        localStorage.setItem("resumen",JSON.stringify(resumen));// almacena el resumen de compra

        txtName.value = '';
        txtNumber.value = '';
        txtName.focus();//Selecciona el campo focus por defecto
    };//IsValid


});//btnAgregar

// window.addEventListener("load",function(event){
//     event.preventDefault();
//     datos =  JSON.parse(this.localStorage.getItem("datos")||[]);
//     resumen = JSON.parse(this.localStorage.getItem("resmen")||[]);
// });//window.

window.addEventListener("load", function(event){
    event.preventDefault();
    if(this.localStorage.getItem("datos")!= null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }
    datos.forEach((d)=>{
        let row=`<tr>
                    <td>${d.cont}</td>
                    <td>${d.nombre}</td>
                    <td>${d.cantidad}</td>
                    <td>${d.precio}</td>       
                </tr>`
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
    });
    if(this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        // let resumen = JSON. parse(this.localstorage.getItem"resumen")) ;
        costoTotal = resumen. costoTotal;
        totalEnProductos =resumen.totalEnProductos;
        cont = resumen. cont;
    }
    precioTotal.innerText = "$" + costoTotal.toFixed(2);  
    productosTotal.innerText = totalEnProductos;
    contadorProductos.innerText = cont;
})

//Agregar la funcionalidad del boton Limpiar Todo
//Resumen
//Tabla
//campos
//alerta
//localStorage

btnClear.addEventListener("click", function(event) {
    event.preventDefault();

    // Vaciar tabla
    cuerpoTabla.innerHTML = "";

    // Reiniciar contadores
    cont = 0;
    costoTotal = 0;
    totalEnProductos = 0;

    // Actualizar resumen en pantalla
    contadorProductos.innerText = cont;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = "$0.00";

    // Limpiar los campos
    txtName.value = "";
    txtNumber.value = "";
    txtName.style.border = "";
    txtNumber.style.border = "";

    // Ocultar alerta
    alertValidaciones.style.display = "none";
    alertValidacionesTexto.innerHTML = "";

    // Limpiar datos y almacenamiento
    datos = [];
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");

    // Dar foco al campo de nombre
    txtName.focus();
});
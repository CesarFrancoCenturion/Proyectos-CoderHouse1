//en esta verduleria solo se vende a kilos, menos no, solo kilos enteros (no medio kilo, ni tres cuartos, y tampoco un cuarto)


const papa = 500
const zapallo = 400
const lechuga = 600
const tomate = 1000


let precioFinal = 0
const verduras = []  


//funcion para comprar las verduras y agregar verduras a la lista de compra
function comprarVerdura (verdura, cantidad) {
    let costoDeVerduraElegida = 0 
    
//para que sea reconocida la verdura que ingresa el usuario por el string  
const verduraEnMinusculas = verdura.toLowerCase()

    if (verduraEnMinusculas === "papa"){
        costoDeVerduraElegida = papa*cantidad
        
        }else if ( verduraEnMinusculas === "zapallo"){
            costoDeVerduraElegida = zapallo*cantidad

        }else if (verduraEnMinusculas === "lechuga"){
            costoDeVerduraElegida = lechuga*cantidad

        }else if (verduraEnMinusculas === "tomate"){
            costoDeVerduraElegida = tomate*cantidad
        
        }else {
            alert("esa verdura no esta disponible o la escribiste mal, elija una de las verduras que se muestran en pantalla")
        }        
    verduras.push(verduraEnMinusculas)  
        return costoDeVerduraElegida
      
}

//funcion mostrar lista de compras
function listaDeCompras (){
   if(verduras.length === 0) {
    return "tu lista de compras esta vacia"
    
    }else{
        return "tus verduras son: " + verduras.join(" , ")
    }  
}

//menu de opciones para el cliente
let menu  

while (menu !==4){
       menu = parseInt(prompt("ingrese la opcion deseada: \n1) comprar las verduras \n2) ver la lista de sus verduras\n3) precio total a pagar: \n4) terminar compra "))
switch(menu){
    
    case 1:
        let verduraComprada = prompt("ingrese la verdura que quiere comprar:\n1) papa\n2) zapallo\n3) lechuga\n4) tomate")
        let kilosComprados = parseInt(prompt("ingrese los KILOS que quiere comprar"))
        
        //realiza la compra 
        const costoDeLaCompra = comprarVerdura(verduraComprada, kilosComprados)
            if(costoDeLaCompra > 0 ){
                precioFinal = precioFinal+costoDeLaCompra
            alert(`la verdura elegida es: ${verduraComprada}\n la cantidad de kilos es: ${kilosComprados}\n el precio de la compra es: ${costoDeLaCompra} `)
            }
       
        break 

    case 2:
        alert(listaDeCompras())
        break

    case 3: 
        alert(`el precio final a pagar es: ${precioFinal}`)
        break

    case 4:
        alert("gracias por su compra :)")
        break
        
    default:
        alert("opcion no valida. Elegir una opcion del 1 al 5")
        
    }


}

 


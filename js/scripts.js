//contact
let mensajeContact = document.getElementById('notificacionContacto');
let nombreContact = document.getElementById('confirmacionContacto');

//valores form
let userContact = document.getElementById('nombreForm');
let lastNameContact = document.getElementById('apellidoForm');
let cellContact = document.getElementById('numeroForm')
let emailContact = document.getElementById('eMailForm');

let btnContact = document.getElementById('contactando');

if (btnContact) {
    btnContact.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('user', userContact.value);
        localStorage.setItem('apellidos', lastNameContact.value);
        localStorage.setItem('celular', cellContact.value);
        localStorage.setItem('email', emailContact.value);
        let saludoUser = localStorage.getItem('user');
        mensajeContact.innerHTML = '<h2>¡GRACIAS ' + saludoUser + '!</h2> <p>Nos pondremos en contacto.</p>';
    });
}

//valores form productos
let userProduct = document.getElementById('nombreForm');
let lastNameProduct = document.getElementById('apellidoForm');
let cellProduct = document.getElementById('numeroForm')
let emailProduct = document.getElementById('eMailForm');
let datosFactura = document.getElementById('datosFactura')
let datosFacturaTotal = document.getElementById('datosFacturaTotal')

let btnPagar = document.getElementById('pagarCarro');

let sumar = function (n1, n2) {
    return n1 + n2
}

//funcion constructora
function darPorcentaje(a, b) {
    let descuento = a * b;
    return descuento;
}



function aplicarPromo(a, b) {
    let totalAplicado = a - b;
    return totalAplicado;
}

// factura;

if (btnPagar) {
    btnPagar.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('user', userProduct.value);
        localStorage.setItem('apellidos', lastNameProduct.value);
        localStorage.setItem('celular', cellProduct.value);
        localStorage.setItem('email', emailProduct.value);
        let user = localStorage.getItem('user');
        let apellidos = localStorage.getItem('apellidos');
        let celular = localStorage.getItem('celular');
        let email = localStorage.getItem('email');

        let total = carritoCompras.reduce(sumar);

        let promoPar = carritoCompras.length;
        let porciento;
        let porciento2;

        while (promoPar > 1) {
            porciento = "20%"
            porciento2 = .2
            break;
        }

        let totalMenosDescuento = aplicarPromo(total, darPorcentaje(total, porciento2));

        let carroFact = document.getElementById('productosFact')

        datosFactura.innerHTML = '<h1>Factura</h1>' + '<p>Nombre: ' + user + '</p><p>Apellidos: ' + apellidos + '</p><p>Celular de contacto: ' + celular + '</p><p>E-m@il: ' + email;

        datosFacturaTotal.innerHTML = '<p>Total: $' + total + '.00</p>';

        if (porciento == "20%") {
            datosFacturaTotal.innerHTML += '<p>Descuento: ' + porciento + '</p><p>Total con descuento aplicado: $' + totalMenosDescuento + '</p>'
        }

        for (i = 0; i < carritoComprasDatos.length; i++) {
            let momento = carritoComprasDatos[i];
            carroFact.innerHTML += '<p>' + momento + '</p>';
        }

    });
}

//sweet alert
if (btnPagar) {
    btnPagar.addEventListener('click', () => {
        Swal.fire(
            'Felicidades!',
            'Su factura se ha generado!',
            'success'
        )
    })
}

//selectores de productos
let btnNike = document.getElementById('btnNike')
let btnAdidas = document.getElementById('btnAdidas')
let btnSketchers = document.getElementById('btnSketchers')



let cuadroCarrito = document.getElementById('carroDeComprasTenis')

let varCarrito = 0;
let varCarritoDatos = 0;

//array productos

const carritoCompras = [0]
const carritoComprasDatos = []

//fetch
const lista = document.querySelector(".productosData")


const esperarApi = async () => {
    const resp = await fetch("../data.json");
    const data = await resp.json();

    data.forEach((producto) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card">
            <div><img src="${producto.img}" alt="${producto.nombre}"></div>
            <div class="infoProduct">
                <h2>${producto.nombre}</h2>
                <div class="costo">
                    <h2>$${producto.precio}</h2>
                </div>
            </div>
        </div>

        
        `;

        lista.append(div);
    })

    const carroNike = data[0]
    const carroAdidas = data[1]
    const carroSketchers = data[2]

    if (btnNike) {
        btnNike.addEventListener('click', () => {
            cuadroCarrito.innerHTML += `<div class="cardShop"><img src="${carroNike.img}" alt="tenis adidas"><div><p>Modelo:${carroNike.nombre}</p><p>costo:$${carroNike.precio}</p></div></div>`
            carritoCompras[varCarrito] = parseInt(`${carroNike.precio}`);
            varCarrito = varCarrito + 1;
            carritoComprasDatos.push(`Tenis: ${carroNike.nombre}. ${carroNike.precio}`)
        })
    }

    if (btnAdidas) {
        btnAdidas.addEventListener('click', () => {
            cuadroCarrito.innerHTML += `<div class="cardShop"><img src="${carroAdidas.img}" alt="tenis adidas"><div><p>Modelo:${carroAdidas.nombre}</p><p>costo:$${carroAdidas.precio}</p></div></div>`
            carritoCompras[varCarrito] = parseInt(`${carroAdidas.precio}`);
            varCarrito = varCarrito + 1;
            carritoComprasDatos.push(`Tenis: ${carroAdidas.nombre}. ${carroAdidas.precio}`)
        })
    }

    if (btnSketchers) {
        btnSketchers.addEventListener('click', () => {
            cuadroCarrito.innerHTML += `<div class="cardShop"><img src="${carroSketchers.img}" alt="tenis adidas"><div><p>Modelo:${carroSketchers.nombre}</p><p>costo:$${carroSketchers.precio}</p></div></div>`
            carritoCompras[varCarrito] = parseInt(`${carroSketchers.precio}`);
            varCarrito = varCarrito + 1;
            carritoComprasDatos.push(`Tenis: ${carroSketchers.nombre}. ${carroSketchers.precio}`)
        })
    }
}

esperarApi();
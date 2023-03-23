let ma,
	mg = null;
let ml = null;
let mac,
	mma = null;
let mar = null;
let mm,
	mt = null;
let mev,
	mcp,
	mc,
	mv = null;

const venta = document.getElementById('venta');
venta.addEventListener('click', () => {
	cambiarVenta();
});

const cambiarVenta = async () => {
	NProgress.start();
	const res = await fetch('./venta/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de venta.controller.js con un import dinamico
	const obj = await import('./venta/venta.controller.js');
	mv = obj;
	mv.getAll();
	// ma = obj;
	// ma.tablaEmpleado('1');
	NProgress.done();
	//guardar en el localstorage la vista actual
	localStorage.setItem('vistaActual', 'venta');
};

const empleado = document.getElementById('empleado');
empleado.addEventListener('click', () => {
	cambiarEmpleado();
});
const cambiarEmpleado = async () => {
	NProgress.start();
	const res = await fetch('./empleado/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de empleado.controller.js con un import dinamico
	const obj = await import('./empleado/empleado.controller.js');
	ma = obj;
	ma.tablaEmpleado('1');
	NProgress.done();
	//guardar en el localstorage la vista actual
	localStorage.setItem('vistaActual', 'empleado');
};

const lenteContacto = document.getElementById('lenteContacto');
lenteContacto.addEventListener('click', () => {
	cambiarLenteContacto();
});
const cambiarLenteContacto = async () => {
	NProgress.start();
	//cargamos el html de lenteContacto en el div app
	const res = await fetch('./lenteContacto/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de lenteContacto.controller.js con un import dinamico cada vez que se cambie de vista
	const obj = await import(
		'./lenteContacto/lenteContacto.controller.js'
	);
	ml = obj;
	ml.tablaLenteC('1');
	NProgress.done();
	//guardar en el localstorage la vista actual
	localStorage.setItem('vistaActual', 'lenteContacto');
};

const accesorio = document.getElementById('accesorio');
accesorio.addEventListener('click', () => {
	cambiarAccesorio();
});
const cambiarAccesorio = async () => {
	NProgress.start();
	//cargamos el html de accesorio en el div app
	const res = await fetch('./accesorio/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de accesorio.controller.js con un import dinamico cada vez que se cambie de vista
	const obj = await import('./accesorio/accesorio.controller.js');
	mac = obj;
	mac.tablaAccesorio('1');
	NProgress.done();
	//guardar en el localstorage la vista actual
	localStorage.setItem('vistaActual', 'accesorio');
};

const armazon = document.getElementById('armazon');
armazon.addEventListener('click', () => {
	cambiarArmazon();
});
const cambiarArmazon = async () => {
	NProgress.start();
	//cargamos el html de armazon en el div app
	const res = await fetch('./armazon/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de armazon.controller.js con un import dinamico cada vez que se cambie de vista
	const obj = await import('./armazon/armazon.controller.js');
	mar = obj;
	mar.getAll(1);
	NProgress.done();
	//guardar en el localstorage la vista actual
	localStorage.setItem('vistaActual', 'armazon');
};

const cargarHome = () => {
	window.location.replace('../modulos/');
};

async function cerrarSesion() {
	const currentUser = localStorage.getItem('currentUser');
	if (currentUser == null || currentUser == '') {
		window.location.replace('../');
	}
	NProgress.start();
	const data = await fetch(
		'http://localhost:8080/Optik/api/login/logout',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				datosUsuario: currentUser
			})
		}
	).then(resp => resp.json());
	if (data.response) {
		localStorage.setItem('vistaActual', '');
		localStorage.setItem('currentUser', '');
		window.location.replace('../');
	}
}

const material = document.getElementById('material');
material.addEventListener('click', () => {
	cambiarMaterial();
});
const cambiarMaterial = async () => {
	NProgress.start();
	const res = await fetch('./material/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de material.controller.js con un import dinamico
	const obj = await import('./material/material.controller.js');
	mm = obj;
	mm.getAll();
	NProgress.done();
	//guardar en el localstorage la vista actual
	localStorage.setItem('vistaActual', 'material');
};

const examenVista = document.getElementById('examenVista');
examenVista.addEventListener('click', () => {
	cambiarExamenVista();
});
const cambiarExamenVista = async () => {
	NProgress.start();
	const res = await fetch('./examenVista/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de examenVista.controller.js con un import dinamico
	const obj = await import('./examenVista/examenVista.controller.js');
	mev = obj;
	mev.inicializar();
	NProgress.done();
	//guardar en el localstorage la vista actual
	localStorage.setItem('vistaActual', 'examenVista');
};

const compraProducto = document.getElementById('compraProducto');
compraProducto.addEventListener('click', () => {
	cambiarCompraProducto();
});
const cambiarCompraProducto = async () => {
	NProgress.start();
	const res = await fetch('./compraProducto/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de compraProducto.controller.js con un import dinamico
	const obj = await import(
		'./compraProducto/compraProducto.controller.js'
	);
	mcp = obj;
	mcp.inicializar();
	NProgress.done();
	//guardar en el localstorage la vista actual
	localStorage.setItem('vistaActual', 'compraProducto');
};

const graduacion = document.getElementById('graduacion');
graduacion.addEventListener('click', () => {
	cambiarGraduacion();
});
const cambiarGraduacion = async () => {
	NProgress.start();
	const res = await fetch('./graduacion/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de graduacion.controller.js con un import dinamico
	const obj = await import('./graduacion/graduacion.controller.js');
	mg = obj;
	mg.getAll();
	NProgress.done();
	//guardar en el localstorage la vista actual
	localStorage.setItem('vistaActual', 'graduacion');
};

const cliente = document.getElementById('cliente');
cliente.addEventListener('click', () => {
	cambiarCliente();
});
const cambiarCliente = async () => {
	NProgress.start();
	const res = await fetch('./cliente/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de cliente.controller.js con un import dinamico
	const obj = await import('./cliente/cliente.controller.js');
	mc = obj;
	mc.getAll();
	NProgress.done();
	//guardar en el localstorage la vista actual
	localStorage.setItem('vistaActual', 'cliente');
};

const inicio = document.getElementById('inicio');
inicio.addEventListener('click', () => {
	cargarHome();
});
const cambiarHome = async () => {
	NProgress.start();
	//guardar en el localstorage la vista actual
	localStorage.setItem('vistaActual', 'inicio');
	const res = await fetch('./inicio/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	NProgress.done();
};

const ventaL = document.getElementById('ventaL');
ventaL.addEventListener('click', () => {
	cambiarVentaL();
});

const cambiarVentaL = async () => {
	NProgress.start();
	const res = await fetch('./ventaLentes/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de ventaLentes.controller.js con un import dinamico
	const obj = await import('./ventaLentes/ventaL.controller.js');
	mv = obj;
	mv.inicializarVentaLentes();
	NProgress.done();
	//guardar en el localstorage la vista actual
	localStorage.setItem('vistaActual', 'ventaLente');
};

const ventaLC = document.getElementById('ventaVC');
ventaLC.addEventListener('click', () => {
	cambiarVentaLC();
});

const cambiarVentaLC = async () => {
	NProgress.start();
	const res = await fetch('./ventaLentesC/index.html');
	const data = await res.text();
	document.getElementById('app').innerHTML = data;
	//cargar el script de ventaLentesC.controller.js con un import dinamico
	const obj = await import('./ventaLentesC/ventaLente.controller.js');
	mv = obj;
	mv.inicializarComponentes();
	NProgress.done();
	//guardar en el localstorage la vista actual
	localStorage.setItem('vistaActual', 'ventaLenteC');
};

function cargarVista() {
	const vista = localStorage.getItem('vistaActual');
	switch (vista) {
		case 'empleado':
			cambiarEmpleado();
			break;
		case 'armazon':
			cambiarArmazon();
			break;
		case 'accesorio':
			cambiarAccesorio();
			break;
		case 'lenteContacto':
			cambiarLenteContacto();
			break;
		case 'material':
			cambiarMaterial();
			break;
		case 'examenVista':
			cambiarExamenVista();
			break;
		case 'compraProducto':
			cambiarCompraProducto();
			break;
		case 'graduacion':
			cambiarGraduacion();
			break;
		case 'cliente':
			cambiarCliente();
			break;
		case 'inicio':
			cambiarHome();
			break;
		case 'venta':
			cambiarVenta();
			break;
		case 'ventaLente':
			cambiarVentaL();
			break;
		case 'ventaLenteC':
			cambiarVentaLC();
			break;
	}
}

//validar si en localstorage el token es igual a 1 si es asi cargar la vista si no redireccionar al login
const token = localStorage.getItem('currentUser');
if (token != '') {
	cargarVista();
} else {
	window.location.replace('../');
}

document.addEventListener('DOMContentLoaded', () => {
	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(
		document.querySelectorAll('.navbar-burger'),
		0
	);

	// Add a click event on each of them
	$navbarBurgers.forEach(el => {
		el.addEventListener('click', () => {
			// Get the target from the "data-target" attribute
			const target = el.dataset.target;
			const $target = document.getElementById(target);

			// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
			el.classList.toggle('is-active');
			$target.classList.toggle('is-active');
		});
	});
});

//agregar la clase has-text-link al a que tenga el id de la vista actual cada vez que se cargue la pagina
//cada vez que sea clickeado un a se debe eliminar la clase has-text-link de todos los a y agregarla al a clickeado

// const vistaActual = localStorage.getItem('vistaActual');
// const a = document.getElementById(vistaActual);
// a.classList.add('has-text-link');
// a.classList.add('has-text-weight-bold');
// const as = document.querySelectorAll('a');
// as.forEach(a => {
// 	a.addEventListener('click', () => {
// 		as.forEach(a => {
// 			a.classList.remove('has-text-link');
// 			a.classList.remove('has-text-weight-bold');
// 		});
// 		a.classList.add('has-text-link');
// 		a.classList.add('has-text-weight-bold');
// 	});
// });

//funcion que utilice memoization para que no se vuelva a ejecutar la funcion si los parametros son los mismos

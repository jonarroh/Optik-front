let productos = [];
let indexTV = 0;
let datos = '';
let ids = {
	ids: [],
	cantidad: [],
	precioUnitario: [],
	descuento: []
};

export function agregarProducto(indice) {
	datos +=
		/*HTML*/
		`
			<tr>
					<td>${productos[indice].codigoBarras} </td>
					<td>${productos[indice].nombre} </td>
					<td>${productos[indice].precioVenta} </td>
					<td>
					<input type="text" value="0"  class="input" id="descuento${indexTV}" onchange="mv.calcularTotal(${indice})"/></td>
					<td><input type="text" value="1" class="input" id="total${indexTV}" onchange="mv.calcularTotal(${indice})"/></td>
			</tr>
			`;
	indexTV++;
	ids.ids.push(indice);
	document.querySelector('#tbody2').innerHTML = datos;
	calcularTotal(indice);
}
// Función para validar que un valor sea un número positivo
const validarNumero = (valor, mensaje) => {
	if (isNaN(valor) || valor < 0) {
		mostrarAlerta('error', mensaje);
		return false;
	}
	return true;
};

// Función para validar la cantidad de productos
const validarCantidad = (cantidad, existencias) => {
	if (cantidad > existencias) {
		mostrarAlerta('error', 'Cantidad no valida en inventario');
		return false;
	}
	return true;
};

// Función para calcular el total de la venta
// Función para calcular el total de la venta
export const calcularTotal = index => {
	//hacemos un array con las celdas de la tabla
	const productos2 = Array.from(
		document.querySelectorAll('#tbody2 tr')
	);
	//obtenemos el total anterior en caso de que haya un error
	const totalAnterior = Number(
		document.querySelector('#total').innerHTML
	);
	//recorremos el array de celdas
	//usamos reduce ya que nos permite obtener un valor final
	//y en cada iteración podemos obtener el valor anterior
	const total = productos2.reduce((accum, tr, indexVt) => {
		const precioVenta = Number(tr.children[2].innerHTML);
		const cantidad = Number(
			document.getElementById(`total${indexVt}`).value
		);
		const descuento = Number(
			document.querySelector(`#descuento${indexVt}`).value
		);

		if (
			!validarNumero(cantidad, 'Cantidad no valida') ||
			!validarCantidad(cantidad, productos[index].existencias) ||
			!validarNumero(descuento, 'Descuento no valido')
		) {
			return totalAnterior;
		}

		const preDescuento = descuento / 100;
		// Check if the product has already been added to the ids object
		const existingIndex = ids.ids.indexOf(index);
		if (existingIndex !== -1) {
			// Replace the previous values for this product
			ids.cantidad[existingIndex] = cantidad;
			ids.precioUnitario[existingIndex] = precioVenta;
			ids.descuento[existingIndex] = descuento;
		} else {
			// Add a new entry for this product
			ids.ids.push(index);
			ids.cantidad.push(cantidad);
			ids.precioUnitario.push(precioVenta);
			ids.descuento.push(descuento);
		}
		return accum + precioVenta * cantidad * (1 - preDescuento);
	}, 0);

	document.querySelector('#total').innerHTML = `${total}`;
};

let p = document.getElementById('buscarP');
console.log(p);

function fillTable(producto) {
	let contenido = '';

	producto.forEach((e, i) => {
		contenido +=
			/*html*/
			`
			<tr>
					<td>${e.codigoBarras} </td>
					<td>${e.nombre} </td>
					<td>${e.precioVenta} </td>
					<td> <button class="button is-primary has-icons-left " onclick="mv.agregarProducto(${i})" type='button'><span class="icon is-left pt-2">
					<icon-check></icon-check>
				</span></button></td>
			`;

		document.querySelector('tbody').innerHTML = contenido;
	});
}
export async function getAll() {
	const data = await fetch(
		'http://localhost:8080/Optik/api/venta/getAllp',
		{
			method: 'POST',
			headers: {
				'Content-Type':
					'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: new URLSearchParams({
				estatus: '1'
			})
		}
	).then(resp => resp.json());

	productos = data;
	fillTable(productos);
}

export async function searchTable() {
	if (document.querySelector('#buscar').value == '') {
		getAll();
		return;
	}
	const data = await fetch(
		'http://localhost:8080/Optik/api/venta/find',
		{
			method: 'POST',
			body: new URLSearchParams({
				filtro: document.querySelector('#buscar').value
			}),
			headers: {
				'Content-Type':
					'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}
	)
		.then(resp => resp.json())
		.catch(err => console.log(err));

	productos = data;
	fillTable(productos);
}
function mostrarAlerta(icon, mensaje) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: true,
		timer: 3000,
		timerProgressBar: true
	});

	Toast.fire({
		icon: icon,
		title: mensaje
	});
}

export function flipTable() {
	let table = document.getElementById('tblView');
	let table2 = document.getElementById('tblView3');

	if (table.classList.contains('is-hidden')) {
		table.classList.remove('is-hidden');
		table2.classList.add('is-hidden');
	} else {
		table.classList.add('is-hidden');
		table2.classList.remove('is-hidden');
	}
}

let detalleVentaProducto = {
	venta: {
		clave: 0,
		empleado: null
	},
	ventasProducto: []
};

export async function vender() {
	const random = Math.floor(Math.random() * 1000000);
	detalleVentaProducto.venta.clave = `OQV-${random}`;
	detalleVentaProducto.venta.empleado = JSON.parse(
		localStorage.getItem('currentUser')
	);

	ids.ids.forEach((id, i) => {
		detalleVentaProducto.ventasProducto = [
			...detalleVentaProducto.ventasProducto,
			{
				producto: productos[id],
				cantidad: ids.cantidad[i],
				precioUnitario: ids.precioUnitario[i],
				descuento: ids.descuento[i]
			}
		];
	});
	console.log(detalleVentaProducto);
	let params = new URLSearchParams({
		datosVentaProducto: JSON.stringify(detalleVentaProducto)
	});

	const data = fetch('http://localhost:8080/Optik/api/vp/insertar', {
		method: 'POST',
		headers: {
			'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8'
		},
		body: params
	}).then(resp => resp.json());

	if (data.error) {
		mostrarAlerta('error', data.error);
		return;
	}

	mostrarAlerta('success', 'Venta realizada con exito');
}

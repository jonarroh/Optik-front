let compras;
let comprasI;
export function insertar() {
	let idEmpleado = document.getElementById('selectEmpleado').value;
	let idProducto = document.getElementById('selectProducto').value;
	let cantidad = document.getElementById('txtCantidad').value;

	let empleado = {
		idEmpleado: idEmpleado
	};

	let com = {
		empleado
	};

	let pro = {
		idProducto: idProducto
	};

	let PC = {
		compra: com,
		producto: pro,
		cantidad: cantidad
	};

	let compraProducto = { datosCompraProducto: JSON.stringify(PC) };

	let parametros = new URLSearchParams(compraProducto);

	fetch('http://localhost:8080/Optik/api/compraProducto/insertar', {
		method: 'POST',
		body: parametros,
		headers: {
			'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8'
		}
	})
		.then(response => response.json)
		.then(data => {
			if (data.error) {
				mostrarAlerta('error', 'No se pudo guardar la compra');
				return;
			}
		});

	limpiarProductoNuevo();
}

export function insertarProducto() {
	let idProducto = document.getElementById('selectProducto').value;
	let cantidad = document.getElementById('txtCantidad').value;

	let producto = {
		idProducto: idProducto
	};

	let PCP = {
		producto: producto,
		cantidad: cantidad
	};

	let ProductocompraProducto = { datosPCP: JSON.stringify(PCP) };

	let parametros = new URLSearchParams(ProductocompraProducto);

	fetch(
		'http://localhost:8080/Optik/api/compraProducto/insertarProducto',
		{
			method: 'POST',
			body: parametros,
			headers: {
				'Content-Type':
					'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}
	)
		.then(response => response.json)
		.then(data => {
			limpiarProductoNuevo();
		});
}

export function eliminarCompra() {
	let idCompra = document.getElementById('txtidCompra').value;
	let estatus = 0;

	let dato = {
		idCompra: idCompra,
		estatus: estatus
	};

	let compra = { datosCompraProducto: JSON.stringify(dato) };

	let parametros = new URLSearchParams(compra);

	fetch(
		'http://localhost:8080/Optik/api/compraProducto/eliminarCompra',
		{
			method: 'POST',
			body: parametros,
			headers: {
				'Content-Type':
					'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}
	)
		.then(response => response.json)
		.then(data => {
			getAllCompra();
		});
}

export function recuperarCompra() {
	let idCompra = document.getElementById('txtidCompra').value;
	let estatus = 1;

	let dato = {
		idCompra: idCompra,
		estatus: estatus
	};

	let compra = { datosCompraProducto: JSON.stringify(dato) };

	let parametros = new URLSearchParams(compra);

	fetch(
		'http://localhost:8080/Optik/api/compraProducto/recuperarCompra',
		{
			method: 'POST',
			body: parametros,
			headers: {
				'Content-Type':
					'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}
	)
		.then(response => response.json)
		.then(data => {
			getAllCompraCanceladas();
		});
}

export function getAllEmpleado() {
	let datos = { estatus: 1 };
	let parametros = new URLSearchParams(datos);

	fetch(
		'http://localhost:8080/Optik/api/compraProducto/getAllEmpleado',
		{
			method: 'POST',
			body: parametros,
			headers: {
				'Content-Type':
					'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}
	)
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				alert(data.error);
			} else {
				cargarSelectEmpleado(data);
			}
		});
}

export function cargarSelectEmpleado(data) {
	let contenido = '';
	data.forEach(empleado => {
		const { persona, usuario } = empleado;

		let nc =
			empleado.persona.nombre +
			' ' +
			empleado.persona.apellidoPaterno +
			' ' +
			empleado.persona.apellidoMaterno;

		contenido +=
			"<option value='" +
			empleado.idEmpleado +
			"'>" +
			nc +
			'</option>';
	});
	document.getElementById('selectEmpleado').innerHTML = contenido;
}

export function getAllProducto() {
	let datosP = { estatus: 1 };
	let parametrosP = new URLSearchParams(datosP);

	fetch(
		'http://localhost:8080/Optik/api/compraProducto/getAllProducto',
		{
			method: 'POST',
			body: parametrosP,
			headers: {
				'Content-Type':
					'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}
	)
		.then(response => response.json())
		.then(dataP => {
			// alert(JSON.stringify(data));
			if (dataP.error) {
				alert(dataP.error);
			} else {
				cargarSelectProducto(dataP);
			}
		});
}

export function cargarSelectProducto(dataP) {
	let contenido = '';
	dataP.forEach(producto => {
		let np = producto.nombre + ' ' + producto.marca;
		contenido +=
			"<option value='" +
			producto.idProducto +
			"'>" +
			np +
			'</option>';
	});
	document.getElementById('selectProducto').innerHTML = contenido;
}

export function getAllCompra() {
	let datosC = { estatus: 1 };
	let parametrosC = new URLSearchParams(datosC);

	fetch(
		'http://localhost:8080/Optik/api/compraProducto/getAllCompra',
		{
			method: 'POST',
			body: parametrosC,
			headers: {
				'Content-Type':
					'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}
	)
		.then(response => response.json())
		.then(dataC => {
			// alert(JSON.stringify(data));
			if (dataC.error) {
				alert(dataC.error);
			} else {
				cargarTablaCompra(dataC);
			}
			document.getElementById('tbCompraProducto').innerHTML = '';
		});
}

export function cargarTablaCompra(dataC) {
	compras = dataC;
	let contenido = '';
	dataC.forEach((compra, index) => {
		const { empleado } = compra;

		let nc =
			compra.empleado.persona.nombre +
			' ' +
			compra.empleado.persona.apellidoPaterno +
			' ' +
			compra.empleado.persona.apellidoMaterno;
		contenido += '<tr>';
		contenido += '<td>' + compra.idCompra + '</td>';
		contenido += '<td>' + nc + '</td>';
		contenido +=
			"<td><button type='button' class='button is-success has-icon-left' onclick='mcp.cargarForm(" +
			index +
			`);'> <span class="icon is-left pt-2">
			<icon-eye></icon-eye>
		</span></td>`;
		contenido +=
			"<td><button type='button' class='button is-danger has-icon-left' onclick='mcp.cargarFormEliminar(" +
			index +
			`);'> <span class="icon is-left pt-2">
			<icon-delete></icon-delete>
		</span></td>`;
		contenido += '</tr>';
	});
	document.getElementById('tbCompra').innerHTML = contenido;
}

export function getAllCompraProducto() {
	let idCom = document.getElementById('txtidCompra').value;

	let datosCP = { idCompra: idCom };
	let parametrosCP = new URLSearchParams(datosCP);

	fetch(
		'http://localhost:8080/Optik/api/compraProducto/getAllCompraProducto',
		{
			method: 'POST',
			body: parametrosCP,
			headers: {
				'Content-Type':
					'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}
	)
		.then(response => response.json())
		.then(dataCP => {
			// alert(JSON.stringify(data));
			if (dataCP.error) {
				alert(dataCP.error);
			} else {
				cargarTablaCompraProducto(dataCP);
			}
		});
}

export function cargarTablaCompraProducto(dataCP) {
	let contenido = '';
	dataCP.forEach(compraProducto => {
		const { compra, producto } = compraProducto;

		let nc =
			compraProducto.producto.nombre +
			' ' +
			compraProducto.producto.marca;

		contenido += '<tr>';
		contenido += '<td>' + compraProducto.producto.nombre + '</td>';
		contenido += '<td>' + compraProducto.producto.marca + '</td>';
		contenido +=
			'<td>' + compraProducto.producto.codigoBarras + '</td>';
		contenido += '<td>' + compraProducto.cantidad + '</td>';
		contenido += '</tr>';
	});
	document.getElementById('tbCompraProducto').innerHTML = contenido;
}

export function cargarForm(i) {
	document.getElementById('txtidCompra').value = compras[i].idCompra;

	getAllCompraProducto();
}

export function cargarFormEliminar(j) {
	document.getElementById('txtidCompra').value = compras[j].idCompra;

	eliminarCompra();
}

export function getAllCompraCanceladas() {
	let datosCI = { estatus: 0 };
	let parametrosC = new URLSearchParams(datosCI);

	fetch(
		'http://localhost:8080/Optik/api/compraProducto/getAllCompraCanceladas',
		{
			method: 'POST',
			body: parametrosC,
			headers: {
				'Content-Type':
					'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}
	)
		.then(response => response.json())
		.then(dataCI => {
			// alert(JSON.stringify(data));
			if (dataCI.error) {
				alert(dataCI.error);
			} else {
				cargarTablaCompraIna(dataCI);
			}

			document.getElementById('tbCompraProducto').innerHTML = '';
		});
}

export function cargarTablaCompraIna(dataCI) {
	comprasI = dataCI;
	let contenido = '';
	dataCI.forEach((compra, index) => {
		const { empleado } = compra;

		let nc =
			compra.empleado.persona.nombre +
			' ' +
			compra.empleado.persona.apellidoPaterno +
			' ' +
			compra.empleado.persona.apellidoMaterno;
		contenido += '<tr>';
		contenido += '<td>' + compra.idCompra + '</td>';
		contenido += '<td>' + nc + '</td>';
		contenido +=
			"<td><button type='button' class='button is-success has-icon-left' onclick='mcp.cargarFormIna(" +
			index +
			`);'> <span class="icon is-left pt-2">
			<icon-eye></icon-eye>
		</span></td>`;
		contenido +=
			"<td><button type='button' class='button is-success has-icon-left' onclick='mcp.cargarFormRecuperar(" +
			index +
			`);'> <span class="icon is-left pt-2">
			<icon-check></icon-check>
		</span></td>`;
		contenido += '</tr>';
	});
	document.getElementById('tbCompra').innerHTML = contenido;
}

export function cargarFormIna(k) {
	document.getElementById('txtidCompra').value = comprasI[k].idCompra;
	getAllCompraProducto();
}

export function cargarFormRecuperar(l) {
	document.getElementById('txtidCompra').value = comprasI[l].idCompra;
	recuperarCompra();
}

export function limpiarProductoNuevo() {
	document.getElementById('selectProducto').value = '';
	document.getElementById('txtCantidad').value = '';
}

export function limpiarCompraNueva() {
	document.getElementById('selectEmpleado').value = '';
	document.getElementById('selectProducto').value = '';
	document.getElementById('txtCantidad').value = '';
}

export function inicializar() {
	getAllCompra();
	getAllEmpleado();
	getAllProducto();
}

export function cerrarTabla() {
	document.getElementById('tbCompra').innerHTML = '';
	document.getElementById('tbCompraProducto').innerHTML = '';
}

export function searchTable() {
	var input, filter, found, table, tr, td, i, j, tname, k;
	for (k = 1; k < 3; k++) {
		input = document.getElementById('txtbuscarCompra');
		filter = input.value.toUpperCase();
		table = document.getElementById('tbAllC');
		tr = table.getElementsByTagName('tr');
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName('td');
			for (j = 0; j < td.length; j++) {
				if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
					found = true;
				}
			}
			if (found) {
				tr[i].style.display = '';
				found = false;
			} else {
				if (i > 0) {
					//this skips the headers
					tr[i].style.display = 'none';
				}
			}
		}
	}
}

export function searchTable2() {
	var input, filter, found, table, tr, td, i, j, tname, k;
	for (k = 1; k < 3; k++) {
		input = document.getElementById('txtbuscarProducto');
		filter = input.value.toUpperCase();
		table = document.getElementById('tbAllP');
		tr = table.getElementsByTagName('tr');
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName('td');
			for (j = 0; j < td.length; j++) {
				if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
					found = true;
				}
			}
			if (found) {
				tr[i].style.display = '';
				found = false;
			} else {
				if (i > 0) {
					//this skips the headers
					tr[i].style.display = 'none';
				}
			}
		}
	}
}

export function filter(keyword) {
	var select = document.getElementById('selectProducto');
	for (var i = 0; i < select.length; i++) {
		var txt = select.options[i].text;
		var include = txt.toLowerCase().startsWith(keyword.toLowerCase());
		select.options[i].style.display = include ? 'list-item' : 'none';
	}
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

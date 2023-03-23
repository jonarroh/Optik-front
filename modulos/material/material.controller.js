let materiales = [];

export function insertar() {
	if (validar() == false) {
		return;
	}
	let nombre = document.getElementById('nombre').value;
	let precioCompra = document.getElementById('precioC').value;
	let precioVenta = document.getElementById('precioV').value;

	let material = {
		datosMaterial: JSON.stringify({
			nombre,
			precioCompra,
			precioVenta
		})
	};

	let params = new URLSearchParams(material);

	fetch('http://localhost:8080/Optik/api/material/insertar', {
		method: 'POST',
		headers: {
			'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8'
		},
		body: params
	})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				mostrarAlerta('error', 'Error al insertar el material');
			}
			mostrarAlerta('success', 'Material agregado');
			getAll();
			limpiar();
		});
}

export function getAll() {
	let datos = { estatus: 1 };
	let params = new URLSearchParams(datos);

	fetch('http://localhost:8080/Optik/api/material/getAll', {
		method: 'POST',
		body: params,
		headers: {
			'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8'
		}
	})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				mostrarAlerta('error', 'Error al obtener los materiales');
			} else {
				cargarTablaMaterial(data);
			}
		});
}

export function getInactivos() {
	let datos = { estatus: 0 };
	let parametros = new URLSearchParams(datos);

	fetch('http://localhost:8080/Optik/api/material/getAllIn', {
		method: 'POST',
		body: parametros,
		headers: {
			'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8'
		}
	})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				mostrarAlerta('error', 'Error al cargar los materiales');
			} else {
				cargarTablaMaterial(data);
			}
		});
}

export function cargarTablaMaterial(data) {
	materiales = data;
	console.log(materiales);

	let contenido = '';
	for (let i = 0; i < data.length; i++) {
		contenido += `
                    <tr>
												<td>${data[i].codigoBarras} </td>
                        <td>${data[i].nombre} </td>
                        <td>${data[i].precioCompra} </td>
                        <td> <button class="button is-primary has-icons-left" type='button' onclick='mm.cargarForm(${i});'><span class="icon is-left pt-2">
												<icon-check></icon-check>
											</span></button></td>
                    `;
	}

	document.querySelector('tbody').innerHTML = contenido;
}

export function cargarForm(i) {
	document.getElementById('guardar').classList.add('is-hidden');
	document.getElementById('actualizar').classList.remove('is-hidden');
	document.getElementById('idMaterial').value =
		materiales[i].idMaterial;

	document.getElementById('nombre').value = materiales[i].nombre;
	document.getElementById('precioC').value =
		materiales[i].precioCompra;
	document.getElementById('precioV').value =
		materiales[i].precioVenta;
}
export function actualizar() {
	if (validar() == false) {
		return;
	}

	let idMaterial = document.getElementById('idMaterial').value;
	let nombre = document.getElementById('nombre').value;
	let precioCompra = document.getElementById('precioC').value;
	let precioVenta = document.getElementById('precioV').value;
	const materialA = materiales.find(
		material => material.idMaterial == idMaterial
	);
	let m = {
		idMaterial: idMaterial,
		nombre: nombre,
		precioCompra: precioCompra,
		precioVenta: precioVenta
	};

	let material = { datosMaterial: JSON.stringify(m) };
	let params = new URLSearchParams(material);

	fetch('http://localhost:8080/Optik/api/material/actualizar', {
		method: 'POST',
		body: params,
		headers: {
			'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8'
		}
	})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				mostrarAlerta('error', 'El material no se puedo actualizar');
				return;
			}
			mostrarAlerta('success', 'Material actualizado');
			limpiar();
			if (materialA.estatus === 1) {
				getAll();
			} else {
				getInactivos();
			}
		});
}

export function limpiar() {
	document.getElementById('guardar').classList.remove('is-hidden');
	document.getElementById('actualizar').classList.add('is-hidden');
	document.getElementById('nombre').value = '';
	document.getElementById('precioC').value = '';
	document.getElementById('precioV').value = '';
	document.getElementById('txtbuscar').value = '';
}

export function eliminar(i) {
	let ma = {
		idMaterial: i
	};

	let material = { datosMaterial: JSON.stringify(ma) };

	let param = new URLSearchParams(material);

	fetch('http://localhost:8080/Optik/api/material/eliminar', {
		method: 'POST',
		body: param,
		headers: {
			'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8'
		}
	})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				mostrarAlerta('error', 'El material no se puedo eliminar');
				return;
			}
			mostrarAlerta(
				'success',
				'El material se elimino correctamente'
			);
			getAll();
			limpiar();
		});
}

export function activar(i) {
	let ma = {
		idMaterial: i
	};

	let material = { datosMaterial: JSON.stringify(ma) };

	let param = new URLSearchParams(material);

	fetch('http://localhost:8080/Optik/api/material/activar', {
		method: 'POST',
		body: param,
		headers: {
			'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8'
		}
	})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				mostrarAlerta('error', 'El material no se puedo activar');
				return;
			}
			mostrarAlerta('success', 'Se activó correctamente el material');
			getInactivos();
			limpiar();
		});
}

export function searchTable() {
	var input, filter, found, table, tr, td, i, j, k;
	for (k = 1; k < 2; k++) {
		input = document.getElementById('txtbuscar').value;
		filter = input.toUpperCase();
		table = document.getElementById('tblView');
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

const regexValidar = {
	//validar letras, espacios y acentos
	letras: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	//validar numeros y puntos
	numeros: /^[0-9.]+$/
};

export function validar() {
	let nombre = document.getElementById('nombre').value;
	let precioC = document.getElementById('precioC').value;
	let precioV = document.getElementById('precioV').value;

	if (!regexValidar.letras.test(nombre)) {
		mostrarAlerta(
			'warning',
			'El nombre solo puede contener letras y espacios'
		);
		return false;
	}

	if (!regexValidar.numeros.test(precioC)) {
		mostrarAlerta(
			'warning',
			'El precio de compra solo puede contener numeros y puntos'
		);
		return false;
	}

	if (!regexValidar.numeros.test(precioV)) {
		mostrarAlerta(
			'warning',
			'El precio de venta solo puede contener numeros y puntos'
		);
		return false;
	}
	if (nombre === '' || precioC === '' || precioV === '') {
		mostrarAlerta('warning', 'Todos los campos son obligatorios');
		return false;
	}

	return true;
}

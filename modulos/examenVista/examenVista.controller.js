let examenesVistas;
let examenesVistasI;

export function insertarExamenVista() {
	let idEmpleado = document.getElementById('selectEmpleado').value;
	let clave = document.getElementById('txtClave').value;
	let idCliente = document.getElementById('selectCliente').value;
	let idGraduacion = document.getElementById(
		'selectGraduacion'
	).value;
	if (validar() == false) {
		return;
	}
	let empleado = {
		IdEmpleado: idEmpleado
	};

	let cliente = {
		idCliente: idCliente
	};

	let graduacion = {
		idGraduacion: idGraduacion
	};

	let eVista = {
		empleado: empleado,
		clave: clave,
		cliente: cliente,
		graduacion: graduacion
	};

	let examenVista = { datosExamenVista: JSON.stringify(eVista) };

	let parametros = new URLSearchParams(examenVista);

	fetch('http://localhost:8080/Optik/api/examenVista/insertar', {
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
				mostrarAlerta(
					'error',
					'Error al insertar el examen de vista'
				);
			}
			mostrarAlerta('success', 'Examen de vista agregado');
		});
	limpiar();
}

export function getAllEmpleado() {
	let datos = { estatus: 1 };
	let parametros = new URLSearchParams(datos);

	fetch(
		'http://localhost:8080/Optik/api/examenVista/getAllEmpleado',
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
		.then(dataE => {
			// alert(JSON.stringify(data));
			if (dataE.error) {
				mostrarAlerta('error', 'Error al obtener los empleados');
			} else {
				cargarSelectEmpleado(dataE);
			}
		});
}

export function cargarSelectEmpleado(dataE) {
	let contenido = '';
	dataE.forEach(empleado => {
		const { persona, usuario } = empleado;

		let nc =
			empleado.persona.nombre +
			' ' +
			empleado.persona.apellidoPaterno +
			' ' +
			empleado.persona.apellidoMaterno;

		contenido +=
			"<option value='" +
			empleado.IdEmpleado +
			"'>" +
			nc +
			'</option>';
	});
	document.getElementById('selectEmpleado').innerHTML = contenido;
}

export function getAllCliente() {
	let datos = { estatus: 1 };
	let parametros = new URLSearchParams(datos);

	fetch('http://localhost:8080/Optik/api/examenVista/getAllCliente', {
		method: 'POST',
		body: parametros,
		headers: {
			'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8'
		}
	})
		.then(response => response.json())
		.then(datac => {
			// alert(JSON.stringify(data));
			if (datac.error) {
				mostrarAlerta('error', 'Error al obtener los clientes');
			} else {
				cargarSelectCliente(datac);
			}
		});
}

export function cargarSelectCliente(datac) {
	let contenido = '';
	datac.forEach(cliente => {
		const { persona } = cliente;

		let nc =
			cliente.persona.nombre +
			' ' +
			cliente.persona.apellidoPaterno +
			' ' +
			cliente.persona.apellidoMaterno;

		contenido +=
			"<option value='" + cliente.idCliente + "'>" + nc + '</option>';
	});
	document.getElementById('selectCliente').innerHTML = contenido;
}

export function getAllGraduacion() {
	let datos = { estatus: 1 };
	let parametros = new URLSearchParams(datos);

	fetch(
		'http://localhost:8080/Optik/api/examenVista/getAllGraduacion',
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
			// alert(JSON.stringify(data));
			if (data.error) {
				mostrarAlerta('error', 'Error al obtener las graduaciones');
			} else {
				cargarSelectGraduacion(data);
			}
		});
}

export function cargarSelectGraduacion(data) {
	let contenido = '';
	data.forEach(graduacion => {
		let esfera =
			'Esfera od y oi: ' +
			graduacion.esferaod +
			', ' +
			graduacion.esferaoi;
		let cilindro =
			'Cilindro od y oi: ' +
			graduacion.cilindrood +
			', ' +
			graduacion.cilindrooi;
		let eje =
			'Eje od y oi: ' + graduacion.ejeod + ', ' + graduacion.ejeoi;
		let dip = 'Dip: ' + graduacion.dip;

		contenido +=
			"<option value='" +
			graduacion.idGraduacion +
			"'>" +
			esfera +
			' | ' +
			cilindro +
			' | ' +
			eje +
			' | ' +
			dip +
			'</option>';
	});
	document.getElementById('selectGraduacion').innerHTML = contenido;
}

export function getAllExamenVista() {
	let datosEv = { estatus: 1 };
	let parametrosC = new URLSearchParams(datosEv);

	fetch(
		'http://localhost:8080/Optik/api/examenVista/getAllExamenVista',
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
		.then(dataEv => {
			// alert(JSON.stringify(data));
			if (dataEv.error) {
				mostrarAlerta(
					'error',
					'Error al obtener los examenes de vista'
				);
			} else {
				cargarTablaExamenVista(dataEv);
			}
		});
}

export function cargarTablaExamenVista(dataEv) {
	examenesVistas = dataEv;
	let contenido = '';
	dataEv.forEach((examenVista, index) => {
		const { empleado, cliente, persona, graduacion } = examenVista;

		let nce =
			examenVista.empleado.persona.nombre +
			' ' +
			examenVista.empleado.persona.apellidoPaterno +
			' ' +
			examenVista.empleado.persona.apellidoMaterno;

		let ncc =
			examenVista.cliente.persona.nombre +
			' ' +
			examenVista.cliente.persona.apellidoPaterno +
			' ' +
			examenVista.cliente.persona.apellidoMaterno;

		let dg =
			'Esfera od y oi: ' +
			examenVista.graduacion.esferaod +
			', ' +
			examenVista.graduacion.esferaoi +
			' | ' +
			'Cilindro od y oi: ' +
			examenVista.graduacion.cilindrood +
			', ' +
			examenVista.graduacion.cilindrooi +
			' | ' +
			'Eje od y oi: ' +
			examenVista.graduacion.ejeod +
			', ' +
			examenVista.graduacion.ejeoi +
			' | ' +
			'Dip: ' +
			examenVista.graduacion.dip;

		contenido += '<tr>';
		contenido += '<td>' + nce + '</td>';
		contenido += '<td>' + examenVista.clave + '</td>';
		contenido += '<td>' + ncc + '</td>';
		contenido += '<td>' + dg + '</td>';
		contenido +=
			"<td><button type='button' class='button is-primary has-icon-left' onclick='mev.cargarForm(" +
			index +
			`)';>
      <span class="icon is-left pt-2">
	<icon-eye></icon-eye>
</span>
      </td>`;
		contenido +=
			"<td><button type='button' class='button is-danger has-icons-left' onclick='mev.cargarFormEliminarExamenVista(" +
			index +
			`);'>
      <span class="icon is-left pt-2">
							<icon-delete></icon-delete>
						</span>
      </td>`;
		contenido += '</tr>';
	});
	document.getElementById('tbExamenVista').innerHTML = contenido;
}

export function cargarForm(i) {
	document.getElementById('guardar').classList.add('is-hidden');
	document.getElementById('actualizar').classList.remove('is-hidden');

	document.getElementById('selectEmpleado').value =
		examenesVistas[i].empleado.IdEmpleado;
	document.getElementById('txtClave').value = examenesVistas[i].clave;
	document.getElementById('selectCliente').value =
		examenesVistas[i].cliente.idCliente;
	document.getElementById('selectGraduacion').value =
		examenesVistas[i].graduacion.idGraduacion;

	document.getElementById('txtidExamenVista').value =
		examenesVistas[i].idExamenVista;
}

export function actualizarExamenVista() {
	let idExamenVista = document.getElementById(
		'txtidExamenVista'
	).value;
	let idEmpleado = document.getElementById('selectEmpleado').value;
	let clave = document.getElementById('txtClave').value;
	let idCliente = document.getElementById('selectCliente').value;
	let idGraduacion = document.getElementById(
		'selectGraduacion'
	).value;
	if (validar() == false) {
		return;
	}

	let empleado = {
		IdEmpleado: idEmpleado
	};

	let cliente = {
		idCliente: idCliente
	};

	let graduacion = {
		idGraduacion: idGraduacion
	};

	let eVista = {
		idExamenVista: idExamenVista,
		empleado: empleado,
		clave: clave,
		cliente: cliente,
		graduacion: graduacion
	};

	let examenVista = { datosExamenVista: JSON.stringify(eVista) };

	let parametros = new URLSearchParams(examenVista);

	//    alert(JSON.stringify(empleado));
	fetch('http://localhost:8080/Optik/api/examenVista/actualizar', {
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
				mostrarAlerta(
					'error',
					'Error al actualizar el examen de vista'
				);
			}
			mostrarAlerta(
				'success',
				'Examen de vista actualizado correctamente'
			);
			limpiar();
			getAllExamenVista();
		});
}

export function cargarFormEliminarExamenVista(j) {
	document.getElementById('txtidExamenVista').value =
		examenesVistas[j].idExamenVista;

	eliminarExamenVista();
}

export function eliminarExamenVista() {
	let idExamenVista = document.getElementById(
		'txtidExamenVista'
	).value;
	let estatus = 0;

	let Ev = {
		idExamenVista: idExamenVista,
		estatus: estatus
	};

	let examenVista = { datosExamenVista: JSON.stringify(Ev) };

	let parametros = new URLSearchParams(examenVista);

	fetch('http://localhost:8080/Optik/api/examenVista/eliminar', {
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
				mostrarAlerta(
					'error',
					'Error al eliminar el examen de vista'
				);
			}
			mostrarAlerta(
				'success',
				'Examen de vista eliminado correctamente'
			);
			getAllExamenVista();
		});
}

export function getAllExamenVistaInactivo() {
	let datosEvI = { estatus: 0 };
	let parametrosC = new URLSearchParams(datosEvI);

	fetch(
		'http://localhost:8080/Optik/api/examenVista/getAllExamenVistaInactiva',
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
		.then(dataEvI => {
			// alert(JSON.stringify(data));
			if (dataEvI.error) {
				mostrarAlerta(
					'error',
					'Error al obtener los examenes de vista inactivos'
				);
			} else {
				cargarTablaExamenVistaInactiva(dataEvI);
			}
		});
}

export function cargarTablaExamenVistaInactiva(dataEvI) {
	examenesVistasI = dataEvI;
	let contenido = '';
	dataEvI.forEach((examenVista, index) => {
		const { empleado, cliente, persona, graduacion } = examenVista;

		let nce =
			examenVista.empleado.persona.nombre +
			' ' +
			examenVista.empleado.persona.apellidoPaterno +
			' ' +
			examenVista.empleado.persona.apellidoMaterno;

		let ncc =
			examenVista.cliente.persona.nombre +
			' ' +
			examenVista.cliente.persona.apellidoPaterno +
			' ' +
			examenVista.cliente.persona.apellidoMaterno;

		let dg =
			'Esfera od y oi: ' +
			examenVista.graduacion.esferaod +
			', ' +
			examenVista.graduacion.esferaoi +
			' | ' +
			'Cilindro od y oi: ' +
			examenVista.graduacion.cilindrood +
			', ' +
			examenVista.graduacion.cilindrooi +
			' | ' +
			'Eje od y oi: ' +
			examenVista.graduacion.ejeod +
			', ' +
			examenVista.graduacion.ejeoi +
			' | ' +
			'Dip: ' +
			examenVista.graduacion.dip;

		contenido += '<tr>';
		contenido += '<td>' + nce + '</td>';
		contenido += '<td>' + examenVista.clave + '</td>';
		contenido += '<td>' + ncc + '</td>';
		contenido += '<td>' + dg + '</td>';
		contenido +=
			"<td><button type='button' class='button is-primary' onclick='mev.cargarFormIna(" +
			index +
			`);'>
      <span class="icon is-left pt-2">
							<icon-eye></icon-eye>
						</span>
      </td>`;
		contenido +=
			"<td><button type='button' class='button is-success' onclick='mev.cargarFormRecuperarExamenVista(" +
			index +
			`);'>
      <span class="icon is-left pt-2">
							<icon-check></icon-check>
						</span>
      </td>`;
		contenido += '</tr>';
	});
	document.getElementById('tbExamenVista').innerHTML = contenido;
}

export function cargarFormIna(k) {
	document.getElementById('guardar').classList.add('is-hidden');
	document.getElementById('actualizar').classList.remove('is-hidden');
	document.getElementById('selectEmpleado').value =
		examenesVistasI[k].empleado.IdEmpleado;
	document.getElementById('txtClave').value =
		examenesVistasI[k].clave;
	document.getElementById('selectCliente').value =
		examenesVistasI[k].cliente.idCliente;
	document.getElementById('selectGraduacion').value =
		examenesVistasI[k].graduacion.idGraduacion;

	document.getElementById('txtidExamenVista').value =
		examenesVistasI[k].idExamenVista;
}

export function recuperarExamenVista() {
	let idExamenVista = document.getElementById(
		'txtidExamenVista'
	).value;
	let estatus = 1;

	let Ev = {
		idExamenVista: idExamenVista,
		estatus: estatus
	};

	let examenVista = { datosExamenVista: JSON.stringify(Ev) };

	let parametros = new URLSearchParams(examenVista);

	fetch('http://localhost:8080/Optik/api/examenVista/activar', {
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
				mostrarAlerta(
					'error',
					'Error al recuperar el examen de vista'
				);
			}
			getAllExamenVistaInactivo();
		});
}

export function cargarFormRecuperarExamenVista(l) {
	document.getElementById('txtidExamenVista').value =
		examenesVistasI[l].idExamenVista;

	recuperarExamenVista();
}

export function cerrarTabla() {
	document.getElementById('tbExamenVista').innerHTML = '';
}

export function limpiar() {
	document.getElementById('guardar').classList.remove('is-hidden');
	document.getElementById('actualizar').classList.add('is-hidden');
	document.getElementById('txtClave').value = '';
	document.getElementById('buscareEmpleado').value = '';
	document.getElementById('buscarCliente').value = '';
	document.getElementById('buscarGraduacion').value = '';
	getAllCliente();
	getAllEmpleado();
	getAllGraduacion();
}

export function inicializar() {
	getAllEmpleado();
	getAllCliente();
	getAllGraduacion();
	getAllExamenVista();
}

export function buscarTabla() {
	var input, filter, found, table, tr, td, i, j, tname, k;
	for (k = 1; k < 3; k++) {
		input = document.getElementById('txtbuscarExamenBusca');
		filter = input.value.toUpperCase();
		table = document.getElementById('tbAllEv');
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

export function filterEmpleado(keyword) {
	var select = document.getElementById('selectEmpleado');
	for (var i = 0; i < select.length; i++) {
		var txt = select.options[i].text;
		var include = txt.toLowerCase().startsWith(keyword.toLowerCase());
		select.options[i].style.display = include ? 'list-item' : 'none';
	}
}

export function filterCliente(keyword) {
	var select = document.getElementById('selectCliente');
	for (var i = 0; i < select.length; i++) {
		var txt = select.options[i].text;
		var include = txt.toLowerCase().startsWith(keyword.toLowerCase());
		select.options[i].style.display = include ? 'list-item' : 'none';
	}
}

export function filterGraduacion(keyword) {
	var select = document.getElementById('selectGraduacion');
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

const regexValidar = {
	//validar letras, espacios y acentos
	letras: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	//validar numeros y puntos
	numeros: /^[0-9.]+$/,
	//validar numeros
	numerosEnteros: /^[0-9]+$/,
	//validar letras, espacios, acentos,numeros, puntos, comas, guiones y maximo 240 caracteres
	letrasNumerosSimbolos: /^[a-zA-ZÀ-ÿ0-9\s.,-]{1,240}$/
};

function validar() {
	if (document.getElementById('selectEmpleado').value == '') {
		mostrarAlerta('error', 'Seleccione un empleado');
		return false;
	}

	if (document.getElementById('txtClave').value == '') {
		mostrarAlerta('error', 'Ingrese una clave');
		return false;
	}

	if (document.getElementById('selectCliente').value == '') {
		mostrarAlerta('error', 'Seleccione un cliente');
		return false;
	}

	if (document.getElementById('selectGraduacion').value == '') {
		mostrarAlerta('error', 'Seleccione una graduacion');
		return false;
	}
	//validar que la clave sean solo numeros
	if (
		!regexValidar.numeros.test(
			document.getElementById('txtClave').value
		)
	) {
		mostrarAlerta('error', 'La clave solo puede contener numeros');
		return false;
	}

	return true;
}

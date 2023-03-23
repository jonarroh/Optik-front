let clientes = [];

export function insertar() {
	let nombre = document.getElementById('txtnombre').value;
	let apePaterno = document.getElementById('txtapePaterno').value;
	let apeMaterno = document.getElementById('txtapeMaterno').value;
	let genero = document.getElementById('slcgenero').value;
	let fechaNacimiento = document.getElementById(
		'txtfechaNacimiento'
	).value;
	let calle = document.getElementById('txtcalle').value;
	let numero = document.getElementById('txtnumero').value;
	let colonia = document.getElementById('txtcolonia').value;
	let cp = document.getElementById('txtcp').value;
	let ciudad = document.getElementById('txtciudad').value;
	let estado = document.getElementById('txtestado').value;
	let telCasa = document.getElementById('txttelCasa').value;
	let telMovil = document.getElementById('txttelMovil').value;
	let email = document.getElementById('txtemail').value;
	if (validar() == false) {
		return;
	}

	let persona = {
		nombre: nombre,
		apellidoPaterno: apePaterno,
		apellidoMaterno: apeMaterno,
		genero: genero,
		fechaNacimiento: fechaNacimiento,
		calle: calle,
		numero: numero,
		colonia: colonia,
		cp: cp,
		ciudad: ciudad,
		estado: estado,
		telCasa: telCasa,
		telMovil: telMovil,
		email: email
	};
	let cli = { persona: persona };

	let cliente = { datosCliente: JSON.stringify(cli) };

	let parametros = new URLSearchParams(cliente);

	fetch('http://localhost:8080/Optik/api/restcliente/insertCliente', {
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
				mostrarAlerta('error', 'Error al insertar');
				return;
			}
			mostrarAlerta('success', 'Cliente insertado');
			getAll();
			limpiar();
		});
}

export function actualizar() {
	let idCliente = document.getElementById('txtidCliente').value;
	let idPersona = document.getElementById('txtidPersona').value;
	let nombre = document.getElementById('txtnombre').value;
	let apePaterno = document.getElementById('txtapePaterno').value;
	let apeMaterno = document.getElementById('txtapeMaterno').value;
	let genero = document.getElementById('slcgenero').value;
	let fechaNacimiento = document.getElementById(
		'txtfechaNacimiento'
	).value;
	fechaNacimiento = convertirFecha(fechaNacimiento);
	let calle = document.getElementById('txtcalle').value;
	let numero = document.getElementById('txtnumero').value;
	let colonia = document.getElementById('txtcolonia').value;
	let cp = document.getElementById('txtcp').value;
	let ciudad = document.getElementById('txtciudad').value;
	let estado = document.getElementById('txtestado').value;
	let telCasa = document.getElementById('txttelCasa').value;
	let telMovil = document.getElementById('txttelMovil').value;
	let email = document.getElementById('txtemail').value;
	if (validar() == false) {
		return;
	}
	//encontrar el cliente a actualizar con el idCliente
	let cl = clientes.find(cli => cli.idCliente == idCliente);

	let persona = {
		idPersona: idPersona,
		nombre: nombre,
		apellidoPaterno: apePaterno,
		apellidoMaterno: apeMaterno,
		genero: genero,
		fechaNacimiento: fechaNacimiento,
		calle: calle,
		numero: numero,
		colonia: colonia,
		cp: cp,
		ciudad: ciudad,
		estado: estado,
		telCasa: telCasa,
		telMovil: telMovil,
		email: email
	};
	let cli = { idCliente, persona };

	let cliente = { datosCliente: JSON.stringify(cli) };
	let parametros = new URLSearchParams(cliente);
	fetch('http://localhost:8080/Optik/api/restcliente/updateCliente', {
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
				mostrarAlerta('error', 'Error al actualizar');
				return;
			}
			mostrarAlerta('success', 'Cliente actualizado');
			if (cl.persona.estatus == 1) {
				getAll();
			} else {
				getAllInactivos();
			}
			limpiar();
		});
}

export function getAll() {
	let datos = { estatus: 1 };
	let parametros = new URLSearchParams(datos);

	fetch(
		'http://localhost:8080/Optik/api/restcliente/getAllClientes',
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
				mostrarAlerta('error', 'Error al obtener clientes');
				return;
			}
			cargarTablaCliente(null, data);
		});
}

export function getAllInactivos() {
	let datos = { estatus: 0 };
	let parametros = new URLSearchParams(datos);

	fetch(
		'http://localhost:8080/Optik/api/restcliente/getAllClientes',
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
				mostrarAlerta('error', 'Error al obtener clientes');
			} else {
				cargarTablaClienteInactivo(null, data);
			}
		});
}

function convertirFecha(fecha) {
	const f = fecha.split('-');
	return `${f[2]}/${f[1]}/${f[0]}`;
}

export function cargarTablaCliente(coincidencias, data) {
	if (coincidencias) {
		data = coincidencias;
	} else {
		clientes = data;
	}

	let contenido = '';
	data.forEach((cliente, index) => {
		let nc =
			cliente.persona.nombre +
			' ' +
			cliente.persona.apellidoPaterno +
			' ' +
			cliente.persona.apellidoMaterno;
		let dc =
			cliente.persona.calle +
			' ' +
			cliente.persona.numero +
			' ' +
			cliente.persona.colonia +
			' ' +
			cliente.persona.cp +
			' ' +
			cliente.persona.ciudad +
			' ' +
			cliente.persona.estado;

		contenido += '<tr>';
		contenido += '<td>' + nc + '</td>';
		contenido += '<td>' + dc + '</td>';
		contenido += '<td>' + cliente.persona.email + '</td>';
		contenido +=
			"<td><button type='button' class='button is-success has-icon-left' onclick='mc.cargarForm(" +
			index +
			`);'> <span class="icon is-left pt-2">
			<icon-eye></icon-eye>
		</span></td>`;
		contenido +=
			"<td><button type='button' class='button is-danger has-icon-left' onclick='mc.eliminar(" +
			index +
			`);'> <span class="icon is-left pt-2">
			<icon-delete></icon-delete>
		</span></td>`;
		contenido += '</tr>';
	});
	document.querySelector('tbody').innerHTML = contenido;
}

export function cargarTablaClienteInactivo(coincidencias, data) {
	if (coincidencias) {
		data = coincidencias;
	} else {
		clientes = data;
	}

	let contenido = '';
	data.forEach((cliente, index) => {
		const { persona } = cliente;

		let nc =
			cliente.persona.nombre +
			' ' +
			cliente.persona.apellidoPaterno +
			' ' +
			cliente.persona.apellidoMaterno;
		let dc =
			cliente.persona.calle +
			' ' +
			cliente.persona.numero +
			' ' +
			cliente.persona.colonia +
			' ' +
			cliente.persona.cp +
			' ' +
			cliente.persona.ciudad +
			' ' +
			cliente.persona.estado;

		contenido += '<tr>';
		contenido += '<td>' + nc + '</td>';
		contenido += '<td>' + dc + '</td>';
		contenido += '<td>' + cliente.persona.email + '</td>';
		contenido +=
			"<td><button class='button is-primary has-icon-left' type='button' onclick='mc.cargarForm(" +
			index +
			`);'> <span class="icon is-left pt-2">
			<icon-eye></icon-eye>
		</span></td>`;
		contenido +=
			"<td><button type='button' class='button is-success has-icon-left' onclick='mc.activar(" +
			index +
			`);'> <span class="icon is-left pt-2">
			<icon-check></icon-check>
		</span></td>`;
	});
	document.querySelector('tbody').innerHTML = contenido;
}

export function cargarForm(i) {
	document.getElementById('guardar').classList.add('is-hidden');
	document.getElementById('actualizar').classList.remove('is-hidden');
	document.getElementById('txtidCliente').value =
		clientes[i].idCliente;
	document.getElementById('txtidPersona').value =
		clientes[i].persona.idPersona;
	document.getElementById('txtnombre').value =
		clientes[i].persona.nombre;
	document.getElementById('txtapePaterno').value =
		clientes[i].persona.apellidoPaterno;
	document.getElementById('txtapeMaterno').value =
		clientes[i].persona.apellidoMaterno;
	document.getElementById('slcgenero').value =
		clientes[i].persona.genero;
	document.getElementById('txtfechaNacimiento').value =
		clientes[i].persona.fechaNacimiento;
	document.getElementById('txtcalle').value =
		clientes[i].persona.calle;
	document.getElementById('txtnumero').value =
		clientes[i].persona.numero;
	document.getElementById('txtcolonia').value =
		clientes[i].persona.colonia;
	document.getElementById('txtcp').value = clientes[i].persona.cp;
	document.getElementById('txtciudad').value =
		clientes[i].persona.ciudad;
	document.getElementById('txtestado').value =
		clientes[i].persona.estado;
	document.getElementById('txttelCasa').value =
		clientes[i].persona.telCasa;
	document.getElementById('txttelMovil').value =
		clientes[i].persona.telMovil;
	document.getElementById('txtemail').value =
		clientes[i].persona.email;
	document.getElementById('txtnumeroUn').value =
		clientes[i].numeroUnico;
}

export function limpiar() {
	document.getElementById('guardar').classList.remove('is-hidden');
	document.getElementById('actualizar').classList.add('is-hidden');
	document.getElementById('txtidCliente').value = '';
	document.getElementById('txtidPersona').value = '';
	document.getElementById('txtnombre').value = '';
	document.getElementById('txtapePaterno').value = '';
	document.getElementById('txtapeMaterno').value = '';
	document.getElementById('slcgenero').value = 'M';
	document.getElementById('txtfechaNacimiento').value = '';
	document.getElementById('txtcalle').value = '';
	document.getElementById('txtnumero').value = '';
	document.getElementById('txtcolonia').value = '';
	document.getElementById('txtcp').value = '';
	document.getElementById('txtciudad').value = '';
	document.getElementById('txtestado').value = '';
	document.getElementById('txttelCasa').value = '';
	document.getElementById('txttelMovil').value = '';
	document.getElementById('txtemail').value = '';
	document.getElementById('txtnumeroUn').value = '';
}

export function eliminar() {
	const idCliente = document.getElementById('txtidCliente').value;
	fetch(
		`http://localhost:8080/Optik/api/restcliente/actualizarestatuscliente?idCliente=${idCliente}&estatus=0`
	);
	getAll();
}
export function activar() {
	const idCliente = document.getElementById('txtidCliente').value;
	fetch(
		`http://localhost:8080/Optik/api/restcliente/actualizarestatuscliente?idCliente=${idCliente}&estatus=1`
	);
	getAll(0);
	limpiar();
}
export function buscar() {
	const busqueda = document.getElementById('button-addon2').value;
	const coincidencias = [];
	for (let i = 0; i < clientes.length; i++) {
		const cliente = clientes[i];
		if (
			cliente.persona.nombre
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			cliente.persona.apellidoPaterno
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			cliente.persona.apellidoMaterno
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			cliente.persona.telCasa
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			cliente.persona.telMovil
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			cliente.persona.calle
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			cliente.persona.numero
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			cliente.persona.colonia
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			cliente.persona.cp
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			cliente.persona.ciudad
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			cliente.persona.email
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			cliente.persona.genero
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			cliente.persona.fechaNacimiento
				.toLowerCase()
				.includes(busqueda.toLowerCase())
		) {
			coincidencias.push(cliente);
		}
		cargarTablaCliente(coincidencias, null);
	}
}

const validarRegex = {
	//validar letras, espacios y acentos
	letras: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	//validar numeros y puntos
	numeros: /^[0-9.]+$/,
	//validar numeros
	numerosEnteros: /^[0-9]+$/,
	//validar letras, espacios, acentos,numeros, puntos, comas, guiones y maximo 240 caracteres
	letrasNumerosSimbolos: /^[a-zA-ZÀ-ÿ0-9\s.,-]{1,240}$/,
	//validar codigo postal
	cp: /^[0-9]{5}$/,
	//validar email
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	//validar contrasenia de 8 a 20 caracteres, al menos una letra mayuscula, una letra minuscula, un numero y un caracter especial
	//validar numero de telefono
	telefono: /^[0-9]{10}$/
};

function validar() {
	let nombre = document.getElementById('txtnombre').value;
	let apePaterno = document.getElementById('txtapePaterno').value;
	let apeMaterno = document.getElementById('txtapeMaterno').value;
	let fechaNacimiento = document.getElementById(
		'txtfechaNacimiento'
	).value;
	let calle = document.getElementById('txtcalle').value;
	let numero = document.getElementById('txtnumero').value;
	let colonia = document.getElementById('txtcolonia').value;
	let cp = document.getElementById('txtcp').value;
	let ciudad = document.getElementById('txtciudad').value;
	let telCasa = document.getElementById('txttelCasa').value;
	let telMovil = document.getElementById('txttelMovil').value;
	let email = document.getElementById('txtemail').value;

	//validar que no esten vacios
	if (
		nombre === '' ||
		apePaterno === '' ||
		apeMaterno === '' ||
		fechaNacimiento === '' ||
		calle === '' ||
		numero === '' ||
		colonia === '' ||
		cp === '' ||
		ciudad === '' ||
		telCasa === '' ||
		telMovil === '' ||
		email === ''
	) {
		mostrarAlerta('warning', 'Todos los campos son obligatorios');
		return false;
	}

	//validar que la fecha no sea mayor a la actual
	if (fechaNacimiento > new Date()) {
		mostrarAlerta(
			'warning',
			'La fecha no puede ser mayor a la actual'
		);
		return false;
	}
	if (!validarRegex.letras.test(nombre)) {
		mostrarAlerta(
			'warning',
			'El nombre no es valido solo se permiten letras'
		);
		return false;
	}
	if (!validarRegex.letras.test(apePaterno)) {
		mostrarAlerta(
			'warning',
			'El apellido paterno no es valido solo se permiten letras'
		);
		return false;
	}
	if (!validarRegex.letras.test(apeMaterno)) {
		mostrarAlerta(
			'warning',
			'El apellido materno no es valido solo se permiten letras'
		);
		return false;
	}
	if (!validarRegex.letrasNumerosSimbolos.test(calle)) {
		mostrarAlerta(
			'warning',
			'La calle no es valida solo se permiten letras, numeros, puntos, comas y guiones'
		);
		return false;
	}
	if (!validarRegex.numerosEnteros.test(numero)) {
		mostrarAlerta(
			'warning',
			'El numero no es valido solo se permiten numeros'
		);
		return false;
	}
	if (!validarRegex.letrasNumerosSimbolos.test(colonia)) {
		mostrarAlerta(
			'warning',
			'La colonia no es valida solo se permiten letras, numeros, puntos, comas y guiones'
		);
		return false;
	}
	if (!validarRegex.cp.test(cp)) {
		mostrarAlerta(
			'warning',
			'El codigo postal no es valido solo se permiten 5 numeros'
		);
		return false;
	}
	if (!validarRegex.letras.test(ciudad)) {
		mostrarAlerta(
			'warning',
			'La ciudad no es valida solo se permiten letras'
		);
		return false;
	}
	if (!validarRegex.telefono.test(telCasa)) {
		mostrarAlerta(
			'warning',
			'El telefono de casa no es valido solo se permiten 10 numeros'
		);
		return false;
	}
	if (!validarRegex.telefono.test(telMovil)) {
		mostrarAlerta(
			'warning',
			'El telefono movil no es valido solo se permiten 10 numeros'
		);
		return false;
	}
	if (!validarRegex.email.test(email)) {
		mostrarAlerta('warning', 'El email no es valido');
		return false;
	}
	return true;
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

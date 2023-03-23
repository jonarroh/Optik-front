tablaEmpleado('1');
const form = document.getElementById('guardar');
let empleados = [];
form.addEventListener('click', () => {
	guardar();
});

export function guardar() {
	if (validar() == false) {
		return;
	}
	const empleado = {
		datosEmpleados: JSON.stringify({
			persona: {
				nombre: document.getElementById('nombre').value,
				apellidoPaterno:
					document.getElementById('apellidoPaterno').value,
				apellidoMaterno:
					document.getElementById('apellidoMaterno').value,
				genero: document.getElementById('genero').value,
				fechaNacimiento: convertirFecha(
					document.getElementById('fechaNacimiento').value
				),
				telCasa: document.getElementById('telCasa').value,
				telMovil: document.getElementById('telMovil').value,
				calle: document.getElementById('calle').value,
				numero: document.getElementById('numero').value,
				colonia: document.getElementById('colonia').value,
				cp: document.getElementById('cp').value,
				ciudad: document.getElementById('ciudad').value,
				estado: document.getElementById('estado').value,
				email: document.getElementById('email').value
			},
			usuario: {
				nombre: document.getElementById('nombreUsuario').value,
				contrasenia: document.getElementById('contrasenia').value,
				rol: document.getElementById('rol').value
			}
		})
	};
	//mandar por urlEncoded el objeto empleado al servicio
	empleadoService(empleado);
}
async function empleadoService(empleado) {
	const urlEncoded = new URLSearchParams(empleado);
	const reponse = await fetch(
		'http://localhost:8080/Optik/api/empleado/guardar',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: urlEncoded
		}
	);
	const data = await reponse.json();
	if (data.error) {
		mostrarAlerta('error', 'No se pudo guardar el empleado');
		return;
	}
	mostrarAlerta('success', 'Empleado guardado correctamente');
	limpiarForm();
}
const btnMostrar = document.getElementById('mostrar');
btnMostrar.addEventListener('click', () => {
	tablaEmpleado('1');
});

const btnMostrarD = document.getElementById('mostrarD');
btnMostrarD.addEventListener('click', () => {
	tablaEmpleado('0');
});

//tabla con los datos del empleado
export async function tablaEmpleado(estatus) {
	//fetch para obtener los datos del empleado
	const response = await fetch(
		'http://localhost:8080/Optik/api/empleado/getallempleado',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({ estatus })
		}
	);
	const data = await response.json();
	if (data.error) {
		mostrarAlerta('error', 'No se pudo obtener los empleados');
		return;
	}
	//crear la tabla
	mostrarTabla(null, data);
}

async function mostrarTabla(coincidencias, data) {
	//obtener el tbody de la tabla con el id tabla-empleado
	if (coincidencias) {
		data = coincidencias;
	} else {
		empleados = data;
	}

	let contenido = '';
	data.forEach((empleado, index) => {
		const { persona, usuario } = empleado;
		contenido +=
			/*HTML*/
			`  
	<tr>
	<td>${persona.nombre} ${persona.apellidoPaterno} ${persona.apellidoMaterno} </td>
	<td>${persona.genero}</td>
	<td>${persona.fechaNacimiento}</td>
	<td>${persona.calle} ${persona.numero} ${persona.colonia} ${persona.cp} ${persona.ciudad} ${persona.estado}</td>
	<td>${persona.telCasa}</td>
	<td>${persona.telMovil}</td>
	<td>${usuario.nombre}</td>
	<td>${persona.email}</td>
	<td>${usuario.rol}</td>
	<td><button class="button is-primary has-icons-left" type='button' onclick="ma.cargarForm(${index})">
	<span class="icon is-left pt-2">
	<icon-eye></icon-eye>
</span>
			</button>
	</td>`;
		if (empleado.estatus === 0) {
			/*HTML*/
			contenido += `
			<td><button class="button is-success has-icons-left" type='button' onclick="ma.activarEmpleado(${empleados[index].IdEmpleado})">
			<span class="icon is-left pt-2">
							<icon-check></icon-check>
						</span>
			</button></td>
			</tr>
		`;
		} else {
			/*HTML*/
			contenido += `
			<td><button class="button is-danger has-icons-left" type='button' onclick="ma.eliminarEmpleado(${empleados[index].IdEmpleado})">
			<span class="icon is-left pt-2">
							<icon-delete></icon-delete>
						</span>
			</button>
			</td>
			</tr>
			`;
		}
	});
	document.querySelector('tbody').innerHTML = contenido;
}

export async function activarEmpleado(idEmpleado) {
	const response = await fetch(
		'http://localhost:8080/Optik/api/empleado/activateempleado',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({ idEmpleado: idEmpleado })
		}
	);
	const data = await response.json();
	if (data.error) {
		mostrarAlerta('error', 'No se pudo activar el empleado');
		return;
	}
	mostrarAlerta('success', 'Empleado activado correctamente');
	tablaEmpleado('0');
}

//funcion para cargar el formulario con los datos del empleado
export function cargarForm(index) {
	document.getElementById('guardar').classList.add('is-hidden');
	document.getElementById('actualizar').classList.remove('is-hidden');
	const empleado = empleados[index];
	const { persona, usuario } = empleado;
	document.getElementById('nombre').value = persona.nombre;
	document.getElementById('apellidoPaterno').value =
		persona.apellidoPaterno;
	document.getElementById('apellidoMaterno').value =
		persona.apellidoMaterno;
	document.getElementById('genero').value = persona.genero;
	document.getElementById('fechaNacimiento').value =
		persona.fechaNacimiento;
	persona.fechaNacimiento = convertirFecha(persona.fechaNacimiento);
	document.getElementById('telCasa').value = persona.telCasa;
	document.getElementById('telMovil').value = persona.telMovil;
	document.getElementById('calle').value = persona.calle;
	document.getElementById('numero').value = persona.numero;
	document.getElementById('colonia').value = persona.colonia;
	document.getElementById('cp').value = persona.cp;
	document.getElementById('numero').value = persona.numero;
	document.getElementById('ciudad').value = persona.ciudad;
	document.getElementById('estado').value = persona.estado;
	document.getElementById('email').value = persona.email;
	document.getElementById('nombreUsuario').value = usuario.nombre;
	document.getElementById('contrasenia').value = usuario.contrasenia;
	document.getElementById('rol').value = usuario.rol;
	document.getElementById('index').value = index;
}

const limpiar = document.getElementById('limpiar');
limpiar.addEventListener('click', limpiarForm);
export function limpiarForm() {
	document.getElementById('guardar').classList.remove('is-hidden');
	document.getElementById('actualizar').classList.add('is-hidden');
	document.getElementById('nombre').value = '';
	document.getElementById('apellidoPaterno').value = '';
	document.getElementById('apellidoMaterno').value = '';
	document.getElementById('genero').value = 'M';
	document.getElementById('fechaNacimiento').value = '';
	document.getElementById('telCasa').value = '';
	document.getElementById('telMovil').value = '';
	document.getElementById('calle').value = '';
	document.getElementById('numero').value = '';
	document.getElementById('colonia').value = '';
	document.getElementById('cp').value = '';
	document.getElementById('numero').value = '';
	document.getElementById('ciudad').value = '';
	document.getElementById('estado').value = 'Aguascalientes';
	document.getElementById('email').value = '';
	document.getElementById('nombreUsuario').value = '';
	document.getElementById('contrasenia').value = '';
	document.getElementById('rol').value = 'Administrador';
	document.getElementById('index').value = '';
}

//actualizar los datos del empleado en el arreglo de empleados
const actualizar = document.getElementById('actualizar');
actualizar.addEventListener('click', actualizarEmpleado);
export function actualizarEmpleado() {
	//obtener los datos del formulario y ponerlos en un objeto empleado
	const index = document.getElementById('index').value;
	const em = empleados[index];
	if (validar() == false) {
		return;
	}

	const { persona, usuario } = em;
	const empleado = {
		persona: {
			idPersona: persona.idPersona,
			nombre: document.getElementById('nombre').value,
			apellidoPaterno:
				document.getElementById('apellidoPaterno').value,
			apellidoMaterno:
				document.getElementById('apellidoMaterno').value,
			genero: document.getElementById('genero').value,
			fechaNacimiento: convertirFecha(
				document.getElementById('fechaNacimiento').value
			),
			telCasa: document.getElementById('telCasa').value,
			telMovil: document.getElementById('telMovil').value,
			calle: document.getElementById('calle').value,
			numero: document.getElementById('numero').value,
			colonia: document.getElementById('colonia').value,
			cp: document.getElementById('cp').value,
			ciudad: document.getElementById('ciudad').value,
			estado: document.getElementById('estado').value,
			email: document.getElementById('email').value
		},
		usuario: {
			idUsuario: usuario.idUsuario,
			nombre: document.getElementById('nombreUsuario').value,
			contrasenia: document.getElementById('contrasenia').value,
			rol: document.getElementById('rol').value
		}
	};

	updateService(empleado);
}

async function updateService(empleado) {
	const index = document.getElementById('index').value;
	const em = empleados[index];

	const { persona, usuario } = empleado;

	const obj = {
		IdEmpleado: em.IdEmpleado,
		numeroUnico: em.numeroUnico,
		persona: persona,
		usuario: usuario
	};

	const e = {
		datosEmpleados: JSON.stringify(obj)
	};

	const response = await fetch(
		'http://localhost:8080/Optik/api/empleado/updateempleado',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(e)
		}
	);
	const data = await response.json();
	if (data.error) {
		mostrarAlerta('error', 'No se pudo actualizar el empleado');
		return;
	}
	mostrarAlerta('success', 'Empleado actualizado correctamente');
	//actualizar la tabla
	tablaEmpleado('1');
	limpiarForm();
}

export async function eliminarEmpleado(idEmpleado) {
	const resp = await fetch(
		'http://localhost:8080/Optik/api/empleado/deleteempleado',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({ idEmpleado })
		}
	);

	mostrarAlerta('success', 'Empleado eliminado correctamente');
	limpiarForm();
	tablaEmpleado('1');
}

//convertir 1901-01-01 a 01/01/1901
function convertirFecha(fecha) {
	const f = fecha.split('-');
	return `${f[2]}/${f[1]}/${f[0]}`;
}

const regexValidar = {
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
	contrasenia:
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/,
	//validar numero de telefono
	telefono: /^[0-9]{10}$/
};

function validar() {
	const nombre = document.getElementById('nombre');
	const apellidoPaterno = document.getElementById('apellidoPaterno');
	const apellidoMaterno = document.getElementById('apellidoMaterno');
	const telCasa = document.getElementById('telCasa');
	const telMovil = document.getElementById('telMovil');
	const calle = document.getElementById('calle');
	const numero = document.getElementById('numero');
	const colonia = document.getElementById('colonia');
	const cp = document.getElementById('cp');
	const ciudad = document.getElementById('ciudad');
	const email = document.getElementById('email');
	const nombreUsuario = document.getElementById('nombreUsuario');
	const contrasenia = document.getElementById('contrasenia');

	//validar que la fecha no sea mayor a la actual
	const fechaNacimiento = document.getElementById('fechaNacimiento');
	const fecha = new Date(fechaNacimiento.value);
	const hoy = new Date();
	if (fecha > hoy) {
		mostrarAlerta('error', 'La fecha no puede ser mayor a la actual');
		return false;
	}

	if (!regexValidar.letras.test(nombre.value)) {
		mostrarAlerta('warning', 'El nombre solo puede contener letras');
		return false;
	}
	if (!regexValidar.letras.test(apellidoPaterno.value)) {
		mostrarAlerta(
			'warning',
			'El apellido paterno solo puede contener letras'
		);
		return false;
	}
	if (!regexValidar.letras.test(apellidoMaterno.value)) {
		mostrarAlerta(
			'warning',
			'El apellido materno solo puede contener letras'
		);
		return false;
	}
	if (!regexValidar.telefono.test(telCasa.value)) {
		mostrarAlerta(
			'warning',
			'El telefono de casa solo puede contener 10 numeros'
		);
		return false;
	}
	if (!regexValidar.telefono.test(telMovil.value)) {
		mostrarAlerta(
			'warning',
			'El telefono movil solo puede contener 10 numeros'
		);
		return false;
	}
	if (!regexValidar.letras.test(calle.value)) {
		mostrarAlerta('warning', 'La calle solo puede contener letras');
		return false;
	}
	if (!regexValidar.numerosEnteros.test(numero.value)) {
		mostrarAlerta(
			'warning',
			'El numero solo puede contener numeros enteros'
		);
		return false;
	}
	if (!regexValidar.letras.test(colonia.value)) {
		mostrarAlerta('warning', 'La colonia solo puede contener letras');
		return false;
	}
	if (!regexValidar.cp.test(cp.value)) {
		mostrarAlerta(
			'warning',
			'El codigo postal solo puede contener 5 numeros'
		);
		return false;
	}
	if (!regexValidar.letras.test(ciudad.value)) {
		mostrarAlerta('warning', 'La ciudad solo puede contener letras');
		return false;
	}
	if (!regexValidar.email.test(email.value)) {
		mostrarAlerta('warning', 'El email no es valido');
		return false;
	}
	if (!regexValidar.letras.test(nombreUsuario.value)) {
		mostrarAlerta(
			'warning',
			'El nombre de usuario solo puede contener letras'
		);
		return false;
	}
	if (!regexValidar.contrasenia.test(contrasenia.value)) {
		mostrarAlerta(
			'warning',
			'La contrasenia debe tener de 8 a 20 caracteres, al menos una letra mayuscula, una letra minuscula, un numero y un caracter especial'
		);
		return false;
	}
	if (
		nombre.value == '' ||
		apellidoPaterno.value == '' ||
		apellidoMaterno.value == '' ||
		telCasa.value == '' ||
		telMovil.value == '' ||
		calle.value == '' ||
		numero.value == '' ||
		colonia.value == '' ||
		cp.value == '' ||
		ciudad.value == '' ||
		email.value == '' ||
		nombreUsuario.value == '' ||
		contrasenia.value == ''
	) {
		mostrarAlerta('warning', 'Todos los campos son obligatorios');
		return false;
	}

	return true;
}

const buscarP = document.getElementById('buscarP');
buscarP.addEventListener('click', () => {
	realizarBusqueda();
});
//mostrar en la tabla si coincide la búsqueda en los elementos de alumnos
export function realizarBusqueda() {
	mostrarTabla(null, empleados);
	//buscar si el valor de busqueda esta en el objeto empleado en alguna de sus propiedades
	//si lo encuentra, mostrarlo en la tabla agregando a coincidencias
	const busqueda = document.getElementById('buscar').value;
	const coincidencias = [];
	for (let i = 0; i < empleados.length; i++) {
		const empleado = empleados[i];
		//nombre sin importar mayusculas o minusculas
		if (
			empleado.persona.nombre
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.persona.apellidoPaterno
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.persona.apellidoMaterno
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.persona.telCasa
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.persona.telMovil
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.persona.calle
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.persona.numero
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.persona.colonia
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.persona.cp
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.persona.ciudad
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.persona.email
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.usuario.nombre
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.persona.genero
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.persona.fechaNacimiento
				.toLowerCase()
				.includes(busqueda.toLowerCase()) ||
			empleado.usuario.rol
				.toLowerCase()
				.includes(busqueda.toLowerCase())
		) {
			coincidencias.push(empleado);
		}
	}
	mostrarTabla(coincidencias, null);
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

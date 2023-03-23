let graduaciones = [];

export function insertar() {
	let esferaod = document.getElementById('eod').value;
	let esferaoi = document.getElementById('eoi').value;
	let cilindrood = document.getElementById('cod').value;
	let cilindrooi = document.getElementById('coi').value;
	let ejeoi = document.getElementById('ejeoi').value;
	let ejeod = document.getElementById('ejeod').value;
	let dip = document.getElementById('dip').value;
	if (validar() == false) {
		return;
	}

	let graduacion = {
		datosGraduacion: JSON.stringify({
			esferaod,
			esferaoi,
			cilindrood,
			cilindrooi,
			ejeoi,
			ejeod,
			dip
		})
	};

	let params = new URLSearchParams(graduacion);

	fetch('http://localhost:8080/Optik/api/graduacion/insertar', {
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
				mostrarAlerta('error', 'Error al insertar la graduación');
				return;
			}
			mostrarAlerta('success', 'Graduación insertada correctamente');
			getAll();
			limpiar();
		});
}

export function getAll() {
	let datos = { estatus: 1 };
	let params = new URLSearchParams(datos);

	fetch('http://localhost:8080/Optik/api/graduacion/getAll', {
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
				mostrarAlerta('error', 'Error al obtener las graduaciones');
				return;
			} else {
				cargarTablaMaterial(data);
			}
		});
}

export function cargarTablaMaterial(data) {
	graduaciones = data;

	let contenido = '';
	for (let i = 0; i < data.length; i++) {
		contenido += `
                    <tr>
                        <td>${data[i].esferaod} </td>
                        <td>${data[i].esferaoi} </td>
                        <td>${data[i].cilindrood}</td>
                        <td>${data[i].cilindrooi}</td>
                        <td>${data[i].ejeod}</td>
                        <td>${data[i].ejeoi}</td>
                        <td>${data[i].dip}</td>
                        <td> <button class='button is-primary has-icons-left' type='button' onclick='mg.cargarForm(${i});'>
                        <span class="icon is-left pt-2">
			<icon-eye></icon-eye>
		</span></td>
                        </button></td>
                    `;
		if (data[i].estatus === 1) {
			contenido += `
                        <td><button class='button is-danger has-icons-left' type='button' onclick='mg.eliminar(${data[i].idGraduacion})';><span class="icon is-left pt-2">
                        <icon-delete></icon-delete>
                      </span></button></td>
                       `;
		} else {
			contenido += ` <td><button class='button is-success has-icons-left' type='button' onclick='mg.activar(${data[i].idGraduacion})';>
      <span class="icon is-left pt-2">
							<icon-check></icon-check>
						</span
      </button></td>
               </tr>
            `;
		}
	}

	document.querySelector('tbody').innerHTML = contenido;
}

export function getAllIn() {
	let datos = { estatus: 0 };
	let params = new URLSearchParams(datos);

	fetch('http://localhost:8080/Optik/api/graduacion/getAllIn', {
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
				mostrarAlerta('error', 'Error al obtener las graduaciones');
				return;
			}
			cargarTablaMaterial(data);
		});
}

export function cargarForm(i) {
	document.getElementById('guardar').classList.add('is-hidden');
	document.getElementById('actualizar').classList.remove('is-hidden');
	document.getElementById('idGraduacion').value =
		graduaciones[i].idGraduacion;
	document.getElementById('eod').value = graduaciones[i].esferaod;
	document.getElementById('eoi').value = graduaciones[i].esferaoi;
	document.getElementById('cod').value = graduaciones[i].cilindrood;
	document.getElementById('coi').value = graduaciones[i].cilindrooi;
	document.getElementById('ejeod').value = graduaciones[i].ejeod;
	document.getElementById('ejeoi').value = graduaciones[i].ejeoi;
	document.getElementById('dip').value = graduaciones[i].dip;
}

export function limpiar() {
	document.getElementById('guardar').classList.remove('is-hidden');
	document.getElementById('actualizar').classList.add('is-hidden');
	document.getElementById('eod').value = '';
	document.getElementById('eoi').value = '';
	document.getElementById('cod').value = '';
	document.getElementById('coi').value = '';
	document.getElementById('ejeod').value = '';
	document.getElementById('ejeoi').value = '';
	document.getElementById('dip').value = '';
}

export function actualizar() {
	let esferaod = document.getElementById('eod').value;
	let esferaoi = document.getElementById('eoi').value;
	let cilindrood = document.getElementById('cod').value;
	let cilindrooi = document.getElementById('coi').value;
	let ejeoi = document.getElementById('ejeoi').value;
	let ejeod = document.getElementById('ejeod').value;
	let dip = document.getElementById('dip').value;
	let idGraduacion = document.getElementById('idGraduacion').value;
	if (validar() == false) {
		return;
	}
	//encontrar la graduacion a actualizar con el id
	let grad = graduaciones.find(
		graduacion => graduacion.idGraduacion == idGraduacion
	);

	let graduacion = {
		datosGraduacion: JSON.stringify({
			esferaod,
			esferaoi,
			cilindrood,
			cilindrooi,
			ejeoi,
			ejeod,
			dip,
			idGraduacion
		})
	};

	let params = new URLSearchParams(graduacion);

	fetch('http://localhost:8080/Optik/api/graduacion/actualizar', {
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
				mostrarAlerta('error', 'Error al actualizar la graduación');
				return;
			}
			mostrarAlerta(
				'success',
				'Graduación actualizada correctamente'
			);
			if (grad.estatus == 1) {
				getAll();
			} else {
				getAllIn();
			}

			limpiar();
		});
}

export function eliminar() {
	let idGraduacion = document.getElementById('idGraduacion').value;
	let estatus = 0;

	let ma = {
		idGraduacion: idGraduacion,
		estatus: estatus
	};

	let graduacion = { datosGraduacion: JSON.stringify(ma) };

	let param = new URLSearchParams(graduacion);

	fetch('http://localhost:8080/Optik/api/graduacion/eliminar', {
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
				mostrarAlerta('error', 'Error al eliminar la graduación');
				return;
			}
			mostrarAlerta('success', 'Graduación eliminada correctamente');
			getAll();
			limpiar();
		});
}

export function activar() {
	let idGraduacion = document.getElementById('idGraduacion').value;
	let estatus = 1;

	let ma = {
		idGraduacion: idGraduacion,
		estatus: estatus
	};

	let graduacion = { datosGraduacion: JSON.stringify(ma) };

	let param = new URLSearchParams(graduacion);

	fetch('http://localhost:8080/Optik/api/graduacion/activar', {
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
				mostrarAlerta('error', 'Error al activar la graduación');
				return;
			}
			mostrarAlerta('success', 'Graduación activada correctamente');
			getAllIn();
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
	//validar numeros y punto
	numeros: /^[0-9.]+$/,
	//validar numero entero
	numerosEnteros: /^[0-9]+$/,
	//validar numeros y /
	numerosDiagonal: /^[0-9/]+$/
};

function validar() {
	const eod = document.getElementById('eod').value;
	const eoi = document.getElementById('eoi').value;
	const cod = document.getElementById('cod').value;
	const coi = document.getElementById('coi').value;
	const ejeod = document.getElementById('ejeod').value;
	const ejeoi = document.getElementById('ejeoi').value;
	const dip = document.getElementById('dip').value;

	if (!regexValidar.numerosDiagonal.test(dip)) {
		mostrarAlerta(
			'warning',
			'El campo DIP solo acepta números y tiene que llevar diagonal'
		);
		return false;
	}
	//validar que no esten vacios
	if (
		eod == '' ||
		eoi == '' ||
		cod == '' ||
		coi == '' ||
		ejeod == '' ||
		ejeoi == '' ||
		dip == ''
	) {
		mostrarAlerta('warning', 'Todos los campos son obligatorios');
		return false;
	}

	if (!regexValidar.numeros.test(eod)) {
		mostrarAlerta('warning', 'El campo EOD solo acepta números');
		return false;
	}
	if (!regexValidar.numeros.test(eoi)) {
		mostrarAlerta('warning', 'El campo EOI solo acepta números');
		return false;
	}
	if (!regexValidar.numerosEnteros.test(cod)) {
		mostrarAlerta('warning', 'El campo COD solo acepta números');
		return false;
	}
	if (!regexValidar.numerosEnteros.test(coi)) {
		mostrarAlerta('warning', 'El campo COI solo acepta números');
		return false;
	}
	if (!regexValidar.numerosEnteros.test(ejeod)) {
		mostrarAlerta('warning', 'El campo EJEOD solo acepta números');
		return false;
	}
	if (!regexValidar.numerosEnteros.test(ejeoi)) {
		mostrarAlerta('warning', 'El campo EJEOD solo acepta números');
		return false;
	}

	return true;
}

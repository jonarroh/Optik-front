let clientes = [];
let examenVista = [];
let armazones = [];
let materiales = [];

export function inicializarComponentes() {
	getAllClientes();
	getAllArmazon();
	getAllMaterial();
}

export function getAllClientes() {
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
			clientes = data;

			let selectCliente = document.getElementById('selectCliente');
			let conteido =
				'<option value="0">Seleccione un cliente</option>';
			clientes.forEach(cliente => {
				conteido += `<option value="${cliente.idCliente}">${cliente.persona.nombre} ${cliente.persona.apellidoPaterno} ${cliente.persona.apellidoMaterno}</option>`;
			});
			selectCliente.innerHTML = conteido;
		});
}

export function filterCliente(nombre) {
	let clientesFiltrados = clientes.filter(cliente =>
		cliente.persona.nombre
			.toLowerCase()
			.includes(nombre.toLowerCase())
	);
	let selectCliente = document.getElementById('selectCliente');
	let conteido = '<option value="0">Seleccione un cliente</option>';
	clientesFiltrados.forEach(cliente => {
		conteido += `<option value="${cliente.idCliente}">${cliente.persona.nombre} ${cliente.persona.apellidoPaterno} ${cliente.persona.apellidoMaterno}</option>`;
	});
	selectCliente.innerHTML = conteido;
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
let idCliente = document.querySelector('#selectCliente');
idCliente.addEventListener('change', () => {
	let idCliente = document.querySelector('#selectCliente').value;
	console.log(idCliente);
	getAllExamenVista(idCliente);
});
//cargar los examenes en el select
export function getAllExamenVista(idCliente) {
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
			examenVista = dataEv;
			if (dataEv.error) {
				mostrarAlerta(
					'error',
					'Error al obtener los examenes de vista'
				);
			} else {
				console.log({ dataEv });
				//filtrar los examenes de vista por cliente en base al idCliente
				let examenesVista = dataEv.filter(
					examenVista => examenVista.cliente.idCliente == idCliente
				);
				console.log(examenesVista);

				let select = document.querySelector('#selectGraduacion');
				select =
					"<option value=''>Seleccione un examen de vista</option>";
				examenesVista.forEach(examenVista => {
					select += `
          <option value="${examenVista.idExamenVista}">
          ${
						examenVista.cliente.persona.nombre +
						' ' +
						examenVista.idExamenVista
					}
          ${new Date(examenVista.fecha).toLocaleString()} </option>
          `;
				});

				document.querySelector('#selectGraduacion').innerHTML =
					select;
			}
		});
}

export function getAllArmazon() {
	let datos = { estatus: '1' };
	let parametros = new URLSearchParams(datos);

	fetch('http://localhost:8080/Optik/api/armazon/getAllArmazon', {
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
			} else {
				armazones = data;
				let select = document.querySelector('#selectArmazon');
				select = "<option value=''>Seleccione un armazon</option>";
				data.forEach(armazon => {
					select += `
          <option value="${armazon.idArmazon}">
          ${armazon.producto.nombre} - ${armazon.producto.marca}  - ${armazon.producto.precioVenta}
          </option>
          `;
				});
				document.querySelector('#selectArmazon').innerHTML = select;
			}
		});
}

export function getAllMaterial() {
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
				materiales = data;
				let select = document.querySelector('#selectMaterial');
				select = "<option value=''>Seleccione un material</option>";
				data.forEach(material => {
					select += `
          <option value="${material.idMaterial}">
          ${material.nombre} - ${material.precioVenta}
          </option>
          `;
				});
				document.querySelector('#selectMaterial').innerHTML = select;
			}
		});
}

let presupuestoLentes = [];
let ventaPresupuesto = [];
const venta = document.querySelector('#buscarL');
venta.addEventListener('click', async () => {
	let clave = `OQ-${Math.floor(Math.random() * 100000000000)}`;

	//obtener de la tabla la alturaOblea, cantidad, costo y descuento
	let tabla = Array.from(
		document.querySelectorAll('#tblPresupuestoLete tr')
	);
	tabla.forEach((tr, index) => {
		let alturaOblea = tr.querySelector('td:nth-child(1) input').value;
		console.log({ alturaOblea });
		let cantidad = tr.querySelector('td:nth-child(2) input').value;
		console.log({ cantidad });
		let precioVenta = tr.querySelector('td:nth-child(3) input').value;
		let descuento = tr.querySelector('td:nth-child(4) input').value;

		let pre = Number(descuento) / 100;
		precioVenta = Number(precioVenta) * Number(cantidad) * (1 - pre);
		console.log({ pre, precioVenta, cantidad });

		//agregar alturaOblea al objeto de presupuestoLentes
		presupuestoLentes[index].alturaOblea = alturaOblea;
		//agregar cantidad al objeto de ventaPresupuesto
		ventaPresupuesto.push({
			cantidad: cantidad,
			precioVenta: precioVenta,
			descuento: descuento,
			precioUnitario: precioVenta,
			ventaPresupuesto: presupuestoLentes,
			presupuestoLentes: presupuestoLentes[index]
		});
	});

	let ventas = {
		clave: clave,
		empleado: JSON.parse(localStorage.getItem('currentUser'))
	};

	const DetalleVentaPresupuestoLentes = {
		venta: ventas,
		ventaPresupuesto: ventaPresupuesto
	};
	console.log(DetalleVentaPresupuestoLentes);

	const datosVLC = new URLSearchParams();
	datosVLC.append(
		'datosVLC',
		JSON.stringify(DetalleVentaPresupuestoLentes)
	);

	const data = await fetch(
		'http://localhost:8080/Optik/api/vp/generarVLC',
		{
			method: 'POST',
			body: datosVLC,
			headers: {
				'Content-Type':
					'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}
	).then(response => response.json());

	if (data.error) {
		mostrarAlerta('error', 'Error al generar el presupuesto');
	} else {
		mostrarAlerta('success', 'Presupuesto generado correctamente');
	}
});
let tratamientosO = new Map();
tratamientosO.set('antirreflejante', {
	idTratamiento: 1,
	nombre: 'Antirreflejante',
	precioVenta: 100,
	precioCompra: 50
});
tratamientosO.set('blue-free', {
	idTratamiento: 2,
	nombre: 'Blue Free',
	precioVenta: 100,
	precioCompra: 50
});
tratamientosO.set('fotocromatico', {
	idTratamiento: 3,
	nombre: 'Fotocromatico',
	precioVenta: 100,
	precioCompra: 50
});
tratamientosO.set('entintado', {
	idTratamiento: 4,
	nombre: 'Entintado',
	precioVenta: 100,
	precioCompra: 50
});
let tiposMica = new Map();
tiposMica.set('graduacion', {
	idTipoMica: 1,
	nombre: 'Graduacion',
	precioVenta: 100,
	precioCompra: 50
});
tiposMica.set('estetica', {
	idTipoMica: 2,
	nombre: 'Estetica',
	precioVenta: 100,
	precioCompra: 50
});

let contenido = '';
export function agregarLente() {
	let precioLentes = 0;
	let armazon = armazones.find(
		armazon =>
			armazon.idArmazon ==
			document.querySelector('#selectArmazon').value
	);
	console.log({ armazon });
	let material = materiales.find(
		material =>
			material.idMaterial ==
			document.querySelector('#selectMaterial').value
	);
	console.log({ material });
	let tipoMica = document.querySelector('#selectMica').value;
	console.log({ tipoMica });
	precioLentes += tiposMica.get(tipoMica).precioVenta;
	let mica = tiposMica.get(tipoMica);

	let tratamientos = document.querySelectorAll('#chkTratamiento');
	let listaTratamiento = [];
	//enlazar los tratamientos seleccionados con el map de tratamientos
	tratamientos.forEach(tratamiento => {
		if (tratamiento.checked) {
			listaTratamiento.push(tratamientosO.get(tratamiento.value));
		}
	});

	//calcular el precio de los lentes
	precioLentes += armazon.producto.precioVenta;
	precioLentes += material.precioVenta;
	//calcular el pprecio del tipo de mica con el objeto tipoMica

	listaTratamiento.forEach(tratamiento => {
		precioLentes += tratamiento.precioVenta;
	});
	//agregar a presupuestoLentes
	presupuestoLentes.push({
		presupuesto: {
			examenVista: examenVista.find(
				examenVista =>
					examenVista.idExamenVista ==
					document.querySelector('#selectGraduacion').value
			),
			clave: `OQ-${Math.floor(Math.random() * 100000000000)}`,
			empleado: JSON.parse(localStorage.getItem('currentUser')),
			clientes: clientes.find(
				cliente =>
					cliente.idCliente ==
					document.querySelector('#selectCliente').value
			),
			graduacionLentes: '',
			fecha: ''
		},
		alturaOblea: 0,
		tipoMica: mica,
		material: material,
		armazon: armazon,
		listaTratamiento: listaTratamiento
	});

	console.log(presupuestoLentes);

	console.log(precioLentes);
	//agrergar los lentes a la lista de lentes
	let tabla = document.querySelector('#tblPresupuestoLete');

	contenido += `
		<tr>
		<td><input type="text" class="input" value="0" name="alturaOblea"/></td>
		<td><input type="text" class="input" value="1" name="cantidad"/></td>
		<td><input type="text" class="input" value="${precioLentes}" disabled name="costo"/></td>
		<td><input type="text" class="input" value="0" name="descuento"/></td>
		</tr>
		`;

	tabla.innerHTML = contenido;
}

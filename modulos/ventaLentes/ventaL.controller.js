let productos = [];
let productosAgregar = [];
let examenVista = [];
let lentesContacto = [];

export function inicializarVentaLentes() {
	//obtener todos los clientes
	getAll();
	tablaLenteC('1');
}

let idCliente = document.querySelector('#selectCliente');
idCliente.addEventListener('change', () => {
	let idCliente = document.querySelector('#selectCliente').value;
	getAllExamenVista(idCliente);
});

//cagarmos los clientes en el select
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
			let clientes = data;

			let select = document.querySelector('#selectCliente');
			select = "<option value=''>Seleccione un cliente</option>";
			clientes.forEach(cliente => {
				select += `
        <option value="${cliente.idCliente}"   id="${cliente.idCliente}"  >${cliente.persona.nombre} ${cliente.persona.apellidoPaterno} ${cliente.persona.apellidoMaterno}</option>

        `;
			});

			document.querySelector('#selectCliente').innerHTML = select;
		});
}
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
				//filtrar los examenes de vista por cliente en base al idCliente
				let examenesVista = dataEv.filter(
					examenVista => examenVista.cliente.idCliente == idCliente
				);
				console.log(examenesVista);

				let select = document.querySelector('#selectExamenVista');
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

				document.querySelector('#selectExamen').innerHTML = select;
			}
		});
}

//cargar los productos en la tabla
export async function tablaLenteC(estatus) {
	try {
		const {
			usuario: { lastToken = '' }
		} = JSON.parse(localStorage.getItem('currentUser'));
		const response = await fetch(
			'http://localhost:8080/Optik/api/lenteContacto/getalllente',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					estatus: estatus,
					token: lastToken
				})
			}
		).catch(error => {
			console.log('error en la peticion');
		});
		const data = await response.json();
		lentesContacto = data;
		productos = data;
		if (data.error) {
			alert(data.error);
			return;
		}
		//crear la tabla
		mostrarTabla(null, data);
	} catch (error) {
		console.log(error);
		mostrarAlerta(
			'error',
			'no hay token, Cierre sesion y vuelva a iniciar'
		);
	}
}

function mostrarTabla(coincidencias, data) {
	let contenido = '';
	data.forEach((lenteContacto, index) => {
		const { producto, keratometria, fotografia, tipo } =
			lenteContacto;
		contenido +=
			/*html*/
			`
    <tr>
    <td>${producto.nombre}</td>
    <td>${producto.precioVenta}</td>
    <td>${producto.existencias}</td>
    <td><img src="${fotografia}" alt="fotografia" width="100px" height=100px/></td>
    `;

		contenido += `<td><button class="button is-success has-icons-left" type='button' onclick="mv.agregarProducto(${producto.idProducto})">
			<span class="icon is-left pt-2">
							<icon-check></icon-check>
						</span>
						</button></td>`;
	});
	document.querySelector('tbody').innerHTML = contenido;
}

//agregar productos a la tabla y al arreglo
export function agregarProducto(idProducto) {
	productosAgregar.push(idProducto);

	let producto = productos.find(
		producto => producto.producto.idProducto == idProducto
	);
	let contenido = '';
	contenido +=
		/*html*/
		`
  <tr>
  <td>${producto.producto.nombre}</td>
  <td>${producto.producto.precioVenta}</td>
  <td><input value="1" class="input" /></td>
  <td><input value="0" class="input" /></td>
  </tr>`;

	document.querySelector('#tblVLC').innerHTML += contenido;
	//calcular el total
	let total = 0;
	productosAgregar.forEach(idProducto => {
		let producto = productos.find(
			producto => producto.producto.idProducto == idProducto
		);
		total += producto.producto.precioVenta;
	});
	document.querySelector('#total').textContent = total;
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

export async function guardarVentaLenteContacto() {
	let clave = `OQ-${Math.floor(Math.random() * 100000000000)}`;
	let empleado = JSON.parse(localStorage.getItem('currentUser'));
	let total = Number(document.querySelector('#total').textContent);
	let venta = { clave, empleado };
	//encontrar en el arreglo de examenes de vista el id del examen seleccionado
	let idExamenVista = document.querySelector('#selectExamen').value;
	idExamenVista = examenVista.find(
		examenVista => examenVista.idExamenVista == idExamenVista
	);

	let ventaPresupuestosLC = [];

	let tabla = Array.from(document.querySelectorAll('#tblVLC tr'));
	tabla.forEach((tr, index) => {
		let cantidad = Number(
			tr.querySelector('td:nth-child(3) input').value
		);
		let descuento = Number(
			tr.querySelector('td:nth-child(4) input').value
		);
		let precio = Number(
			tr.querySelector('td:nth-child(2)').textContent
		);
		console.log({
			cantidad,
			descuento,
			precio
		});
		const preDescuento = descuento / 100;
		//se calcula el total de la venta
		total += precio * cantidad * (1 - preDescuento);
		console.log(total);
		document.querySelector('#total').value = total;

		let lenteContacto = lentesContacto.find(
			lenteContacto =>
				lenteContacto.producto.idProducto == productosAgregar[index]
		);
		ventaPresupuestosLC.push({
			cantidad,
			precioUnitario: precio,
			descuento,
			presupuestoLC: {
				lenteContacto,
				presupuesto: { examenVista: idExamenVista, clave: clave },
				clave
			}
		});
	});

	let DetalleVentaLC = {
		venta,
		ventaPresupuestosLC
	};
	console.log(DetalleVentaLC);

	let ventalc = new URLSearchParams();
	ventalc.append('datosVentaLc', JSON.stringify(DetalleVentaLC));

	try {
		const data = await fetch(
			'http://localhost:8080/Optik/api/vp/ventalc',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: ventalc
			}
		)
			.then(response => response.json())
			.catch(error => {
				console.log('error en la peticion');
			});

		if (data.error) {
			mostrarAlerta('error', data.error);
			return;
		}
		mostrarAlerta('success', 'Venta realizada con exito');
		//borrar los datos de la tabla
		document.querySelector('#tblVLC').innerHTML = '';
	} catch (error) {
		console.log(error);
	}
}

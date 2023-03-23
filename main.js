const login = document.getElementById('login');
login.addEventListener('click', async function () {
	localStorage.setItem('vistaActual', '');

	const text = await encriptar(
		document.getElementById('contrasenia').value
	);

	const datos = {
		datosUsuario: JSON.stringify({
			nombre: document.getElementById('nombre').value,
			contrasenia: text.toString()
		})
	};
	//agregar is-loading como clase al boton
	login.classList.add('is-loading');
	const response = await fetch(
		'http://localhost:8080/Optik/api/login/ingresar2',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams(datos)
		}
	);
	const data = await response.json();
	console.log(data);
	if (data.error) {
		login.classList.remove('is-loading');
		mostrarAlerta('error', 'Usuario o contraseña incorrectos');
		return;
	}
	//agregar en el localstorage el token
	localStorage.setItem('currentUser', JSON.stringify(data));
	localStorage.setItem('vistaActual', 'inicio');
	window.location.href = 'modulos/';
});

function mostrarAlerta(icon, mensaje) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'center',
		showConfirmButton: true,
		timer: 3000,
		timerProgressBar: true
	});

	Toast.fire({
		icon: icon,
		title: mensaje
	});
}

async function encriptar(texto) {
	const encoder = new TextEncoder(); //Invocamos la clase q convierte un String en bytes
	const data = encoder.encode(texto); //Hace la conversión
	const hash = await crypto.subtle.digest('SHA-256', data); //crypto toma los bytes y los encripta, devuelve un buffer
	const hashArray = Array.from(new Uint8Array(hash)); // convierte el buffer en un arreglo de bytes
	const hashHex = hashArray
		.map(b => b.toString(16).padStart(2, '0'))
		.join(''); // convierte los bytes en string
	return hashHex;
}

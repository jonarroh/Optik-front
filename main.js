const SERVER = ' https://bb29-177-228-33-148.ngrok.io/Optik';

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
	const response = await fetch(`${SERVER}/api/login/ingresar2`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams(datos)
	});
	const data = await response.json().catch(error => {
		login.classList.remove('is-loading');
		mostrarAlerta('error', 'Usuario o contraseña incorrectos');
		return;
	});
	console.log(data);
	if (data.error) {
		login.classList.remove('is-loading');
		mostrarAlerta('error', 'Usuario o contraseña incorrectos');
		return;
	}
	//agregar en el localstorage el token
	localStorage.setItem('currentUser', JSON.stringify(data));
	localStorage.setItem('vistaActual', 'inicio');
	//traer el index.html de modulos y mostrarlo en index.html principal
	const response2 = await fetch('modulos/index.html');
	const data2 = await response2.text();
	document.getElementById('web').innerHTML = data2;
	//cagar el script NProgress que esta en la carpeta js
	const script2 = document.createElement('script');
	script2.src = 'js/nprogress.js';
	document.body.appendChild(script2);
	//cargar el script de modulos
	const script = document.createElement('script');
	script.src = 'modulos/main.js';
	document.body.appendChild(script);
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

/*Se crea un array del tipo JSON*/
var app = {
	inicio: function(){							//Se define el primer elemento del objeto	
		this.iniciarFastClick();				//Se llama a dos funciones principales
		this.iniciaBoton();
	},

	iniciarFastClick: function(){				//se define el segundo elemnto del objeto
		FastClick.attach(document.body);		//Se agrega la loibreria FastClick al cuerpo de la pagina
	},

	iniciaBoton: function(){					//Se define el tercer elemento del objeto
		var buttonAction = document.querySelector("#boton-act");		//se crea una variable a partir del elemento que corresponde el identificador 
		buttonAction.addEventListener('click', function(){
			app.cargarFoto(Camera.PictureSourceType.CAMERA);
		});			//Se agrega un evento al elemnto del tipo Listener para identificar cuando sea clickeado
		
		//Filtros
		var filterButtons = document.querySelectorAll('.boton-filtro');
		filterButtons[0].addEventListener('click', function(){
			app.aplicarFiltro('gray');
		});
		filterButtons[1].addEventListener('click', function(){
			app.aplicarFiltro('negative');
		});
		filterButtons[2].addEventListener('click', function(){
			app.aplicarFiltro('sepia');
		});

		var buttonGallery = document.querySelector('#boton-galeria');
		buttonGallery.addeventListener('click', function(){
			app.cargarFoto(Camera.PictureSourceType.PHOTOLIBRARY);
		});
	},

	/*Acceso al plugin de cordova*/
	cargarFoto: function(pictureSourceType){
		var opciones = {
			quality:50,				//calidad de la foto
			sourceType:pictureSourceType,
			destinationType: Camera.DestinationType.FILE_URI,		//destino de la foto
			targetWidth:300,			//ancho de la foto
			targetHeight:300,			//alto de la foto
			correctOrientation: true
		};

		navigator.camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, opciones);
	},

	fotoTomada: function(imageURI){
		var image = document.createElement('img');

		image.onload = function(){
			app.pintarFoto(image);
		}
		image.src = imageURI;
	},

	//funcion pintar foto
	pintarFoto: function(image){
		var canvas = document.querySelector('#foto');
		var context = canvas.getContext('2d');
		canvas.width = image.width;
		canvas.height = image.height;
		context.drawImage(image, 0, 0, image.width, image.height);
	},

	errorAlTomarFoto: function(){
		console.log('Fallo al tomar foto o foto cancelada: '+message);
	},

	aplicarFiltro: function(filterName){
		var canvas = document.querySelector('#foto');
		var context = canvas.getContext('2d');

		imageData = context.getImageData(0,0,canvas.width,canvas.height);

		effects[filterName] (imageData.data);
		context.putImageData(imageData, 0, 0);
	}
};			//Fin del objeto JSON

var imageData;
if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	},false);

}
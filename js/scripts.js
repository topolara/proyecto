

function updateOpacityc() {
	document.getElementById("span-opacityc").innerHTML = document.getElementById("sld-opacityc").value;
	calor_docen.setOpacity(document.getElementById("sld-opacityc").value);
}

function updateOpacityi() {
	document.getElementById("span-opacityi").innerHTML = document.getElementById("sld-opacityi").value;
	calor_inves.setOpacity(document.getElementById("sld-opacityi").value);
}

function updateOpacitya() {
	document.getElementById("span-opacitya").innerHTML = document.getElementById("sld-opacitya").value;
	calor_social.setOpacity(document.getElementById("sld-opacitya").value);
}

/*####################################*/


function colorPuntos(d) { 
	return d == "San José" ? '#000000' : 
	d == "Alajuela" ? '#FF0000' : 
	d == "Cartago" ? '#FFFF00' : 
	d == "Heredia" ? '#00FF00' :
	d == "Guanacaste" ? '#00FFFF' :
	d == "Puntarenas" ? '#0000FF' :
	d == "Limón" ? '#800080' :
	'#000000'; 
};
 
function estilo_gira (feature) {
	return {
	radius: 5,
	fillColor: colorPuntos(feature.properties.Provincia), 
	color: colorPuntos(feature.properties.Provincia), 
	weight: 1,
	opacity : 1,
	fillOpacity : 0.8
	};
};

function popup_gira (feature, layer) {
	layer.bindPopup("<div style=text-align:center><h3>"+"ID: "+feature.properties.Id_Objeto+
	"<h3></div><hr><table><tr><td><strong>Destino: </strong>"+feature.properties.Destino+
	"</td></tr><tr><td><strong>Docente: </strong>"+feature.properties.Docente+
	"</td></tr></table>",
	{minWidth: 150, maxWidth: 250});				
};


var MarkerOptions = {
	radius: 5,
	fillColor: "#ff7800",
	color: "#000",
	weight: 1,
	opacity: 1,
	fillOpacity: 0.8
};



/*####################################*/

// Creación de un mapa de Leaflet
var map = L.map("mapid");
var eitgira = L.layerGroup().addTo(map);

// Centro del mapa y nivel de acercamiento
var ucr = L.latLng([9.93541338, -84.05142080]);
var zoomLevel = 7;

// Definición de la vista del mapa
map.setView(ucr, zoomLevel);

// Adición de capa
esriLayer = L.tileLayer.provider("Esri.WorldImagery").addTo(map);
osmLayer = L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(map);



var calor_docen = L.imageOverlay("datos/calor_docen.png", 
	[[10.7847561049999996, -85.7979904940000040], 
	[8.4090141050000007, -82.4975584940000033]], 
	{opacity:1}
).addTo(map);


var calor_inves = L.imageOverlay("datos/calor_inves.png", 
	[[11.1721899290000000, -85.8982477779999982], 
	[8.4360559290000001, -82.5503957779999951]], 
	{opacity:1}
).addTo(map);


var calor_social = L.imageOverlay("datos/calor_social.png", 
	[[10.4586551930000002, -84.5045552219999934], 
	[8.2441411930000008, -82.9349532220000043]], 
	{opacity:1}
).addTo(map);



var baseMaps = {
	"ESRI World Imagery": esriLayer,
	"OpenStreetMap": osmLayer
	
};
var overlayMaps = {
	"Calor Docencia" :calor_docen,
	"Calor Investigación" :calor_inves,
	"Calor Acción Social" :calor_social,
	
};
control_layers = L.control.layers(baseMaps, overlayMaps, {position:'topleft', collapsed:false} ).addTo(map);

L.control.zoom({position:'topright'} ).addTo(map);
L.control.scale({position:'topright', imperial:false} ).addTo(map);



$.getJSON("datos/1gira_docen.geojson", function(geodata) {
	var gira_docen = L.geoJson(geodata, {
		pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, MarkerOptions);
		},
			
		style: estilo_gira,
		onEachFeature: function(feature, layer) {
			var popupText = "ID: " + feature.properties.Id_Objeto + "<br>" + "Destino: " + feature.properties.Destino + "<br>" + "Docente: " + feature.properties.Docente;
			layer.bindPopup(popupText);
		}			
	}).addTo(map);
	control_layers.addOverlay(gira_docen, 'Gira Docencia');
});

$.getJSON("datos/1gira_inves.geojson", function(geodata) {
	var gira_inves = L.geoJson(geodata, {
		pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, MarkerOptions);
		},
		style: estilo_gira,
		onEachFeature: function(feature, layer) {
			var popupText = "ID: " + feature.properties.Id_Objeto + "<br>" + "Destino: " + feature.properties.Destino + "<br>"  + "Docente: " + feature.properties.Docente;
			layer.bindPopup(popupText);
		}			
	}).addTo(map);
	control_layers.addOverlay(gira_inves, 'Gira Investigación');
});

$.getJSON("datos/1gira_social.geojson", function(geodata) {
	var gira_social = L.geoJson(geodata, {
		pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, MarkerOptions);
		},
		style: estilo_gira,
		onEachFeature: function(feature, layer) {
			var popupText = "ID: " + feature.properties.Id_Objeto + "<br>" + "Destino: " + feature.properties.Destino + "<br>"  + "Docente: " + feature.properties.Docente;
			layer.bindPopup(popupText);
		}			
	}).addTo(map);
	control_layers.addOverlay(gira_social, 'Gira Acción Social');
});

/* Docencia */
function myFunction0() 
{ 
	var gira_docen = $.getJSON("datos/1gira_docen.geojson", function(geodata) {
	var gira_docen = L.geoJson(geodata, {
		pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, MarkerOptions);
		},
		style: estilo_gira,
		onEachFeature: popup_gira
	}).addTo(map);
});
eitgira.addLayer(gira_docen);
}

function estiloSelect0() {
		var miSelect = document.getElementById("estilo0").value;
		$.getJSON("datos/1gira_docen.geojson", function(geodata) {
		var gira_docen = L.geoJson(geodata, {
		pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, MarkerOptions);
		},
		filter: function(feature, layer) {								
			if(miSelect != "TODOS")		
			return (feature.properties.Provincia == miSelect );
			else
			return true;
		},	
			style: estilo_gira,
		onEachFeature: popup_gira});		
		eitgira.clearLayers();
		eitgira.addLayer(gira_docen);
		
 });
 }

/* Investigación */
function myFunction1() 
{ 
	var gira_inves = $.getJSON("datos/1gira_inves.geojson", function(geodata) {
	var gira_inves = L.geoJson(geodata, {
		pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, MarkerOptions);
		},
		style: estilo_gira,
		onEachFeature: popup_gira
	}).addTo(map);
});
eitgira.addLayer(gira_inves);
}

function estiloSelect1() {
		var miSelect = document.getElementById("estilo1").value;
		$.getJSON("datos/1gira_inves.geojson", function(geodata) {
		var gira_inves = L.geoJson(geodata, {
		pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, MarkerOptions);
		},
		filter: function(feature, layer) {								
			if(miSelect != "TODOS")		
			return (feature.properties.Provincia == miSelect );
			else
			return true;
		},	
			style: estilo_gira,
		onEachFeature: popup_gira});		
		eitgira.clearLayers();
		eitgira.addLayer(gira_inves);
		
 });
 }

/* Acción Social */
function myFunction2() 
{ 
	var gira_social = $.getJSON("datos/1gira_social.geojson", function(geodata) {
	var gira_social = L.geoJson(geodata, {
		pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, MarkerOptions);
		},
		style: estilo_gira,
		onEachFeature: popup_gira
	}).addTo(map);
});
eitgira.addLayer(gira_social);
}

function estiloSelect2() {
		var miSelect = document.getElementById("estilo2").value;
		$.getJSON("datos/1gira_social.geojson", function(geodata) {
		var gira_social = L.geoJson(geodata, {
		pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, MarkerOptions);
		},
		filter: function(feature, layer) {								
			if(miSelect != "TODOS")		
			return (feature.properties.Provincia == miSelect );
			else
			return true;
		},	
			style: estilo_gira,
		onEachFeature: popup_gira});		
		eitgira.clearLayers();
		eitgira.addLayer(gira_social);
		
 });
 }
 
 $.getJSON('datos/pcd_visitados.geojson', function (geojson) {
	var layer_geojson_distritos = L.choropleth(geojson, {
		valueProperty: 'NUMPOINTS',
		scale: ['white', 'blue',  'red'],
		steps: 10,
		mode: 'q',
		style: {
			color: '#000000',
			weight: 0.3,
			fillOpacity: 0.3
		},
		onEachFeature: function (feature, layer) {
			layer.bindPopup('Distrito: ' + feature.properties.Distrito + '<br>' + 'Visitas: ' + feature.properties.NUMPOINTS)
		}
	}).addTo(map);
	control_layers.addOverlay(layer_geojson_distritos, 'Distritos (visitados)');




var legend = L.control({ position: 'bottomright' })
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = layer_geojson_distritos.options.limits
    var colors = layer_geojson_distritos.options.colors
    var labels = ['Distritos (visitados)']

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  legend.addTo(map)
});



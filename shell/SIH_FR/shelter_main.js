function initMap(){
	var options = {
		zoom: 16,
		center : {lat: 22.798507, lng: 75.8563798}
	}
	var map = new 
	google.maps.Map(document.getElementById('map'),options);

	var marker = new google.maps.Marker({
		position :{lat: 22.798507, lng: 75.8563798},
		map : map
	});
}
function initMap(){
	var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
  	var options = {
    zoom: 11,
    center : {lat: 22.798507, lng: 75.8563798}
  }
  var map = new 
  google.maps.Map(document.getElementById('map'),options);
  
  var markers = [
  {
    coords:{lat : 22.84812355,lng : 75.95492},
    iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content:'Astitva nivas<br>9009988889'
    },
    {
    coords:{lat: 22.798507, lng: 75.8563798}
    },
    {
    coords:{lat:22.73393,lng:75.88672},
    iconImage : 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content:'umeed nivas<br>7708842433'
    },
    {
    coords:{lat:22.79559355,lng:76.26288684},
    iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content:'tarang nivas<br>8802706924'
    },
    {
    coords:{lat:22.80065756,lng:75.50757678},
    iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content:'krishna nivas<br> 8152343421' 
    },
    {
    coords:{lat:22.72911092,lng:75.77124866},
    iconImage :'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content:'roshini nivas<br>7312550823'
    }];
    for(var i = 0;i<markers.length;i++){
      addMarker(markers[i]);
    }

  function addMarker(props){
     var marker = new google.maps.Marker({
        position :props.coords,
        map : map,
        icon:props.iconImage
      });
     if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });
      marker.addListener('click',function(){
        infoWindow.open(map,marker);
      });

     }
  }
  calculateAndDisplayRoute(directionsService, directionsDisplay);
        document.getElementById('mode').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	var markers = [
  {
    coords:{lat : 22.84812355,lng : 75.95492},
    iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content:'Astitva nivas<br>9009988889'
    },
    {
    coords:{lat: 22.798507, lng: 75.8563798}
    },
    {
    coords:{lat:22.73393,lng:75.88672},
    iconImage : 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content:'umeed nivas<br>7708842433'
    },
    {
    coords:{lat:22.79559355,lng:76.26288684},
    iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content:'tarang nivas<br>8802706924'
    },
    {
    coords:{lat:22.80065756,lng:75.50757678},
    iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content:'krishna nivas<br> 8152343421' 
    },
    {
    coords:{lat:22.72911092,lng:75.77124866},
    iconImage :'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content:'roshini nivas<br>7312550823'
    }];
        var selectedMode = document.getElementById('mode').value;
        directionsService.route({
          origin: markers[1].coords,  // Haight.
          destination: markers[3].coords,  // Ocean Beach.
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      } 
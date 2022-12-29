function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 19.3911668, lng: -99.4238175}, 
    zoom: 8 
  })
  var geocoder = new google.maps.Geocoder();
  fetch('/store_directory.json')
    .then(response => response.json()) 
    .then(marcas => {
      marcas.forEach(function(marca) {
        geocoder.geocode({address: marca.Address}, function(results, status) {
          if (status === "OK") {
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            var marker = new google.maps.Marker({
              position: {lat: lat, lng: lng},
              map: map,
              title: marca.Name
            });
          }
        });
      });
    });
}

window.onload = initMap;
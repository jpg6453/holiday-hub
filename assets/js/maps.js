var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = { 'country': 'all' };
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var hostnameRegexp = new RegExp('^https?://.+?/');

var countries = {
    'au': {
        center: { lat: -25.3, lng: 133.8 },
        zoom: 4
    },
    'br': {
        center: { lat: -14.2, lng: -51.9 },
        zoom: 3
    },
    'ca': {
        center: { lat: 62, lng: -110.0 },
        zoom: 3
    },
    'fr': {
        center: { lat: 46.2, lng: 2.2 },
        zoom: 5
    },
    'de': {
        center: { lat: 51.2, lng: 10.4 },
        zoom: 5
    },
    'mx': {
        center: { lat: 23.6, lng: -102.5 },
        zoom: 4
    },
    'nz': {
        center: { lat: -40.9, lng: 174.9 },
        zoom: 5
    },
    'it': {
        center: { lat: 41.9, lng: 12.6 },
        zoom: 5
    },
    'za': {
        center: { lat: -30.6, lng: 22.9 },
        zoom: 5
    },
    'es': {
        center: { lat: 40.5, lng: -3.7 },
        zoom: 5
    },
    'pt': {
        center: { lat: 39.4, lng: -8.2 },
        zoom: 6
    },
    'us': {
        center: { lat: 37.1, lng: -95.7 },
        zoom: 3
    },
    'uk': {
        center: { lat: 54.8, lng: -4.6 },
        zoom: 5
    }
};

//Function to render google map

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: countries['us'].zoom,
          center: countries['us'].center,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          streetViewControl: false
        });

        infoWindow = new google.maps.InfoWindow({
          content: document.getElementById('info-content')
        });

        // Creates autocomplete object and associates it with the Search box controls
        // Restricts the search to the selected country and to place type "cities".

        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (
                document.getElementById('autocomplete')), {
              types: ['(cities)'],
              componentRestrictions: countryRestrict
            });
        places = new google.maps.places.PlacesService(map);

        autocomplete.addListener('place_changed', onPlaceChanged);

        // DOM event listener to react when the user selects a country.
        document.getElementById('country').addEventListener(
            'change', setAutocompleteCountry);
      }

      // When the user selects a city, get the place details for the city and
      // zoom the map in on the city.
      function onPlaceChanged() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
          map.panTo(place.geometry.location);
          map.setZoom(15);
          search();
        } else {
          document.getElementById('autocomplete').placeholder = 'Enter a city';
        }
      }
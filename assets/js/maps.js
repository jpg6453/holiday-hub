var map, places, infoWindow;
var markers = [];
var autocomplete;
var countryRestrict = { 'country': 'uk' };
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
    },
    'hr': {
        center: { lat: 45.56, lng: 17},
        zoom: 8
    },
    'ie': {
        center: { lat: 52.86, lng: -7.97 },
        zoom: 6
    },
    'ng': {
        center: { lat:9.6 , lng: 7.99 },
        zoom: 5.8
    },
    'in': {
        center: { lat: 22.35, lng: 78.66 },
        zoom: 4
    }
};

//Function to render google map

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: countries['uk'].zoom,
          center: countries['uk'].center,
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

       // Set the country restriction based on user input.
      // Also center and zoom the map on the given country.
      function setAutocompleteCountry() {
        var country = document.getElementById('country').value;
        if (country == 'all') {
          autocomplete.setComponentRestrictions({'country': []});
          map.setCenter({lat: 15, lng: 0});
          map.setZoom(2);
        } else {
          autocomplete.setComponentRestrictions({'country': country});
          map.setCenter(countries[country].center);
          map.setZoom(countries[country].zoom);
          document.getElementById('autocomplete').value = '';
        }
        clearResults();
        clearMarkers();
        clearPanel();
        clearTotal();
        
      }

      // When the user selects a city, get the place details for the city and
      // zoom the map in on the city.
      function onPlaceChanged() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
          map.panTo(place.geometry.location);
          map.setZoom(15);
          clearResults();
          clearMarkers();
          clearTotal();
          showIcons();
        
        // Resize map to full width on lg screens and scroll to top of window.
        document.getElementById('map').className = 'col-lg-12 gmap';
        document.getElementById('map').scrollIntoView();

        //Open sliding panel
        document.getElementById('panel').classList.add('d-md-block');
        document.getElementById('panel').style.width = '100%';
        //<img class="card-img-top panel-img-top" src="${place.photos[0].getUrl()}" alt="${place.name}">
        let panel = `   
		<img class="card-img-top panel-img-top" src="" alt="${place.name}">
        <div class="card-body flex-column panel-card-body">
            <h4 class="panel-place-name">${place.name}</h4> 
        </div>
        
        `;

        document.getElementById('panel').innerHTML = panel;

        } else {
          document.getElementById('autocomplete').placeholder = 'Enter a city';
        }
      }

        // Perform a search for specified place types
        // Event listeners for place icons

        document.getElementById('hotel').addEventListener('click', function(){placeSearch('lodging');});
        document.getElementById('restaurant').addEventListener('click', function(){placeSearch('restaurant');});
        document.getElementById('glass').addEventListener('click', function(){placeSearch('bar');});
        document.getElementById('coffee').addEventListener('click', function(){placeSearch('cafe');});
        document.getElementById('info').addEventListener('click', function(){placeSearch('tourist_attraction');});
        
        // Perform nearby search after city has been selected & a place icon is clicked

        function placeSearch(type){
            let search = {
            bounds: map.getBounds(),
            types: [type]  
    };

        places.nearbySearch(search, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            firstCard();
            changeCity();

            // Iterate through serch results and add google default red marker
            // Add a number label to each marker

            for (var i = 0; i < results.length; i++) {
              
              // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                label:[i+1].toString()
              });
              // If the user clicks a hotel marker, show the details of that hotel
              // in an info window.
              markers[i].placeResult = results[i];
              google.maps.event.addListener(markers[i], 'click', showInfoWindow);
              setTimeout(dropMarker(i), i * 100);
              addResult(results[i], i);

              //Display a search results total, along with  place type
              
              let total = `
                <h5 class="total">${results.length} ${search.types} found</h5>
            `;

            let res = total;
            let text = res
                    .replace("lodging","Hotels")
                    .replace("restaurant","Restaurants")
                    .replace("bar","Bars")
                    .replace("cafe","Cafes")
                    .replace("tourist_attraction","Attractions");

            total = text;
            document.getElementById('result-total').innerHTML = total;
            }
          }
        });
      }

    // After city selected by user, reveal icons and hide binocular logo

      function showIcons(){
            document.getElementById('binocular-logo').style.display = 'none';
            document.getElementById('icons').classList.remove('d-none'); 
      }

      function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          if (markers[i]) {
            markers[i].setMap(null);
          }
        }
        markers = [];
      }

      function dropMarker(i) {
        return function() {
          markers[i].setMap(map);
        };
      }

      //Populates results table with search results
      //${photo && photo.length ? photo[0].getUrl() : defaultPhoto}
    function addResult(result, i) {
        let noRating = 'No ratings yet';
        let rating = result.rating;
        let photo = result.photos;
        let defaultPhoto = "assets/img/placeholder.jpg";
        let resultCard = `
        <div class="card result-card">
			<img class="card-img-top flex-row result-img" src="${defaultPhoto}" alt="${result.name}">
            <div class="card-body result-card-body d-flex flex-column">
                <span class="result-number">${i+1}</span>
                <h5 class="result-name horizontal">${result.name}</h5>
                <span class="result-rating mb-1">${rating ? rating + ' &#11088' : noRating} </span>
                <span class="d-none d-md-block result-address horizontal mb-1">${result.vicinity}</span>
            </div>  
		</div>
        `;
            document.getElementById('results').innerHTML += resultCard;
            cardClickListener();
    }

    //Scrolls result cards horizontally to left side of screen to display 1st result
    //When another place icon is clicked
    
    function firstCard() {
        let resultCards = document.getElementById('results');
        resultCards.scrollTo(0,0);
    }


    function cardClickListener() {
            let cards = document.querySelectorAll('.result-card');
            cards.forEach(function (elem, i) {
            elem.addEventListener('click', function () {
            new google.maps.event.trigger(markers[i], 'click')
    })
  })
}
       
      function clearResults() {
        var results = document.getElementById('results');
        while (results.childNodes[0]) {
          results.removeChild(results.childNodes[0]);
        }
      }

      //Clear city panel when user changes country

      function clearPanel() {
        const panel = document.getElementById('panel');
        while (panel.childNodes[0]) {
          panel.removeChild(panel.childNodes[0]);
        panel.style.width = "0";
        }
      }


      function clearTotal() {
        const total = document.getElementById('result-total');
        while (total.childNodes[0]) {
          total.removeChild(total.childNodes[0]);
        }
      }

      //Reveal New City button
      function changeCity() {
          let newCity = document.getElementById('new-city');
          newCity.style.visibility = 'visible';
      }

      //Event listener for New City button
      document.getElementById('new-city').addEventListener('click',scrollToSearch);

      //Call clear functions, hide place icons and scroll search bar into view
      function scrollToSearch(){
        clearResults();
        clearMarkers();
        clearPanel();
        clearTotal();
        document.getElementById('search').scrollIntoView();
        document.getElementById('autocomplete').value = '';
        document.getElementById('icons').classList.add('d-none');
      }

      // Get the place details for a hotel. Show the information in an info window,
      // anchored on the marker for the hotel that the user selected.
      function showInfoWindow() {
        var marker = this;
        places.getDetails({placeId: marker.placeResult.place_id},
            function(place, status) {
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
              }
              infoWindow.open(map, marker);
              buildIWContent(place);
            });
      }

      // Load the place information into the HTML elements used by the info window.
      function buildIWContent(place) {
        
        let infoContent =`
        <table>
			<tr id="iw-url-row" class="iw_table_row">
				<td id="iw-icon" class="iw_table_icon"><img class="iw-placeicon" src="${place.icon}"></td>
				<td id="iw-name">${place.name}</td>
			</tr>
			<tr id="iw-address-row" class="iw_table_row">
				<td class="iw_attribute_name">Address:</td>
				<td id="iw-address">${place.vicinity}</td>
			</tr>
			<tr id="iw-phone-row" class="iw_table_row">
				<td class="iw_attribute_name">Telephone:</td>
				<td id="iw-phone"></td>
			</tr>
			<tr id="iw-rating-row" class="iw_table_row">
				<td class="iw_attribute_name">Rating:</td>
				<td id="iw-rating"></td>
			</tr>
			<tr id="iw-website-row" class="iw_table_row">
				<td class="iw_attribute_name">Website:</td>
				<td id="iw-website"></td>
			</tr>
        </table>
        
        `;

        document.getElementById('info-content').innerHTML = infoContent;

        if (place.formatted_phone_number) {
          document.getElementById('iw-phone-row').style.display = '';
          document.getElementById('iw-phone').textContent =
            place.formatted_phone_number;
        } else {
          document.getElementById('iw-phone-row').style.display = 'none';
        }

        // Assign a five-star rating to the hotel, using a black star ('&#10029;')
        // to indicate the rating the hotel has earned, and a white star ('&#10025;')
        // for the rating points not achieved.
        if (place.rating) {
          var ratingHtml = '';
          for (var i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
              ratingHtml += '&#10025;';
            } else {
              ratingHtml += '&#10029;';
            }
          document.getElementById('iw-rating-row').style.display = '';
          document.getElementById('iw-rating').innerHTML = ratingHtml;
          }
        } else {
          document.getElementById('iw-rating-row').style.display = 'none';
        }

        // The regexp isolates the first part of the URL (domain plus subdomain)
        // to give a short URL for displaying in the info window.
        if (place.website) {
          var fullUrl = place.website;
          var website = hostnameRegexp.exec(place.website);
          if (website === null) {
            website = 'http://' + place.website + '/';
            fullUrl = website;
          }
          document.getElementById('iw-website-row').style.display = '';
          document.getElementById('iw-website').textContent = website;
        } else {
          document.getElementById('iw-website-row').style.display = 'none';
        }
    }
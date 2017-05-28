/**
 * Code for a neighborhood map that shows some important places near my neighboorhood (Arima - Kawasaki - Kanagawa - Japan).
 * You can sort by name of place with the searchbar on the left top.
 * Also, choose from the list of places on the right top.
 * Of course you can click the marker itself to open infoWindow.
 * Made by Tetsuya Hasegwa in 2017 Feb.
 */
/** JSON of important places in my neighborhood. This is the MODEL of the app. */
var initialLocations = [{
		title: 'Arima Hospital',
		address: "3 Chome-10-7 Arima, Miyamae-ku, Kawasaki-shi",
		call: "044-866-3315",
		latLng: {
			lat: 35.576198,
			lng: 139.584375
		},
		wiki: "日本の医療"
	},
	{
		title: "McDonald's 246 Saginuma",
		address: "3 Chome-1-10 Arima, Miyamae-ku, Kawasaki-shi",
		call: "044-854-0531",
		latLng: {
			lat: 35.577193,
			lng: 139.583746
		},
		wiki: "マクドナルド"
	},
	{
		title: 'Muten Kura Sushi Kawasaki Arima',
		address: "2 Chome-1-5 Arima, Miyamae-ku, Kawasaki-shi",
		call: "044-870-8610",
		latLng: {
			lat: 35.579688,
			lng: 139.582583
		},
		wiki: "くらコーポレーション"
	},
	{
		title: 'Marukame Seimen Kawasaki Arima',
		address: "1899-35 Maginu, Miyamae-ku, Kawasaki-shi",
		call: "044-862-0566",
		latLng: {
			lat: 35.579968,
			lng: 139.583767
		},
		wiki: "丸亀製麺"
	},
	{
		title: 'Miyazaki Elementary School',
		address: "Kawasaki-shi, Miyamae-ku, Maginu, 1795",
		call: "044-866-2218",
		latLng: {
			lat: 35.579706,
			lng: 139.587490
		},
		wiki: "川崎市立宮崎小学校"
	}
];

/** This function is a callback from the Google Maps API that initializes the map
 *  Google map's base map is displayed.
 */
function initMap() {
	/** Initialize the base map */
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 35.578203,
			lng: 139.585194
		},
		zoom: 16
	});

	/** Centers the map whenever it is resized. */
	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
	});

	/** Bind to koViewModel */
	ko.applyBindings(new koViewModel(map));
}



/**
 * This is the ViewModel.
 * The aim is to lively change the markers and list.
 */
var koViewModel = function(map) {
	/** Store 'this' to variable 'self' so that it could be easily accessed from anywhere */
	var self = this;

	/** An observableArray so as to lively handle list and markers. */
	this.locationList = ko.observableArray([]);

	function Location(data) {
		this.title = ko.observable(data.title);
		this.marker = data.marker;
	}

	var largeInfowindow = new google.maps.InfoWindow();

	/** Add markers and locations to the observableArray from 'initialLocations' */
	initialLocations.forEach(function(locationItem) {
		var markerOptions = {
			map: map,
			position: locationItem.latLng,
			title: locationItem.title,
			address: locationItem.address,
			call: locationItem.call,
			wiki: locationItem.wiki,
			animation: google.maps.Animation.DROP,
		};
		var marker = new google.maps.Marker(markerOptions);
		locationItem.marker = marker;
		self.locationList.push(new Location(locationItem));

		/** Create an onclick event to open an infowindow at each marker.
		 * Set a bounce animation to each marker when clicked.
		 * Load Wiki API asyncronously.
		 * Center the map to the marker.
		 * Many of These functions are externalized below.
		 */
		marker.addListener('click', function() {
			populateInfoWindow(this, largeInfowindow);
			toggleBounce(this);
			loadData(this, largeInfowindow);
			map.setCenter(this.position);
		});

	});

	/** This function populates the infowindow when clicked. */
	function populateInfoWindow(marker, infowindow) {
    var $wikiElem = $('#wikipedia-links');
		var wikiRequestTimeout = setTimeout(function() {
			alert("failed to get wikipedia resources")
		}, 8000);

		var wikiUrl = "https://ja.wikipedia.org/w/api.php?action=opensearch&search=" + 　marker.wiki + "&format=json&callback=wikiCallback";

		/** Check to make sure the infowindow is not already opened on this marker. */
		if (infowindow.marker != marker) {
			infowindow.marker = marker;
      $.ajax({
  			url: wikiUrl,
  			dataType: "jsonp",
  			// jsonp: "callback",
  			success: function(response) {
  				var articleList = response[1];
          articleStr = articleList[0];
          var url = "http://ja.wikipedia.org/wiki/" + articleStr;
          infowindow.setContent('<p class= "bold-title">' + marker.title + "</p>" + "<p>" + marker.address + "</p>" + "<p>" + marker.call + "</p>" + "<ul id='wikipedia-links'><li><a href=" + url + ">" + articleStr + "</a></li></ul>")
  				clearTimeout(wikiRequestTimeout);
  			}
  		});
			infowindow.open(map, marker);
			/** Make sure the marker property is cleared if the infowindow is closed. */
			infowindow.addListener('closeclick', function() {
				infowindow.marker = null;
			});
		}
	}

	/** This function bounces the marker when clicked. It is also set so that the bouncing will stop. */
	function toggleBounce(marker) {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
			marker.setAnimation(null);
		}, 700);
	}

	/** This asyncronously loads wikipedia articles. If the request fails, it loads fail message. */
	function loadData(marker, infowindow) {

	}


	/** An observable which stores the currently chosen location */
	this.currentLocation = ko.observable();

	/** This is linked to the li items and when triggered, updates the 'currentLocation'
	 *  Then, it gets the identical marker and triggers the infowindow
	 */
	this.setLocation = function(clickedLocation) {
		self.currentLocation(clickedLocation);
		google.maps.event.trigger(clickedLocation.marker, 'click');
	};

	/** An observable which stores the search bar value. */
	this.query = ko.observable('');

	/** This function lively searches the marker and locations based on the imput of search bar.
	 *  First all markers and list is removed or set unvisible.
	 *  Then, identical markers and locations are added or shown.
	 */
	this.search = function(value) {
		self.locationList.removeAll();
		initialLocations.forEach(function(locationItem) {
			locationItem.marker.setVisible(false);
			if (locationItem.title.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
				locationItem.marker.setVisible(true);
				self.locationList.push(new Location(locationItem));
			}
		});
	};

	/** Connect query and search */
	this.query.subscribe(this.search);
};

/** This function triggers when google map api fails to load. */
function googleError() {
	alert('Sorry, Goolge Map API loading seemed to have failed.');
}

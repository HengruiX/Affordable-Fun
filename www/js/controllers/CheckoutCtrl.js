angular.module('app.controllers')

.controller('CheckoutCtrl', function($scope, $state, $stateParams) {

	$scope.$on('$ionicView.enter', function(){
		var event = $stateParams.event;
		var food = $stateParams.food;
		var object = $scope;
		var lat = $stateParams.lat;
		var lng = $stateParams.lng;
		object.url = event.eventDetailsLink;

		var directionsService1 = new google.maps.DirectionsService();
		var directionsDisplay1 = new google.maps.DirectionsRenderer();
		var directionsService2 = new google.maps.DirectionsService();
		var directionsDisplay2 = new google.maps.DirectionsRenderer();
		var directionsService3 = new google.maps.DirectionsService();
		var directionsDisplay3 = new google.maps.DirectionsRenderer();
		var start = new google.maps.LatLng(lat, lng);
		var mapOptions1 = {
			zoom:7,
			center: start
		}
		var mapOptions2 = {
			zoom:7,
			center: mid1
		}
		var mapOptions3 = {
			zoom:7,
			center: end
		}
		var map1 = new google.maps.Map(document.getElementById('map1'), mapOptions1);
			directionsDisplay1.setMap(map1);
			var map2 = new google.maps.Map(document.getElementById('map2'), mapOptions2);
			directionsDisplay2.setMap(map2);
			var map3 = new google.maps.Map(document.getElementById('map3'), mapOptions3);
			directionsDisplay3.setMap(map3);

			var mid1 = new google.maps.LatLng(event.venue.venueLatitude, event.venue.venueLongitude);
			var mid2 = new google.maps.LatLng(food.location.coordinate.latitude, food.location.coordinate.longitude);
			var end = new google.maps.LatLng(lat, lng);
			var request1 = {
				origin : start,
				destination: mid1,
				travelMode: 'TRANSIT'
			}
			var request2 = {
				origin : mid1,
				destination: mid2,
				travelMode: 'WALKING'
			}
			var request3 = {
				origin : mid2,
				destination: end,
				travelMode: 'TRANSIT'
			}
			directionsService1.route(request1, function(response, status){
				if (status === 'OK') {
					directionsDisplay1.setDirections(response);
					object.$apply();
					directionsService2.route(request2, function(response, status){
						if (status === 'OK') {
							directionsDisplay2.setDirections(response);
							object.$apply();
							directionsService3.route(request3, function(response, status){
								if (status === 'OK') {
									directionsDisplay3.setDirections(response);
									object.$apply();

								} else {
									window.alert('Directions request failed due to ' + status);
								}
							});
						} else {
							window.alert('Directions request failed due to ' + status);
						}
					});
				} else {
					window.alert('Directions request failed due to ' + status);
				}
			});
		});

	});
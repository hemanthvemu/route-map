// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var example = angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

 example.controller('MapController', function($scope, $ionicLoading, $compile) {
      function initialize() {
        var t2t = new google.maps.LatLng(17.433041, 78.412174);
       
        var mapOptions = {
          streetViewControl:true,
          center: t2t,
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.STREET
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: t2t,
          map: map,
          title: ''
        });
        
      
        
        var infowindow = new google.maps.InfoWindow({
             content:"Time 2 Tiffin"
        });

        infowindow.open(map,marker);
        
    
       
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
        
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

	var point1 = new google.maps.LatLng(17.435953, 78.411684);
	var point2 = new google.maps.LatLng(17.439518, 78.397357);
	var point3 = new google.maps.LatLng(17.444595, 78.386362);

	var wps = [{ location: point1 }, { location: point2 }, {location: point3}];
	//var wps = [{lat:'17.435953', lng:'78.411684'}, { lat:'17.439518', lng:'78.397357' }, {lat:'17.444595', lng:'78.386362'}];

	var org = new google.maps.LatLng ( 17.433041, 78.412174);
	var dest = new google.maps.LatLng (17.433041, 78.412174);

	var request = {
			origin: org,
			destination: dest,
			waypoints: wps,
			optimizeWaypoints:true,
			travelMode: google.maps.DirectionsTravelMode.DRIVING,
			//provideTripAlternatives: true
			//alternatives:true
			};


              directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

        directionsDisplay.setMap(map); 
       
      }
  
      google.maps.event.addDomListener(window, 'load', initialize);
    
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });
        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
      
    });


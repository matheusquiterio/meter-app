// SPDX-License-Identifier: Apache-2.0

'use strict';

var app = angular.module('application', []);

// Angular Controller
app.controller('appController', function($scope, appFactory){

	$("#success_holder").hide();
	$("#success_create").hide();
	$("#success_measures").hide();
	$("#error_holder").hide();
	$("#error_query").hide();
	$("#error_measures").hide();
		
	$scope.queryAllHouses = function(){

		appFactory.queryAllHouses(function(data){
			var array = [];
			for (var i = 0; i < data.length; i++){
				parseInt(data[i].Key);
				data[i].Record.Key = parseInt(data[i].Key);
				array.push(data[i].Record);
			}
			array.sort(function(a, b) {
			    return parseFloat(a.Key) - parseFloat(b.Key);
			});
			$scope.all_houses = array;
		});
	}

	$scope.queryHouse = function(){

		var id = $scope.house_id;

		appFactory.queryHouse(id, function(data){
			$scope.query_house = data;

			if ($scope.query_house == "Could not locate house"){
				console.log()
				$("#error_query").show();
			} else{
				$("#error_query").hide();
			}
		});
	}

	$scope.createHouse = function(){

		appFactory.createHouse($scope.house, function(data){
			$scope.create_house = data;
			$("#success_create").show();
		});
	}

	$scope.changeOwner = function(){

		appFactory.changeOwner($scope.ownerID, function(data){
			$scope.change_owner = data;
			if ($scope.change_owner == "Error: no house found"){
				$("#error_holder").show();
				$("#success_holder").hide();
			} else{
				$("#success_holder").show();
				$("#error_holder").hide();
			}
		});
	}

	$scope.updateMeasures = function(){

		appFactory.updateMeasures($scope.measures, function(data){
			$scope.update_measures = data;
			if ($scope.update_measures == "Error: no house found"){
				$("#error_measures").show();
				$("#success_measures").hide();
			} else{
				$("#success_measures").show();
				$("#error_measures").hide();
			}
		});
	}

});

// Angular Factory
app.factory('appFactory', function($http){
	
	var factory = {};

    factory.queryAllHouses = function(callback){

    	$http.get('/get_all_houses/').success(function(output){
			callback(output)
		});
	}

	factory.queryHouse = function(id, callback){
    	$http.get('/get_house/'+id).success(function(output){
			callback(output)
		});
	}

	factory.createHouse = function(data, callback){

		var house = data.id + "-" + data.solar + "-" + data.newEnergy + "-" + data.ownerID + "-" + data.prevEnergy;

    	$http.get('/add_house/'+house).success(function(output){
			callback(output)
		});
	}

	factory.changeOwner = function(data, callback){

		var ownerID = data.id + "-" + data.name;
		//var ownerID = data.id;

    	$http.get('/change_owner/'+ownerID).success(function(output){
			callback(output)
		});
	}

	factory.updateMeasures = function(data, callback){

		var measures = data.id + "-" + data.newEnergy + "-" + data.solar;
		
    	$http.get('/update_measures/'+measures).success(function(output){
			callback(output)
		});
	}

	return factory;
});



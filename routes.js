//SPDX-License-Identifier: Apache-2.0

var house = require('./controller.js');

module.exports = function(app){

  app.get('/get_house/:id', function(req, res){
    house.get_house(req, res);
  });
  app.get('/add_house/:house', function(req, res){
    house.add_house(req, res);
  });
  app.get('/get_all_houses', function(req, res){
    house.get_all_houses(req, res);
  });
  app.get('/change_owner/:ownerID', function(req, res){
    house.change_owner(req, res);
  });
}

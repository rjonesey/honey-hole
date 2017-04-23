import express from 'express';
import Location from '../models/location';

const locationRoutes = express.Router();

locationRoutes.post('/locations',function(req, res, next){
  let location = new Location();
  location.date = req.body.date;
  location.title = req.body.title;
  location.coordinates = req.body.coordinates;
  location.weather = req.body.weather;
  location.owner = req.body.owner;
  location.save(function(err, location){
    if(err){
      next(err);
    } else {
      res.json(location);
    }
  });
});

locationRoutes.get('/locations/:owner_id', function(req, res, next){
  Location.find({owner: req.params.owner_id}).populate('owner').exec(function(err, locations){
    if(err){
      next(err);
    } else {
      res.json(locations);
    }
  });
});

locationRoutes.put('/locations/:location_id', function(req, res, next){
  Location.findById({_id: req.params.location_id}, function(err, location){
    if(err){
      next(err);
    } else {
      location.title = req.body.title;
      location.notes = req.body.notes;
      location.save(function(err, location){
        if(err){
          next(err);
        } else {
          res.json(location);
        }
      });
    }
  });
});

locationRoutes.delete('/locations/:location_id', function(req, res, next){
  location.remove({_id: req.params.location_id}, function(err, location){
    if(err){
      next(err);
    } else {
      res.json({title: 'Location was successfully deleted!'});
    }
  });
});

export default locationRoutes;

var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

//register users
router.route('/v1/users')
.post(userController.postUsers);

router.route('/v1/login')
.post(userController.login);

//verification for signup
router.route('/v1/verify/:code')
.put(userController.verification)

//edit user details
router.route('/v1/editUser')
.put(userController.editUser);

//get Users
router.route('/v1/getUsers')
.get(userController.getUsers);

router.route('/v1/deleteUser/:_id')
.delete(userController.deleteUser);

router.route('/v1/postSeries')
.post(userController.postSeries);

router.route('/v1/getSeries')
.get(userController.getSeries);

router.route('/v1/editSeries')
.put(userController.editSeries);

router.route('/v1/deleteSeries/:_id')
.delete(userController.deleteSeries);

router.route('/v1/searchSeries/:name')
.get(userController.searchSeries);

router.route('/v1/postSeason')
.post(userController.postSeason);

//get seasons for particular series
router.route('/v1/getSeasons/:_id')
.get(userController.getSeasons);

//search season
router.route('/v1/searchSeason/:name')
.get(userController.searchSeason);

//edit  a season
router.route('/v1/editSeason')
.put(userController.editSeason);

router.route('/v1/deleteSeason/:_id')
.delete(userController.deleteSeason);

//delete season for deleted series
router.route('/v1/deleteSeriesSeason/:_id')
.delete(userController.deleteSeriesSeason);

router.route('/v1/postEpisode')
.post(userController.postEpisode);

//get episodes of particular season
router.route('/v1/getEpisodes/:_id')
.get(userController.getEpisodes);

//search  a episode
router.route('/v1/searchEpisode/:name')
.get(userController.searchEpisode);

router.route('/v1/editEpisode')
.put(userController.editEpisode);

router.route('/v1/deleteEpisode/:_id')
.delete(userController.deleteEpisode);

//delete episode for deleted series
router.route('/v1/deleteSeriesEpisode/:_id')
.delete(userController.deleteSeriesEpisode);


//add comment on episode
router.route('/v1/addComment')
.post(userController.addComment);

//get Comments on episodes
router.route('/v1/getComments/:_id')
.get(userController.getComments);

//add category
router.route('/v1/addCategory')
.post(userController.addCategory);

//get categories
router.route('/v1/getCategories')
.get(userController.getCategories);

//add movie
router.route('/v1/addMovie')
.post(userController.addMovie);

//get movies
router.route('/v1/getMovies')
.get(userController.getMovies);

//search movies
router.route('/v1/searchMovies/:name')
.get(userController.searchMovies);

//delete a movie
router.route('/v1/deleteMovie/:_id')
.delete(userController.deleteMovie);

//search by category
router.route('/v1/searchCategory/:name')
.get(userController.searchCategory);

module.exports = router;
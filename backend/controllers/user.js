var User = require('../models/user');
var Series = require('../models/series');
var Season = require('../models/season');
var Episode = require('../models/episode');
var Movie = require('../models/Movie');
var Comment = require('../models/Comments');
var Category = require('../models/Category');
var Promise = require("bluebird");
var btoa = require('btoa');
var atob = require('atob');
var jwt = require('jsonwebtoken');
//const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true, 
//   auth: {
//     user: 'nktsngh221@gmail.com',
//     pass: '7895741745'
//   }
// });

//register users
exports.postUsers = function (req, res) {
  
    var user = new User({
        password: btoa(req.body.password),
        email: req.body.email,
        name: req.body.name,
      //  code: req.body.code,
        phoneNumber: req.body.phoneNumber,
        userType: req.body.userType
    });

    // console.log(user,"heyy")
    //   let mailOptions = {
    //     from: ' <nktsngh221@gmail.com>',
    //     to: req.body.email,
    //     subject: 'Code verification',
    //     text: 'Congratulations on your registration',
    //     html: '<b>Welcome! Enter this code to verify your account!  :</b>' + req.body.code
    //   };

    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log('Message %s sent: %s', info.messageId, info.response);
    //   });

    User.findOne({ email: user.email }, function (request, response) {
        if (response) {
            res.json({
                data: "exist"
            })
        }
        else {
            user.save(function (err, response) {
                if (err) {
                    res.json(err);
                }
                if(res){
                    res.json({
                        success: true,
                        body: response
                    })
                }else{
                    res.json({
                        success: false,
                        body: response
                    })
                }
            });
        }
    })
};

//login
exports.login = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ email: email, password: btoa(password) }, function (err, user) {

        if (err) {
            res.json("server failure", err)
        }
        if (user) {
            var token = jwt.sign({
                "status": "true",
                "userId": user._id
            }, 'kellton')
            res.json({
                "status": true,
                "respdata": {
                    "data": user,
                    "token": token
                }
            })
        }
        else {
            res.json({
                "status": user
            })
        }
    })
}

//User code Verification
exports.verification = function (req, res) {
    var code = req.params.code;
    User.findOne({ code: code }, function (err, user) {
        if (!user) {
            res.json({
                data: "code did not match"
            });
        }
        else {
            user.save(function (err, response) {
                if (err) {
                    res.json({
                        data: err
                    });
                }
                else {
                    res.json({
                        data: response
                    });
                }
            })
        }
    })
}

//edit user details
exports.editUser = function (req, res) {
    var email = req.body.email;
    User.findOne({ email: email }, function (err, user) {
        if (err) {
            res.json(err);
        }

        var password = btoa(req.body.password);
        var email = req.body.email;
        var name = req.body.name;
        var phoneNumber = req.body.phoneNumber;
        //var created_at = req.body.created_at;

        user.name = name;
        user.password = password;
        user.phoneNumber = phoneNumber;
        user.email = email;
        //user.created_at = created_at;
        user.updated_at = new Date();

        user.save(function (err, response) {
            if (err) {
                res.json({
                    status: false,
                    respData: {
                        data: err
                    }
                });
            }
            else {
                res.json({
                    status: true,
                    respData: {
                        data: response
                    }
                });
            }
        })
    })
};

//get all users
exports.getUsers = function (req, res) {
    User.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }
        res.json(response);
    })
}

//delete user
exports.deleteUser = function (req, res) {
    var _id = req.params._id;
    User.findOne({ _id: _id }, function (err, response) {
        if (err) {
            res.json("cannot find user")
        }

        if (response) {
            User.remove({ _id: _id }, function (err1, response1) {
                if (err1) {
                    res.json(err1);
                }
                res.json(response1);
            })
        }
        else {
            res.json("cannot remove");
        }



    })
}


//get all products
exports.getProducts = function (req, res) {
    Product.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
}

//post category
exports.addCategory = function (req, res) {

    var category = new Category({
        name: req.body.name,
        created_at: new Date(),
        updated_at: new Date()
    });
    Category.findOne({ name: category.name }, function (request, response) {
        if (response) {
            res.json({
                data: "exist"
            })
        }
        else {
            category.save(function (err, response) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json({
                        success: true,
                        body: response
                    })
                }
            });
        }
    })
};

//get all categories
exports.getCategories = function (req, res) {
    Category.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }
        res.json(response);
    })
}

//post series
exports.postSeries = function (req, res) {
    var series = new Series({
        name: req.body.name,
        description: req.body.description,
        createdby: req.body.createdby,
        created_at: new Date(),
        updated_at: new Date(),
        type: req.body.type
    })

    Series.findOne({ name: series.name }, function (request, response) {
        if (response) {
            res.json({
                data: "exist"
            })
        }
        else {
            series.save(function (err, response) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json({
                        success: true,
                        body: response
                    })
                }
            });
        }
    });
}

//get series
exports.getSeries = function (req, res) {
    Series.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }
        res.json(response);
    })
};

//edit series
exports.editSeries = function (req, res) {
    var name = req.body.name;
    Series.findOne({ name: name }, function (err, series) {
        if (err) {
            res.json(err);
        }

        var createdby = req.body.createdby;
        var description = req.body.description;
        var name = req.body.name;

        series.name = name;
        series.description = description;
        series.createdby = createdby;
        series.updatedate = new Date();

        series.save(function (err, response) {
            if (err) {
                res.json({
                    status: false,
                    respData: {
                        data: err
                    }
                });
            }
            else {
                res.json({
                    status: true,
                    respData: {
                        data: response
                    }
                });
            }
        })
    })
};

//delete series
exports.deleteSeries = function (req, res) {
    var _id = req.params._id;
    Series.findOne({ _id: _id }, function (err, response) {
        if (err) {
            res.json("cannot find item")
        }
        if (response) {
            Series.remove({ _id: _id }, function (err1, response1) {
                if (err1) {
                    res.json(err1);
                }
                res.json(response1);
            })
        }
        else {
            res.json("cannot find");
        }
    })
}

//search series
exports.searchSeries = function (req, res) {
    var name = RegExp(req.params.name);
    Series.find({ name: name }, function (err, response) {
        if (err) {
            res.json({
                status: false,
                data: err
            })
        }
        if (response) {
            return res.json({
                status: true,
                data: response
            });
        }
        else {
            return res.json({
                status: false,
                data: "no match"
            });
        }
    })
}

//add season
exports.postSeason = function (req, res) {
    var season = new Season({
        series_id: req.body.seriesid,
        name: req.body.name,
        description: req.body.description,
        startson: req.body.startson,
        endson: req.body.endson,
        createddate: new Date(),
        updateddate: new Date()
    });

    Season.findOne({ name: season.name }, function (request, response) {
        if (response) {
            res.json({
                data: "exist"
            })
        }
        else {
            season.save(function (err, response) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json({
                        success: true,
                        body: response
                    })
                }
            });
        }
    });
}

//get season for particular series
exports.getSeasons = function (req, res) {
    var id = req.params._id;
    Season.find({ series_id: id }, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }
        console.log("season", response)
        res.json(response);
    })
};

//search a season
exports.searchSeason = function (req, res) {
    var name = RegExp(req.params.name);
    Season.find({ name: name }, function (err, response) {
        if (err) {
            res.json({
                status: false,
                data: err
            })
        }
        if (response) {
            return res.json({
                status: true,
                data: response
            });
        }
        else {
            return res.json({
                status: true,
                data: "no match"
            });
        }
    })
}

//edit season
exports.editSeason = function (req, res) {
    var name = req.body.name;
    Season.findOne({ name: name }, function (err, season) {
        if (err) {
            res.json(err);
        }

        var name = req.body.name;
        var description = req.body.description;
        var startson = req.body.startson;
        var endson = req.body.endson;

        season.name = name;
        season.description = description;
        season.startson = startson;
        season.endson = endson;
        season.updateddate = new Date();

        season.save(function (err, response) {
            if (err) {
                res.json({
                    status: false,
                    respData: {
                        data: err
                    }
                });
            }
            else {
                res.json({
                    status: true,
                    respData: {
                        data: response
                    }
                });
            }
        })
    })
};

//delete season
exports.deleteSeason = function (req, res) {
    var _id = req.params._id;
    Season.findOne({ _id: _id }, function (err, response) {
        if (err) {
            res.json("cannot find item")
        }

        if (response) {
            Season.remove({ _id: _id }, function (err1, response1) {
                if (err1) {
                    res.json(err1);
                }
                res.json(response1);
            })
        }
        else {
            res.json("cannot find ");
        }
    })
}

//delete season for deleted series
exports.deleteSeriesSeason = function (req, res) {
    var _id = req.params._id;
    Season.find({ seriesid: _id }, function (err, response) {
        if (err) {
            res.json("cannot find item")
        }

        if (response) {
            Season.remove({ series_id: _id }, function (err1, response1) {
                if (err1) {
                    res.json(err1);
                }
                console.log(response1)
                res.json(response1);
            })
        }
        else {
            res.json("cannot find ");
        }
    })
}

//add episode
exports.postEpisode = function (req, res) {
    var episode = new Episode({
        series_id: req.body.seriesid,
        season_id: req.body.seasonid,
        name: req.body.name,
        image: req.body.image,
        story: req.body.story,
        createddate: new Date(),
        updateddate: new Date()
    });

    Episode.findOne({ name: episode.name }, function (request, response) {
        if (response) {
            res.json({
                data: "exist"
            })
        }
        else {
            episode.save(function (err, response) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json({
                        success: true,
                        body: response
                    })
                }
            });
        }
    });
}

//get episodes for a particular series
exports.getEpisodes = function (req, res) {
    var id = req.params._id;
    Episode.find({ season_id: id }, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }
        console.log("episodes", response)
        res.json(response);
    })
};

//search episode
exports.searchEpisode = function (req, res) {
    var name = RegExp(req.params.name);
    Episode.find({ name: name }, function (err, response) {
        if (err) {
            res.json({
                status: false,
                data: err
            })
        }
        if (response) {
            return res.json({
                status: true,
                data: response
            });
        }
        else {
            return res.json({
                status: true,
                data: "no match"
            });
        }
    })
}

//edit episode
exports.editEpisode = function (req, res) {
    var name = req.body.name;
    Episode.findOne({ name: name }, function (err, episode) {
        if (err) {
            res.json(err);
        }

        var name = req.body.name;
        var description = req.body.description;
        var startson = req.body.startson;
        var endson = req.body.endson;

        episode.name = name;
        episode.description = description;
        episode.startson = startson;
        episode.endson = endson;
        episode.updateddate = new Date();

        episode.save(function (err, response) {
            if (err) {
                res.json({
                    status: false,
                    respData: {
                        data: err
                    }
                });
            }
            else {
                res.json({
                    status: true,
                    respData: {
                        data: response
                    }
                });
            }
        })
    })
};

//delete episode
exports.deleteEpisode = function (req, res) {
    var _id = req.params._id;
    Episode.findOne({ _id: _id }, function (err, response) {
        if (err) {
            res.json("cannot find item")
        }

        if (response) {
            Episode.remove({ _id: _id }, function (err1, response1) {
                if (err1) {
                    res.json(err1);
                }
                res.json(response1);
            })
        }
        else {
            res.json("cannot find ");
        }
    })
}

//delete episode for deleted series
exports.deleteSeriesEpisode = function (req, res) {
    var _id = req.params._id;
    Episode.find({ series_id: _id }, function (err, response) {
        if (err) {
            res.json("cannot find item")
        }

        if (response) {
            Episode.remove({ series_id: _id }, function (err1, response1) {
                if (err1) {
                    res.json(err1);
                }
                res.json(response1);
            })
        }
        else {
            res.json("cannot find ");
        }
    })
}

//add comment on episode
exports.addComment = function (req, res) {

    var comment = new Comment({
        episodeId: req.body.episodeId,
        comment: req.body.comment,
        name: req.body.name,
        createddate: new Date(),
        updateddate: new Date()
    });

    comment.save(function (err, response) {
        if (err) {
            res.json(err);
        }
        else {
            res.json({
                success: true,
                body: response
            })
        }
    });
}

//get comments
exports.getComments = function (req, res) {
    var _id = req.params._id;
    console.log("id", _id)
    Comment.find({ episodeId: _id }, function (err, response) {
        if (err) {
            return res.json(req, response, err);
        }
        else if (response) {
            res.json(response);
        }
        else {
            res.json({
                data: "no comments"
            })
        }
    })
};

//post movie
exports.addMovie = function (req, res) {
    var movie = new Movie({
        name: req.body.name,
        image: req.body.image,
        type: req.body.type,
        createddate: new Date(),
    });

    Movie.findOne({ name: movie.name }, function (request, response) {
        if (response) {
            res.json({
                data: "exist"
            })
        }
        else {
            movie.save(function (err, response) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json({
                        success: true,
                        body: response
                    })
                }
            });
        }
    });
}

//get movies
exports.getMovies = function (req, res) {
    Movie.find({}, function (err, response) {

        if (err) {
            return res.json(req, res, err);
        }
        res.json(response);
    })
};

//search movies
exports.searchMovies = function (req, res) {
    var name = RegExp(req.params.name);
    console.log(name)
    Movie.find({ name: name }, function (err, response) {
        if (err) {
            res.json({
                status: false,
                data: err
            })
        }
        if (response) {
            return res.json({
                status: true,
                data: response
            });
        }
        else {
            return res.json({
                status: true,                
                data: "no match"
            })
        }
    })
}

//delete a movie
exports.deleteMovie = function (req, res) {
    var _id = req.params._id;
    Movie.findOne({ _id: _id }, function (err, response) {
        if (err) {
            res.json("cannot find movie")
        }

        if (response) {
            Movie.remove({ _id: _id }, function (err1, response1) {
                if (err1) {
                    res.json(err1);
                }
                res.json(response1);
            })
        }
        else {
            res.json("cannot find ");
        }
    })
}

//search by catgeory
exports.searchCategory = function (req, res) {
    var name = RegExp(req.params.name);
    console.log(name)
    Movie.find({ type: name }, function (err, response) {
        if (err) {
            res.json({
                status: false,
                data: err
            })
        }
        if (response) {
            console.log("movie response", response)
            return res.json({
                status: true,
                data: response
            });
        }
        else {
            return res.json({
                status: true,
                data: "no match"
            });
        }
    })
}

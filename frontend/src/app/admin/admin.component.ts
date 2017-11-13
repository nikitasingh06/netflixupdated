import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConnectDbService } from '../connect-db.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  flagcategory;
  flagMovie;
  flagSeries;
  flagSeason;
  flagEpisode;
  flagEditseries;
  flagEditseason;
  flagEditepisode;
  series: any;
  seasons: any;
  episodes: any;
  categories: any;
  category: FormGroup;
  movie: FormGroup;
  newSeries: FormGroup;
  newSeason: FormGroup;
  newEpisode: FormGroup;
  movies: any;
  type;
  showError = false;

  constructor(public connect: ConnectDbService, public router: Router, public fb: FormBuilder) {
    this.category = fb.group({
      name: ['', [Validators.required]]
    })

    this.movie = fb.group({
      name: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      image: ['', [Validators.required]],
      type: ['', [Validators.required]]
    })

    this.newSeries = fb.group({
      name: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      description: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      createdby: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      type: ['', [Validators.required]]
    })

    this.newSeason = fb.group({
      seriesid: ['', [Validators.required]],
      name: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      description: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      startson: ['', [Validators.required]],
      endson: ['', [Validators.required]]
    })

    this.newEpisode = fb.group({
      seriesid: ['', [Validators.required]],
      seasonid: ['', [Validators.required]],
      name: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      story: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      image: ['', [Validators.required]]
    })
  }

  ngOnInit() {
  }

  formCategory() {
    this.flagcategory = 1;
  }
  formSeries(type) {
    this.flagSeries = 1;
    this.flagSeason = 0;
    this.flagEpisode = 0;
    this.type = type;
  }

  formSeason(_id) {
    localStorage.setItem("seriesid",_id);
    console.log("seriesid at localstorage", localStorage.getItem("seriesid"))    
    this.flagSeries = 0;
    this.flagSeason = 1;
    this.flagEpisode = 0;
  }

  formEpisode(_id) {
    localStorage.setItem("seasonid",_id);
    console.log("seasonid at localstorage", localStorage.getItem("seasonid"))
    this.flagSeries = 0;
    this.flagSeason = 0;
    this.flagEpisode = 1;
  }

  ESeries(_id) {
    this.flagEditseries = 1;
    this.flagEditseason = 0;
    this.flagEditepisode = 0;
  }

  ESeason(_id) {
    this.flagEditseries = 0;
    this.flagEditseason = 1;
    this.flagEditepisode = 0;
  }

  EEpisode(_id) {
    this.flagEditseries = 0;
    this.flagEditseason = 0;
    this.flagEditepisode = 1;
  }

  //add new category
  addCategory() {
    if (this.category.valid === true) {
      this.showError = false;
      this.connect.addCategory(this.category.value).subscribe(res => {
        this.flagcategory = 0;
        if (res.data != "exist") {
          alert("Category has been added");
          this.getCategories();
          console.log("added", res);
        }
        else if (res.data = "exist") {
          alert("exists")
        }
        else {
          error => alert(error);
        }
      })
    }
    else {
      this.showError = true;
    }
  }

  //get categories
  getCategories() {
    this.connect.getCategories().subscribe(res => {
      this.categories = res;
      console.log("res", res)
    })
  }

  //for displaying form for adding  movie
  addM(type) {
    this.flagMovie = 1;
    this.type = type;
  }


  //add movies
  addMovie() {
    this.movie.controls['type'].setValue(this.type);
    if (this.movie.valid === true) {
      this.showError = false;
      this.connect.addMovie(this.movie.value).subscribe(res => {
        this.flagMovie = 0;
        if (res.data != "exist") {
          alert("Movie has been added");
          this.getMovies();
          console.log("added", res);
        }
        else if (res.data = "exist") {
          alert("exists")
        }
        else {
          error => alert(error);
        }
      })
    }
    else {
      alert("eknwk")
      this.showError = true;
    }
  }

  //get movies
  getMovies() {
    this.connect.getMovies().subscribe(res => {
      this.movies = res;
      console.log("res", res)
    })
  }

  //delete a movie
  deleteMovie(_id) {
    var sure = confirm("Are you sure to delete this movie?");
    if (sure == true) {
      this.connect.deleteMovie(_id).subscribe(res => {
        alert("Deleted");
        this.getMovies();
      }
        , error => {
          alert(error);
        });
    } else {
      alert("Movie cannot be deleted!");
    }
  }

  //add a series
  addSeries() {
    this.newSeries.controls['type'].setValue(this.type);
    console.log(this.newSeries.value)
    if (this.newSeries.valid === true) {
      this.showError = false;
      this.connect.postSeries(this.newSeries.value).subscribe(res => {
        this.flagSeries = 0;
        if (res.data != "exist") {
          localStorage.setItem("seriesid", res.body._id);
          alert("Series has been added");
          this.getSeries();
          this.flagSeason = 1;
        }
        else if (res.data = "exist") {
          alert("exists")
        }
        else {
          error => alert(error);
        }
      })
    }
    else {
      this.showError = true;
    }
  }

  //get Series
  getSeries() {
    this.connect.getSeries().subscribe(res => {
      this.series = res;
    })
  }

  //edit Series
  editSeries() {
    this.connect.editSeries(this.newSeries.value).subscribe(res => {
    this.getSeries();     
      alert("edited")

    }
      , error => {
        alert(error);
      });
  }

  //delete series
  deleteSeries(_id) {
    var sure = confirm("Are you sure to delete this series?");
    if (sure == true) {
      this.connect.deleteSeries(_id).subscribe(res => {
        this.deleteSeriesSeason(_id);
        alert("Deleted");
        this.getSeries();
      }
        , error => {
          alert(error);
        });
    } else {
      alert("Series cannot be deleted!");
    }
  }

  //delete season for deleted season
  deleteSeriesSeason(_id) {
    this.connect.deleteSeriesSeason(_id).subscribe(res => {
      this.getSeasons(_id);
      this.deleteSeriesEpisode(_id);
    }
      , error => {
        alert(error);
      });
  }

  //delete episodes for deleted series
  deleteSeriesEpisode(_id) {
    this.connect.deleteSeriesEpisode(_id).subscribe(res => {
      this.getEpisodes(_id);
    }
      , error => {
        alert(error);
      });
  }


  //add season
  addSeason() {
    var seriesid1 = localStorage.getItem("seriesid")
    this.newSeason.controls['seriesid'].setValue(seriesid1);
    console.log("season",this.newSeason.value)
    if (this.newSeason.valid === true) {
      this.showError = false;
      this.connect.postSeason(this.newSeason.value).subscribe(res => {
        this.flagSeason = 0;
        if (res.data != "exist") {
          localStorage.setItem("seasonid", res.body._id);
          alert("Season has been added");
          console.log("seriesid",localStorage.getItem("seriesid"))
          this.getSeasons(localStorage.getItem("seriesid"));
          this.flagEpisode = 1;
          console.log("added", res);
        }
        else if (res.data = "exist") {
          alert("exists")
        }
        else {
          error => alert(error);
        }
      })
    }
    else {
      alert("else")
      this.showError = true;
    }
  }

  //get season of a particular series
  getSeasons(_id) {
    localStorage.setItem("seriesid",_id)
    this.connect.getSeasons(_id).subscribe(res => {
      this.seasons = res;
      console.log(res)
    })
  }

  //edit season
  editSeason() {
    this.connect.editSeason(this.newSeason.value).subscribe(res => {
      alert("edited")
      this.getSeasons(localStorage.getItem("seriesid"))
    }
      , error => {
        alert(error);
      });
  }

  //delete season
  deleteSeason(_id) {
    var sure = confirm("Are you sure to delete this season?");
    if (sure == true) {
      this.connect.deleteSeason(_id).subscribe(res => {
        alert("Deleted");
       this.getSeasons(localStorage.getItem("seriesid"));
       this.deleteSeriesEpisode(_id);
      }
        , error => {
          alert(error);
        });
    } else {
      alert("season cannot be deleted!");
    }
  }

  //add episode
  addEpisode() {
    var seriesid = localStorage.getItem("seriesid")
    var seasonid = localStorage.getItem("seasonid");
    this.newEpisode.controls['seriesid'].setValue(seriesid);
    this.newEpisode.controls['seasonid'].setValue(seasonid);
    
    if (this.newEpisode.valid === true) {
      this.showError = false;
      this.connect.postEpisode(this.newEpisode.value).subscribe(res => {
        this.flagEpisode = 0;
        if (res.data != "exist") {
          alert("Episode has been added");
          console.log("seasonid", seasonid)
          this.getEpisodes(seasonid);
        }
        else if (res.data = "exist") {
          alert("exists")
        }
        else {
          error => alert(error);
        }
      })
    }
    else {
      alert("else")
      this.showError = true;
    }
  }

  //get episodes
  getEpisodes(_id) {
    localStorage.setItem("seasonid",_id)
    this.connect.getEpisodes(_id).subscribe(res => {
      this.episodes = res;
    })
  }

  //edit episodes
  editEpisode() {
    console.log("value",this.newEpisode.value)
    this.connect.editEpisode(this.newEpisode.value).subscribe(res => {
      console.log("res",res)
      this.getEpisodes(localStorage.getItem("seasonid"))      
      alert("edited")
    }
      , error => {
        alert(error);
      });
  }

  //delete episodes
  deleteEpisode(_id) {
    var sure = confirm("Are you sure to delete this episode?");
    if (sure == true) {
      this.connect.deleteEpisode(_id).subscribe(res => {
        alert("Deleted");
        this.getEpisodes(localStorage.getItem("seasonid"));
      }
        , error => {
          alert(error);
        });
    } else {
      alert("episode cannot be deleted!");
    }
  }

}

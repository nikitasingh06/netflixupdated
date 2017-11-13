import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConnectDbService } from '../connect-db.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  flag;
  id;
  search;
  searchedSeries;
  series;
  searchedSeason;
  seasons;
  searchedEpisode;
  episodes;
  searchedMovie;
  movies;
  comics:any;
  comments:any;
  s;

  newComment: {
    name: String,
    comment: String,
    episodeId: String
  } = {
    name: localStorage.getItem('name'),
    comment: '',
    episodeId: ''
  }

  constructor(public connect: ConnectDbService) { }
  
  ngOnInit() {
    this.connect.getMovies().subscribe(res => {
      this.movies = res;
    })
  }

  //search by category
  searchCategory(){
    this.connect.searchCategory(this.search).subscribe(res =>{
      if(res.data!="no match"){
      this.s=res.data;
      }
      else if(res.data=="no match"){
        alert("no match found")
      }
  })
  }


  //search a movie
  searchMovies(){
    this.connect.searchMovies(this.search).subscribe(res =>{
      console.log(res)
      if(res.data!="no match"){
        this.searchedMovie=res.data[0];    
          }
          else {
            alert("no match found")
          }
    })
  }

  //get movies
  getMovies() {
    this.connect.getMovies().subscribe(res => {
      this.movies = res;
    })
  }

  //search a series
  searchSeries(){
    this.connect.searchSeries(this.search).subscribe(res =>{
      if(res.data!="no match"){
        this.searchedSeries=res.data[0];
      }
        else{
          alert("no match found")
        }
    })
  }

  //get series
  getSeries() {
    this.connect.getSeries().subscribe(res => {
      this.series = res;
    })
  }

  //search seasons
  searchSeason(){
    this.connect.searchSeason(this.search).subscribe(res =>{
      console.log("re",res.data)
      if(res.data!="no match"){
        this.searchedSeason=res.data[0];
      }
      else if (res.data == "no match") {
        alert("no match found")
      }
        else{
          alert("no match found")
        }
    })
  }

  //get seasons
  getSesaons(_id) {
    this.connect.getSeasons(_id).subscribe(res => {
      this.seasons = res;
    })
  }

  //search epsiodes
  searchEpisode(){
    this.connect.searchEpisode(this.search).subscribe(res =>{
      if(res.data!="no match"){
        this.searchedEpisode=res.data[0];
      }
        else{
          alert("no match found")
        }
    })
  }

  //get episodes
  getEpisodes(_id){
    this.connect.getEpisodes(_id).subscribe(res=>{
      this.episodes=res;
    })
  }


  comment(_id){
    this.id=_id;
    this.flag =1;        
  }

  commentOnEpisode(){
    this.newComment.episodeId = this.id;
    this.connect.addComment(this.newComment).subscribe(res=>
    {
      if(res){
            alert("Submitted! Thank you for your feedback")
            console.log("response",res);
      }
    })
  }

  getComments(_id){
    this.connect.getComments(_id).subscribe(res=>{
      if(res.data!= "no comments"){
        this.comments =res;
      }
      else if(res.data= "no comments"){
        alert("no comments")        
      }
      else {
        error => alert(error);
      }
     })    
  }

}

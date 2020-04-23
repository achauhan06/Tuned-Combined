import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import * as solid from '@fortawesome/free-solid-svg-icons';
import { forkJoin } from 'rxjs';
declare var $;

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit {

  songsList : any = []
  listOfAlbums : any = []
  userId;
  userType;
  userName;
  toAddSongToList = {
    songIdToBeAdded : "",
    listType : "album",
    listId : ""
  } ;

  songPreviewURL = "";
  songImageUrl = "";

  faAdd = solid.faPlus;

 
  setSongPreviewURL(song){
    this.dataservice.findAlbumForSong(song.song_id).subscribe((v : any)=>{
      this.songImageUrl =  v.image_url || "../../src/assets/images/NoImageAvailable.jpg"
    })
    this.songPreviewURL = song.preview_url || 'false';
    
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataservice : DataServiceService
  ) { 
    
    //PLAYER


    //PLAYER

      this.userId = sessionStorage.getItem("userId") && parseInt(sessionStorage.getItem("userId"));
      this.userType = sessionStorage.getItem("userType");
      this.userName = sessionStorage.getItem("username");
      let getAllAlbumsAPI = this.dataservice.getAllAlbumsForArtist(this.userId);
      let getAllSongsAPI = this.dataservice.getAllSongs();
      forkJoin([getAllSongsAPI, getAllAlbumsAPI]).subscribe((v:any)=>{
        if(v){
          this.songsList = v[0] || [];
          this.listOfAlbums = v[1] || [];
        }
      })
  }

  ngOnInit(): void {
  }

  setSongId(song){
    this.toAddSongToList.songIdToBeAdded = song.song_id;
  }

  addSongToList(){
    debugger
    this.dataservice.addSongToList(this.toAddSongToList).subscribe((v : any)=>{
      if(v){
        this.toAddSongToList.listId = "";
        this.toAddSongToList.listType = "album";
        this.toAddSongToList.songIdToBeAdded = "";
        alert("Song added");
      }else{
        alert("Some Error occured");
      }
    });
  }



}

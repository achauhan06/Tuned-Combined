import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { forkJoin } from 'rxjs';
import { sortBy } from 'underscore';

@Component({
  selector: 'app-all-people',
  templateUrl: './all-people.component.html',
  styleUrls: ['./all-people.component.scss']
})
export class AllPeopleComponent implements OnInit {
  
  artists = []
  listeners = []
  
  userId;
  userType;
  userName;

  
  constructor(
    private router: Router,
    private dataservice : DataServiceService
  ) { 
        this.userId = parseInt(sessionStorage.getItem("userId"));
        this.userType = sessionStorage.getItem("userType");
        this.userName = sessionStorage.getItem("username");
        let allArtistAPI = this.dataservice.getAllUsers("artist");
        let allListerAPI = this.dataservice.getAllUsers("listener");
        forkJoin([allArtistAPI, allListerAPI]).subscribe((v:any)=>{
          if(v && v[0] && v[1]){
            debugger
            this.artists = sortBy(v[0], "username");
            this.listeners = sortBy(v[1], " username");


          }else{
            
            alert("Some error occured");
          }
        })
  }

  ngOnInit(): void {
  }

  navigateToProfile(user){
    this.router.navigate([`/profile/${user.id}/${user.user_type}`]);
  }

  deleteUser(id){
    this.dataservice.deleteUserById(id).subscribe((v : any)=>{
      alert("User deleted");
      window.location.reload();
      if(v){
        alert("User deleted");
      }else{
       
      }
    })
  }

}

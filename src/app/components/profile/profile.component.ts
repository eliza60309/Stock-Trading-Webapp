import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  stock_id: string = "";
  loadingDisplayed: boolean = false;
  errorDisplayed: boolean = false;
  profileWorking: boolean = false;
  profileDisplayed: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) { }

/*
  ngOnChanges(changes: SimpleChanges): void {
    this.route.paramMap.subscribe(data => {
      if(data.get("stock_id") && data.get("stock_id") != "home") {
        this.stock_id = data.get("stock_id")!;
        this.loadingDisplayed = true;
        this.profileWorking = true;
      }
    });
    console.log("change");
  }*/

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      if(data.get("stock_id") && data.get("stock_id") != "home") {
        this.stock_id = data.get("stock_id")!;
        if(this.profileWorking) {
          this.cancelDisplay();
          setTimeout(() => this.profileWorking = true, 300);
        }
        else
          this.profileWorking = true;
        
        this.loadingDisplayed = true;
      }
    });
  }
  

  receiveComplete() {
    this.loadingDisplayed = false;
    this.profileDisplayed = true;
  }

  receiveNoData() {
    this.profileWorking = false;
    this.profileDisplayed = false;
    this.loadingDisplayed = false;
    this.errorDisplayed = true;
  }

  cancelDisplay() {
    this.profileDisplayed = false;
    this.profileWorking = false;
    this.loadingDisplayed = false;
    this.errorDisplayed = false;
  }


}

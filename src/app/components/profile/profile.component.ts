import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  stock_id: string = "";
  isLoading: boolean = true;
  noDataFlag: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      if(data.get("stock_id"))
        this.stock_id = data.get("stock_id")!;
    });
  }
  complete() {
    this.isLoading = false;
  }

  noData() {
    this.noDataFlag = true;
    this.isLoading = false;
  }
}

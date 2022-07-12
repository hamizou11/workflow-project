import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Chart,DoughnutController,PieController,registerables } from 'chart.js';
import { ApiService } from '../shared/api.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
result :any;
title :any;
rating:any;
startdate:any;
contributers :any;
chart :any = [];

constructor(private api :ApiService) {
    Chart.register(...registerables);
  }
  ngOnInit() {
    
   
   
   ;
      this.api.get().subscribe(res => {
        this.result =res;

        this.title = this.result.map((m:any)=>m.title);
        this.contributers = this.result.map((m:any)=>m.contributers);
        this.startdate = this.result.map((m:any)=>m.startdate);
        this.rating = this.result.map((m:any)=>m.rating);
        console.log(this.rating);
        
      
        this.chart =new Chart('canvas',{
          type:'pie',
          data   :{
            labels :this.title,
            datasets :[{
              label: 'Number of Contrubuters',
              data :this.contributers }]

          }   
          })
          this.chart =new Chart('canvas1',{
            type:'line',
            data   :{
              labels : this.title,
              datasets :[{
                label: 'Number of Contrubuters',
                data :this.contributers }]
  
            }   
            })
            this.chart =new Chart('canvas2',{
              type:'bar',
              data   :{
                labels : this.title,
                datasets :[{
                  label: 'Rating',
                  data :this.rating }]
      
              }   
              })
       })
      
       

  }
}

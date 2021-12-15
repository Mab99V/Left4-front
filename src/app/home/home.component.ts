import { Component, OnInit } from '@angular/core';
import {trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals',[
      transition('* =>*',[
        query(':enter',style({ opacity: 0  }), {optional: true}),
        query(':enter', stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity: 0, transform:'translateY(-75%)', offset:0 }),
            style({opacity: .5, transform:'translateY(35px)', offset:.3 }),
            style({opacity: 1, transform:'translateY(0)', offset:1 }),
          ]))
        ]), {optional: true}),
        
        query(':leave', stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity: 1, transform:'translateY(0)', offset:0 }),
            style({opacity: .5, transform:'translateY(35px)', offset:.3 }),
            style({opacity: 0 , transform:'translateY(-75%)', offset:1 }),
          ]))
        ]), {optional: true}) 


      ]) 
    ])
  ]
})
export class HomeComponent implements OnInit {
  
  itemCount: number;
  btntxt: string ="Añadir un infectado";
  goalText: string ="infectados"; 
  goals=[];
  constructor(private _data: DataService) { }

  ngOnInit() {
    this.itemCount = this.goals.length;
    this._data.goal.subscribe(res=> this.goals = res);
    this._data.changeGoal(this.goals);

    this._data.getGoals()
     .subscribe((data: any) => {
      alert(JSON.stringify(data.infectados)); //cambiado 49-51

      this.goals = data.infectados;
      this._data.changeGoal(this.goals);

    });
  } 

//cambiado 58-62
  AgregarMeta(){

    var payload = {
      nombre: "Boomer",
      habilidad: "vomito de Billis"
    }

    this._data.newGoal(payload)
    .subscribe((data: any) => {
   
      this.goals.push(payload);
      this.goalText='';
      this.itemCount=this.goals.length;
      this._data.changeGoal(this.goals);

   });

   
  }
  removeItem(i){
    this.goals.splice(i,  1); 
    this._data.changeGoal(this.goals); 
     
  } 
}

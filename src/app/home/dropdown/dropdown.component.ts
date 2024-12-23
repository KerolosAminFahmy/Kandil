
import { CommonModule } from '@angular/common';
import { Component, Directive, NgModule } from '@angular/core';
import { arrowComponent } from "../../../shared/Arrow/arrow.component";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CityService } from '../../../shared/Services/city.service';
import { AreaService } from '../../../shared/Services/area.service';
import { CityWithArea } from '../../../shared/Models/model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../../shared/Services/toast.service';


@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, arrowComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          height: '*'
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-10px)',
          height: '0',
          overflow: 'hidden'
        })
      ),
      transition('open <=> closed', [animate('300ms ease-in-out')]),
    ]),
  ]
  
})
export class DropdownComponent {
  SelectedCityId:number=0;
  SelectedAreaId:number=0;
  AllCity:CityWithArea[]=[];
  private subscriptions: Subscription = new Subscription();

  dropdowns: Array<{ label: string, options:  Array<{id:number, option: string, active: boolean }>, disabled: boolean,hide:boolean }> = [
    { label: "اختر المنطقة", options: [{id:0,option:"اختر المنطقة" ,active:true}], disabled: false , hide:true },
    { label: "اختر المشروع", options: [], disabled: true,hide:true },
    { label:"اختر الوحدة", options: [{id:0,option:"اختر الوحدة",active:true},{id:1,option:"شقة",active:false},{id:0,option:"دوبليكس",active:false},{id:0,option:"رووف",active:false}
    ], disabled: false,hide:true }

  ];
  ArrayArea: Array<Array<{id:number, option: string, active: boolean }>> = [];
  arrTemp: Array<{id:number, option: string, active: boolean }> = [];
  index: any;
  constructor(private messageService: MessageService,private CityService:CityService,private router: Router,private msg :ToastService){}
  ngOnInit(): void {
    const Sub = this.CityService.GetAllCitiesWithArea().subscribe((data)=>{
      data.forEach(element => {
        this.dropdowns[0].options.push({id:element.city.id, option:element.city.name,active:false})
        this.arrTemp.push({id:0,option:'اختر المشروع',active:true})
        element.areas.forEach((e)=>{
          this.arrTemp.push({id:e.id,option:e.name,active:false})
        })
        this.ArrayArea.push(this.arrTemp)
        this.arrTemp=[]
      });
    })
    const sub =  this.msg.MassegeToast.subscribe((data)=>{
      this.messageService.add({ severity: data.severity, summary: data.summary, detail: data.detail ,life: 4000  });

    })
    this.subscriptions.add(Sub);
    this.subscriptions.add(sub);

  }
  ToggleShow( dropdownIndex: number ){
    if(this.dropdowns[dropdownIndex].disabled){
      return
    }
    this.dropdowns[dropdownIndex].hide=!this.dropdowns[dropdownIndex].hide
    this.dropdowns.forEach((element,i) => {
      if(i!==dropdownIndex){
        element.hide=true
      }
    });
  }
  selectOption(dropdownIndex: number,IndexAreaArray:number, option: string) {
    const currentDropdown = this.dropdowns[dropdownIndex];
    currentDropdown.options.forEach((e)=>{
      if(e.option===option){
        e.active=true;
      }else{
        e.active=false
      }
    })
    currentDropdown.label = option;
    if (dropdownIndex === 0) {
      if(IndexAreaArray==0){
        this.SelectedCityId=0;
        this.clearOptions(this.dropdowns[1])
      }else{
        this.SelectedCityId=this.dropdowns[0].options[IndexAreaArray].id;
        this.populateDropdown(this.dropdowns[1],this.ArrayArea[IndexAreaArray-1]);
        this.dropdowns[1].label="اختر المشروع"
      }
      
    }else if(dropdownIndex === 1){
      this.SelectedAreaId= this.dropdowns[0].options[IndexAreaArray].id;
    }
  }

  populateDropdown(dropdown:any, options: Array<{ option: string, active: boolean }>) {
    dropdown.options = options;
    dropdown.disabled = false;
  }

  clearOptions(dropdown:any) {
    dropdown.options = [];
    this.SelectedAreaId=0;
    dropdown.disabled = true;
    dropdown.label = "اختر المشروع";
  }
  showChosenOptions(){
    if(this.SelectedCityId == 0 || this.SelectedAreaId == 0){
      this.msg.showMessage("warning","تحذير","يجب اختيار كل الاختيارات لاجل بحث فعال")
      return
    }
    this.router.navigate([`search/${this.SelectedCityId}/project/${this.SelectedAreaId}`])
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

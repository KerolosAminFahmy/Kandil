
import { CommonModule } from '@angular/common';
import { Component, Directive, NgModule } from '@angular/core';
import { arrowComponent } from "../../../shared/Arrow/arrow.component";
import { trigger, state, style, transition, animate } from '@angular/animations';


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
  dropdowns: Array<{ label: string, options:  Array<{ option: string, active: boolean }>, disabled: boolean,hide:boolean }> = [
    { label: "اختر المنطقة", options: [{option:"اختر المنطقة" ,active:true},{option:"التجمع الخامس",active:false}, {option:"مدينة الشروق",active:false}], disabled: false , hide:true },
    { label: "اختر المشروع", options: [], disabled: true,hide:true },
    { label:"اختر الوحدة", options: [{option:"اختر الوحدة",active:true},{option:"شقة",active:false},{option:"دوبليكس",active:false},{option:"رووف",active:false}
    ], disabled: false,hide:true }

  ];

  arrFirst: Array<{ option: string, active: boolean }> = [{option:'اختر المشروع',active:true},{option:'النرجس الجديدة',active:false},{option:'بيت الوطن',active:false},{option:'نورث هاوس',active:false}];
  arrSecond: Array<{ option: string, active: boolean }> = [{option:'اختر المشروع',active:true},{option:'منطقة الشروق',active:false}];
  index: any;
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
  selectOption(dropdownIndex: number, option: string) {

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
      const secondDropdown = this.dropdowns[1];
      if (option === "التجمع الخامس") {
        this.populateDropdown(secondDropdown, this.arrFirst);
      } else if (option === "مدينة الشروق") {
        this.populateDropdown(secondDropdown, this.arrSecond);
      } else {
        this.clearOptions(secondDropdown);
      }
    }
  }

  populateDropdown(dropdown:any, options: Array<{ option: string, active: boolean }>) {
    dropdown.options = options;
    dropdown.disabled = false;
  }

  clearOptions(dropdown:any) {
    dropdown.options = [];
    dropdown.disabled = true;
    dropdown.label = "اختر المشروع";
  }
}

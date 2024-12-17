import { Component } from '@angular/core';
import { FinisghItemService } from '../../../shared/Services/finisgh-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FinishItemDTO } from '../../../shared/Models/model';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../../shared/Services/toast.service';

@Component({
  selector: 'app-finish-item-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finish-item-manage.component.html',
  styleUrl: './finish-item-manage.component.css'
})
export class FinishItemManageComponent {
  items:FinishItemDTO[]=[];
  finishCategoryId:number=0;
  ImageUrl:string=environment.apiImage
  constructor(private ServiceFinish:FinisghItemService,private route :ActivatedRoute, 
    private router: Router,private Massege:ToastService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.finishCategoryId = +params['FinishCategory'];
    });
    this.ServiceFinish.getAllFinishItem(this.finishCategoryId).subscribe((data)=>{
      this.items=data
      
    })
  }
  AddFinishItem(){
    this.router.navigate([`dashboard/FinishCategory/${this.finishCategoryId}/add`]);

  }
  onDelete(id:number|undefined){
    this.ServiceFinish.DeleteFinishItem(id).subscribe(()=>{
      this.items = this.items.filter(item => item.id !== id);
      this.Massege.showMessage("success","نجاح","تم حذف تشطيب بنجاح")
    })
  }
  onEdit(id:number|undefined){
    this.router.navigate([`dashboard/FinishCategory/${this.finishCategoryId}/edit/${id}`])

  }
}

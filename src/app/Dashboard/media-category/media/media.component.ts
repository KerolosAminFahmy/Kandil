import { Component } from '@angular/core';
import { MediaDTO } from '../../../../shared/Models/model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MediaService } from '../../../../shared/Services/media.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent {
  Media!:MediaDTO[];
  MediaCategoryId:number=0;
  ImageUrl:string=environment.apiImage

  constructor(private route:ActivatedRoute,private MediaService:MediaService) {
    
  }
 


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.MediaCategoryId = +params['MediaCategoryId'] 
    });
    this.MediaService.getByMediaCategory(this.MediaCategoryId)
    this.MediaService.Media$.subscribe((data)=>{
      
      this.Media=data
    })
    
  }
  
 
  
  
 
 
  

  

  onDelete(id:number|undefined){
    this.MediaService.delete(id)
  } 
}

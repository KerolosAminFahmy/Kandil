import { Injectable } from '@angular/core';
import { projectCategory } from '../Models/model';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProjectContentService {

  constructor() { }
  loadContent(id:string | null):projectCategory[]{

    switch (id) {
      case "النرجس الجديدة":
        return [
          {title:"مشروع G 273 | النرجس الجديدة | القاهرة الجديدة",imgPath:"../../assets/Images/G273.png",url:"https://kandil-realestate.com/projects/%d8%a7%d9%84%d9%86%d8%b1%d8%ac%d8%b3-%d8%a7%d9%84%d8%ac%d8%af%d9%8a%d8%af%d8%a9/"},
          {title:"مشروع G 198 | النرجس الجديدة | القاهرة الجديدة",imgPath:"../../assets/Images/G198-SOLD.png",url:"https://kandil-realestate.com/projects/%d8%a8%d9%8a%d8%aa-%d8%a7%d9%84%d9%88%d8%b7%d9%86/"},
          {title:"مشروع D 81 | النرجس الجديدة | القاهرة الجديدة",imgPath:"../../assets/Images/SOLD-81.png",url:"https://kandil-realestate.com/projects/%d8%a8%d9%8a%d8%aa-%d8%a7%d9%84%d9%88%d8%b7%d9%86/"},
          {title:"مشروع D 324 | النرجس الجديدة | القاهرة الجديدة",imgPath:"../../assets/Images/d324.png",url:"https://kandil-realestate.com/projects/%d8%a7%d9%84%d9%86%d8%b1%d8%ac%d8%b3-%d8%a7%d9%84%d8%ac%d8%af%d9%8a%d8%af%d8%a9/"},
          {title:"مشروع A2 54 | النرجس الجديدة | القاهرة الجديدة",imgPath:"../../assets/Images/A2-54.jpeg",url:"https://kandil-realestate.com/projects/%d8%a8%d9%8a%d8%aa-%d8%a7%d9%84%d9%88%d8%b7%d9%86/"},
          {title:"مشروع A2 18 | النرجس الجديدة | القاهرة الجديدة",imgPath:"../../assets/Images/A2-18.jpeg",url:"https://kandil-realestate.com/projects/%d8%a8%d9%8a%d8%aa-%d8%a7%d9%84%d9%88%d8%b7%d9%86/"},
          {title:"مشروع B2 41 | النرجس الجديدة | القاهرة الجديدة",imgPath:"../../assets/Images/B2-41.jpeg",url:"https://kandil-realestate.com/projects/%d8%a7%d9%84%d9%86%d8%b1%d8%ac%d8%b3-%d8%a7%d9%84%d8%ac%d8%af%d9%8a%d8%af%d8%a9/"},
          {title:"مشروع B2 42 | النرجس الجديدة | القاهرة الجديدة",imgPath:"../../assets/Images/B2-42.jpeg",url:"https://kandil-realestate.com/projects/%d8%a8%d9%8a%d8%aa-%d8%a7%d9%84%d9%88%d8%b7%d9%86/"},
          {title:"مشروع D 312 | النرجس الجديدة | القاهرة الجديدة",imgPath:"../../assets/Images/d312.png",url:"https://kandil-realestate.com/projects/%d8%a8%d9%8a%d8%aa-%d8%a7%d9%84%d9%88%d8%b7%d9%86/"},
          {title:"مشروع C 283 | النرجس الجديدة | القاهرة الجديدة",imgPath:"../../assets/Images/C-283.jpeg",url:"https://kandil-realestate.com/projects/%d8%a8%d9%8a%d8%aa-%d8%a7%d9%84%d9%88%d8%b7%d9%86/"},
        ];
      case "بيت الوطن":
        return [
          {title:"مشروع ( B 106 ) | الحي الرابع – بيت الوطن | القاهرة الجديدة",url:"https://kandil-realestate.com/projects/%d8%a7%d9%84%d9%86%d8%b1%d8%ac%d8%b3-%d8%a7%d9%84%d8%ac%d8%af%d9%8a%d8%af%d8%a9/",imgPath:"../../assets/Images/B-106.jpeg"},
          {title:"مشروع ( I 108 ) | الحي الأول - بيت الوطن | القاهرة الجديدة",url:"https://kandil-realestate.com/projects/%d8%a8%d9%8a%d8%aa-%d8%a7%d9%84%d9%88%d8%b7%d9%86/",imgPath:"../../assets/Images/I-108.jpeg"},
        ]
      case "نورث هاوس":return [
        {title:"مشروع C 40 | النورث هاوس | القاهرة الجديدة",url:"https://kandil-realestate.com/projects/%d8%a7%d9%84%d9%86%d8%b1%d8%ac%d8%b3-%d8%a7%d9%84%d8%ac%d8%af%d9%8a%d8%af%d8%a9/",imgPath:"../../assets/Images/C-40.jpeg"}
      ]
    }


    return new Array<projectCategory>();
  }
  loadTitle(id:string | null):string{
    switch (id) {
      case '1':
        return "النرجس الجديدة"
      case '2':
        return "بيت الوطن"
    }
    return "";
  }
}

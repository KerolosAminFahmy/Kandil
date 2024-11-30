import { Injectable } from '@angular/core';
import { Media, projectCategory } from '../Models/model';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class LoadMediaContentService {

  constructor() { }
  loadContent(id:string | null):projectCategory[]{

    switch (id) {
      case 'الأخبار':
        return [
        ];
      case 'المقالات العامة':
        return [
         
        ]
        case "الفعاليات":
          return [
            {title:"الإفطار السنوي لشركة قنديل",imgPath:"../../assets/Images/IMG_1473-2-scaled.jpg",url:"media/1",date:"أبريل 15, 2024"}
          ]
      case "الوظائف":
        return [
          {
            title:"دور الإنشاءات والعقارات في تطور الاقتصاد والمجتمع",
            imgPath:"../../assets/Images/daniel-mccullough-HtBlQdxfG9k-unsplash-scaled.jpg",
            url:"media/2",
            date:"نوفمبر 4, 2023"
          }
        ]
    }


    return new Array<projectCategory>();
  }
  loadDetailContent(id:string | null):Media{
    switch (id) {
      case '1':
        return {
          title:"الإفطار السنوي لشركة قنديل",
          date:"أبريل 15, 2024 ",
          imgPath:"../../assets/Images/IMG_1473-2-scaled.jpg",
          url:"mediaCategories/الفعاليات",
          MediaType:"الفعاليات",
          LinkYoutube:"https://www.youtube.com/embed/OVyBuwbnOWI?feature=oembed",
          detailContent:""
        }
      case '2':
        return {
          title:"دور الإنشاءات والعقارات في تطور الاقتصاد والمجتمع",
          date:"نوفمبر 4, 2023",
          imgPath:"../../assets/Images/daniel-mccullough-HtBlQdxfG9k-unsplash-scaled.jpg",
          url:"mediaCategories/الوظائف",
          MediaType:"الوظائف",
          LinkYoutube:"https://www.youtube.com/embed/Shk0ovDJsXA?feature=oembed",
          detailContent:` <p>تمتلك الإنشاءات والعقارات دورًا حاسمًا في تطوير الاقتصاد والمجتمع. فهي تمثل قاعدة البنية التحتية للمجتمعات وتسهم بشكل كبير في نمو الاقتصاد الوطني. في هذه المقالة، سأتناول الأثر الإيجابي للإنشاءات والعقارات على الاقتصاد والمجتمع من خلال النقاط التالية:</p>
                      <p>1. **الإنشاءات والعقارات والنمو الاقتصادي**: سأشرح كيف تسهم صناعة الإنشاءات والعقارات في زيادة الناتج المحلي الإجمالي للدولة وتوفير فرص العمل للعديد من الناس. سأتناول أيضًا تأثيرها على الصناعات المتعلقة مثل الصناعة العقارية وصناعة المواد الإنشائية.</p>
                      <p>2. **توفير الإسكان**: سأتحدث عن دور العقارات في توفير الإسكان للمواطنين وتحسين مستوى المعيشة. سأتناول أيضًا السياسات الحكومية المتعلقة بالإسكان وتوجيه الاستثمارات نحو هذا القطاع.</p>
                      <p>3. **التنمية الحضرية**: سأناقش كيف يمكن للإنشاءات والعقارات تشكيل تنمية المدن والمناطق الحضرية. سأسلط الضوء على الأثر البيئي والاجتماعي لهذه التنمية وضرورة توجيهها نحو الاستدامة.</p>
                      <p>4. **الاستثمار العقاري**: سأقدم نظرة عامة على أهمية الاستثمار في العقارات وكيف يمكن للأفراد والشركات الاستفادة من هذا القطاع.</p>
                      <p>5. **التحديات والمستقبل**: سأختم المقالة بمناقشة التحديات التي تواجه صناعة الإنشاءات والعقارات مثل التنظيم والتشريعات، وسألمح إلى اتجاهات مستقبلية في هذا المجال.</p>
                    
                      <p>في الختام، تظهر أهمية الإنشاءات والعقارات في تحفيز النمو الاقتصادي وتحسين مستوى المعيشة. تعتبر هذه الصناعة أحد محركات التنمية والاستقرار الاجتماعي، وعليه يجب توجيه الجهود نحو تعزيزها وتطويرها بشكل مستدام.</p>`,
        }
      }
    return {title:"",date:"",imgPath:"",url:"",MediaType:"",LinkYoutube:"",detailContent:""}
  }
  loadImageDeatil(id:string | null):string[]{
    switch(id){
      case '1':
        return [
          "../../assets/Images/e.jpg",
          "../../assets/Images/e1.jpg",
          "../../assets/Images/e3.jpg",
          "../../assets/Images/e4.jpg",
          "../../assets/Images/e5.jpg",
          "../../assets/Images/e6.jpg",
          "../../assets/Images/e7.jpg",
          "../../assets/Images/e8.jpg",
          "../../assets/Images/e9.jpg",
          "../../assets/Images/e10.jpg",
          "../../assets/Images/e11.jpg",
          "../../assets/Images/e12.jpg",
          "../../assets/Images/e13.jpg",
          "../../assets/Images/e14.jpg",
          "../../assets/Images/e15.jpg",
          "../../assets/Images/e16.jpg",
          "../../assets/Images/e17.jpg",
          "../../assets/Images/e18.jpg",
          "../../assets/Images/e19.jpg",
          "../../assets/Images/e20.jpg",
          "../../assets/Images/e21.jpg",
          "../../assets/Images/e22.jpg",
          "../../assets/Images/e23.jpg",
        ]
      case '2':
        return [
          "../../assets/Images/j1.jpg",
          "../../assets/Images/j2.jpg",
          "../../assets/Images/j3.jpg",
        ]
    }
    
    return [

    ]
  }
}

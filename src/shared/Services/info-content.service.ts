import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoContentService {

  loadContent(id: string | null): {title:string, imageSrc: string, quoteText: string, mainText: string, listItems: { title: string, description: string }[] } {
    switch (id) {
      case '4':
        return {
          title:"الجودة",
          imageSrc: '../../assets/Images/الجودة-1.png',
          quoteText: 'تُؤكد شركة قنديل على التزامها باستمرار تطبيق فلسفة الجودة في جميع جوانب عملها...',
          mainText: 'تحرص شركة قنديل على الاستماع إلى آراء وملاحظات العملاء بشكل دائم...',
          listItems: []
        };
      case '2':
        return {
          title:"الثقة",
          imageSrc: '../../assets/Images/الثقة-1.png',
          quoteText: 'في عالم يزداد فيه التنافس يومًا بعد يوم،',
          mainText: 'تُدرك شركة قنديل أهمية بناء علاقات قوية وناجحة مع عملائها...',
          listItems: []
        };
      case '3':
        return {
          title:"الإلتزام",
          imageSrc: '../../assets/Images/الثقة-1.png',
          quoteText: 'شركة “قنديل للإستثمار العقاري” تلتزم بـ:',
          mainText: '',
          listItems: [
            { title: 'الوفاء بالوعود', description: 'تنفيذ جميع الوعود التي تم تقديمها للعميل دون أي تهاون.' },
            { title: 'الالتزام بالمواعيد', description: 'تسليم الوحدات العقارية في الوقت المحدد دون تأخير.' },
            { title: 'الالتزام بالجودة', description: 'تنفيذ جميع الأعمال وفقًا للمواصفات والمعايير المتفق عليها.' },
            { title: 'الالتزام بالشفافية', description: 'تقديم جميع المعلومات والبيانات المتعلقة بالعقارات للعميل بشكل واضح وصريح.' },
            { title: 'الالتزام بالدعم', description: 'تقديم خدمات ما بعد البيع للعملاء وتلبية احتياجاتهم.' }          ]
        };
      case '5':
        return {
          title:"المصداقية",
          imageSrc: '../../assets/Images/المصداقية.png',
          quoteText: 'نُؤكد على التزامنا بالمصداقية في جميع تعاملاتنا مع عملائنا، ونُؤمن بأنّها هي أساس بناء علاقات قوية ودائمة. فنحن نُقدّر ثقتكم بنا ونُحافظ عليها من خلال الالتزام بالمبادئ والقيم التي نؤمن بها.',
          mainText: 'في شركة قنديل، نؤمن إيمانًا راسخًا بأهمية المصداقية في جميع تعاملاتنا مع عملائنا. فمنذ تأسيسنا، حرصنا على بناء علاقات قوية قائمة على الثقة والاحترام المتبادل. وإيمانًا منا بأهمية المصداقية، نودّ أن نُؤكد على التزامنا بالمبادئ التالية:',
          listItems: [
            { title: 'الشفافية', description: 'نُؤمن بأنّ الشفافية هي أساس المصداقية.' },
            { title: 'الوفاء بالوعود', description: 'نُدرك أهمية الوفاء بالوعود التي نُقدمها لعملائنا.' },
            { title: 'الصدق والأمانة', description: 'نُؤمن بأنّ الصدق والأمانة هما أساس أيّ علاقة ناجحة.' },
            { title: 'احترام احتياجات العملاء', description: 'نُدرك أهمية احتياجات عملائنا ونُقدرها.' },
            { title: 'خدمة عملاء ممتازة', description: 'نُؤمن بأنّ خدمة العملاء هي العنصر الأساسي لضمان رضاهم.' }          ]
        };
      default:
        return {
          title:'',
          imageSrc: '',
          quoteText: 'Page not found',
          mainText: '',
          listItems: []
        };
    }
  }
}

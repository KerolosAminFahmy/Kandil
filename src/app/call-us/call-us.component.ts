import { Component, Inject } from '@angular/core';
import { TitleNavigationComponent } from "../../shared/Component/title-navigation/title-navigation.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../shared/Services/contact.service';
import { ToastService } from '../../shared/Services/toast.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-call-us',
  standalone: true,
  imports: [ToastModule, ButtonModule, RippleModule,TitleNavigationComponent,ReactiveFormsModule],
  templateUrl: './call-us.component.html',
  styleUrl: './call-us.component.css'
})
export class CallUsComponent {
  contactForm: FormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder,private messageService: MessageService, private contactService: ContactService,private msg :ToastService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      project: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // const sub =  this.msg.MassegeToast.subscribe((data)=>{
    //   this.messageService.add({ severity: data.severity, summary: data.summary, detail: data.detail ,life: 4000  });

    // })
    // this.subscriptions.add(sub);

  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formvalue=this.contactForm.value;
      const Contact={
        id:0,
        name: formvalue.name,
        phone: formvalue.phone,
        email: formvalue.email,
        project: formvalue.project,
        message: formvalue.message,
      }
      this.contactService.createContact(Contact).subscribe((date)=>{
        this.msg.showMessage("success","نجاح","تم ارسال رساله بنجاح")
        this.contactForm.reset();
      })
      // this.contactService.createContact(this.contactForm.value).subscribe(
      //   (response) => {
      //     console.log('Form submitted successfully', response);
      //     this.contactForm.reset();
      //   },
      //   (error) => {
      //     console.error('Error submitting form', error);
      //   }
      // );
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

import { Component, inject } from '@angular/core';
import { Contact } from '../../../shared/Models/model';
import { ContactService } from '../../../shared/Services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-manage.component.html',
  styleUrl: './contact-manage.component.css'
})
export class ContactManageComponent {
  contacts: Contact[] = [];
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe(
      (response: Contact[]) => {
        this.contacts = response;
      },
      (error) => {
        console.error('Error loading contacts', error);
      }
    );
  }

  removeContact(id: number): void {
      this.contactService.deleteContact(id).subscribe(
        () => {
          this.contacts = this.contacts.filter(contact => contact.id !== id);
        },
        (error) => {
          console.error('Error removing contact', error);
        }
      );
  }
}

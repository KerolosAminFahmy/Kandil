import { Component, inject } from '@angular/core';
import { Contact } from '../../../shared/Models/model';
import { ContactService } from '../../../shared/Services/contact.service';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { Subscription } from 'rxjs';
// import { saveAs } from 'file-saver';

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
  selectedRows: any[] = [];
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    const Sub =this.contactService.getContacts().subscribe(
      (response: Contact[]) => {
        this.contacts = response;
      },
      (error) => {
        console.error('Error loading contacts', error);
      }
    );
    this.subscriptions.add(Sub);
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
  exportAll() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.contacts);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contacts');
    XLSX.writeFile(wb,"شكوي او الاقتراحات.xlsx")
    // const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    // this.saveAsExcelFile(excelBuffer, 'contacts');
  }

  exportSelected() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.selectedRows);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Selected Contacts');
    XLSX.writeFile(wb,"شكوي او الاقتراحات.xlsx")

    //const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    // this.saveAsExcelFile(excelBuffer, 'selected_contacts');
  }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
  //   saveAs(data, `${fileName}.xlsx`);
  // }

  toggleRowSelection(contact: any, event: any) {
    if (event.target.checked) {
      this.selectedRows.push(contact);
    } else {
      this.selectedRows = this.selectedRows.filter(row => row.id !== contact.id);
    }
  }
  toggleAll(event: any) {
    if (event.target.checked) {
      this.selectedRows = [...this.contacts];
    } else {
      this.selectedRows = [];
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

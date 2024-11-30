import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../Models/model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //private apiUrl = 'https://localhost:7289/api/Contact';
  private apiUrl =  environment.apiUrl+'/Contact';

  constructor(private http: HttpClient) {}

  // Create a new contact
  createContact(contact: Contact): Observable<Contact> {
    const formData=this.createFormData(contact)
    return this.http.post<Contact>(`${this.apiUrl}`, formData);
  }

  // Get all contacts
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}`);
  }

  // Update contact
  updateContact(id: number, contact: Contact): Observable<Contact> {
    const formData=this.createFormData(contact)

    return this.http.put<Contact>(`${this.apiUrl}/${id}`, formData);
  }

  // Delete contact
  deleteContact(id: number): Observable<Contact> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  private createFormData(contact: Contact): FormData {
    const formData = new FormData();
  
    if (contact.id !== undefined) {
      formData.append('Id', contact.id.toString());
    }
  
    formData.append('Name', contact.name);
    formData.append('Phone', contact.phone);
    formData.append('Email', contact.email);
    formData.append('Project', contact.project);
    formData.append('Message', contact.message);
  
    return formData;
  }
  
}

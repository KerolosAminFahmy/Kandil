import { Component } from '@angular/core';
import { AuthService } from '../../../shared/Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const Sub = this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveTokens(response.accessToken,response.refreshToken); 
        this.router.navigate(['/dashboard/Cities']);
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
    this.subscriptions.add(Sub);

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../../shared/Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveTokens(response.accessToken,response.refreshToken); // Save JWT token
        this.router.navigate(['/dashboard']); // Navigate to the dashboard or another secure page
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid username or password');
      }
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, InfoResponse } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  username = '';
  password = '';
  loading = false;
  error = '';
  info: InfoResponse | null = null;

  user: { displayName: string; username: string; role: string } | null = null;

  constructor(private readonly api: ApiService) {
    const storedUser = localStorage.getItem('demo-user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.loadInfo();
    }
  }

  login(): void {
    this.loading = true;
    this.error = '';

    this.api.login(this.username, this.password).subscribe({
      next: response => {
        localStorage.setItem('demo-token', response.token);
        localStorage.setItem('demo-user', JSON.stringify(response.user));
        this.user = response.user;
        this.loading = false;
        this.loadInfo();
      },
      error: () => {
        this.error = 'Connexion impossible. Vérifiez vos identifiants.';
        this.loading = false;
      }
    });
  }

  loadInfo(): void {
    this.api.getInfo().subscribe({
      next: info => {
        this.info = info;
      },
      error: () => {
        this.error = 'Impossible de joindre le backend.';
      }
    });
  }

  logout(): void {
    localStorage.removeItem('demo-token');
    localStorage.removeItem('demo-user');
    this.user = null;
    this.info = null;
  }
}

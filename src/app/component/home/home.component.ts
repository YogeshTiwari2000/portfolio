import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';

// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators,  } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule , ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['',],
    phone: ['',],
    message: ['', Validators.required],
  });
  status: string = '';
  submitting = false;
  showNavbar = false;

  toggleNavbar(){
this.showNavbar = !this.showNavbar;
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.submitting = true;
    const formData = this.form.value;

    const headers = new HttpHeaders({ 'Accept': 'application/json' });

    this.http.post('https://formspree.io/f/mldbaapr', formData, { headers }).subscribe({
      next: () => {
        this.status = 'success!';
        this.form.reset();
        this.submitting = false;
      },
      error: () => {
        this.status = ' There was an error. Please try again.';
        this.submitting = false;
      },
    });
  }

 

}

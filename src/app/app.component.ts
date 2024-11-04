import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import platesFiles from './plates.json';
import { VehicleService } from './service/vehicle.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'vehicle-web';
  plates: string[] = [];
  score = "";
  fetching = false;

  form = new FormGroup({
    plate: new FormControl('')
  });

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    let acumulated = '';
    platesFiles.forEach((p, index) => {
      if (index % 3 === 0) {
        this.plates.push(acumulated.trimEnd());
        acumulated = '';
      } else {
        acumulated += `${p.license_plate} `;
      }
    })
  }

  onSubmit() {
    const { plate } = this.form.value;
    if (!plate) return;

    this.fetching = true;
    this.vehicleService.getScore(plate)
      .subscribe({
        next: (response: any) => {
          this.score = response.data;
          this.fetching = false;
        },
        error: (err: any) => {
          console.error(err);
          this.fetching = false;
        }
      });
  }
}

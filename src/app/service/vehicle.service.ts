import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class VehicleService {

  private host = 'https://vehicle-platform-api.azure-api.net'

  constructor(private http: HttpClient) {}

  getScore(plate: string): any {
    return this.http.get(`${this.host}/vehicle/${plate}`);
  }
}
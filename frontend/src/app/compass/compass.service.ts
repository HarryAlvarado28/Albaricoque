import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompassService {
  private readonly apiUrl = 'http://192.168.50.191:5000/comando';

  constructor(private readonly http: HttpClient) {}

  enviarComando(cmd: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { cmd };
    return this.http.post(this.apiUrl, body, { headers });
  }
}

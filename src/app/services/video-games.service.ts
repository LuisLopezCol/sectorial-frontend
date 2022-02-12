import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance } from 'src/app/models/maintenance';


@Injectable({
  providedIn: 'root'
})
export class VideoGamesService {

  constructor(private http:HttpClient){}

  //-------------------Database  methods-------------------

  urlCRUD  = "https://sectorialbackend.herokuapp.com/manager"
  // urlCRUD  = "http://localhost:5555/manager";

  postMaintenance(maintenance: Maintenance): Observable<any>{
		return this.http.post(this.urlCRUD, maintenance);
	}
  getMaintenances(): Observable<any>{
    return this.http.get(this.urlCRUD);
  }

  getMaintenance(id: any): Observable<any>{
    return this.http.get(`${this.urlCRUD}/${id}`);
  }
  
  putMaintenance(id: string, maintenance: Maintenance):Observable<any>{
		return this.http.put(`${this.urlCRUD}/${id}`, maintenance);
	}

	deleteMaintenance(id: String): Observable<any>{
		return this.http.delete(`${this.urlCRUD}/${id}`);
	}
}

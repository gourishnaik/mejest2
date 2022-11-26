import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
//user creation
  createuser(res:any){
    return this.httpClient.post<any>("http://localhost:3000/posts", res)
    .pipe(map((res:any)=>{
      return res;
  }))
}

 getAlluser(){
     return this.httpClient.get<any>("http://localhost:3000/posts");
   }

   delete(user:any){
    return this.httpClient.delete<any>("http://localhost:3000/posts/" +user.id)
    }

    updateuser(user:any){
      return this.httpClient.put("http://localhost:3000/posts/" +user.id,user)
    }
}

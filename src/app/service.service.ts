import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemProps } from 'src/items';
// import { formData } from './add-todo-item/add-todo-item.component';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
    
  private baseUrl = 'http://localhost:3232/api/todos';

  constructor(private http: HttpClient) { }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  postTodo(title:string, description: string){
    return this.http.post<ItemProps[]>(`${this.baseUrl}/create/`,  {
      title: title,  
      description: description
    } )
  }
  getAllItems(){
    return this.http.get<ItemProps[]>(`${this.baseUrl}/list/`);
  }

  taskStatus(id: string, data: boolean){
    return this.http.get<any>(`${this.baseUrl}/toggle-completion-status/${id}`)
  }

  deleteItem(id: string){
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`)
  }

  editTodo(id: string, data: formData ){
    return this.http.patch<formData>(`${this.baseUrl}/update/${id}`, {
      title: data.title,
      description: data.description
    })
  }
}



export type formData = {
  title: any;
  description: any;
  
}
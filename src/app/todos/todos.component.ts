import { Component, Output, OnInit } from '@angular/core';

import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig} from 'primeng/api';

import { ItemProps } from 'src/items'; 
import { formData, ServiceService } from '../service.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {

    @Output() items!: ItemProps[]; 
    isEditVisible: boolean = false;      
    isVisible!: boolean;
    uid!:string;
    title!: string;
    description!: string;
    checked!: boolean;

    obj!: formData;
      
  
    constructor(
      private confirmationService: ConfirmationService,    
      private messageService: MessageService,    
      private primengConfig: PrimeNGConfig,
      private api: ServiceService,
      ) {}
      
   
      deleteTodo(title:string, uid: string, event: any) {             
            this.confirmationService.confirm({
              target: event?.target,
              message: `Are you sure you want to delete ${title}?`,
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                this.api.deleteItem(uid).subscribe({
                next: (res) => {
                    this.items = res;                
                    this.messageService.add({                
                      severity: "success",
                      summary: "Deleted!",
                      detail: `${title} has been deleted!`
                    });
                  },
                error: (Error) => {
                    console.log(Error);
                  }
                })
              },
              reject: () => {
                this.messageService.add({
                  severity: "error",
                  summary: "cancelled delete!",
                  detail: "Delete is cancelled"
                });
              }
            })
      }
  
      openEditModal(){ this.isEditVisible = true }
  
  
      onEditTodo(id: string, data: formData){        
        // console.log(data);
        // this.operation = "Update";
        this.uid = id;
        this.obj = <formData>data;
        console.log(this.obj);
        this.openEditModal();
      }      
  
      onAddTodo(data: formData){ 
        if(data.title !== "" && data.description !== ""){
          // Add todo item to DB
          this.api.postTodo(data.title, data.description).subscribe({
            next: (res) => {
              console.log(res);
              this.items = res;
              this.messageService.add({                
                severity: "success",
                summary: "Successful!",
                detail: `Add Todo successful!`
              });
              this.title=""; 
              this.description=""
              this.closeAddTodoModal();
            },
            error: () => {
              this.messageService.add({                
                severity: "danger",
                summary: "Failed!",
                detail: `Could not add Todo!`
              });
              this.closeAddTodoModal();
            }
          })
        }
      } 

      onUpdateTodo(id: string, data: formData){
        if(data.title !== "" && data.description !== ""){
          // Update Todo on db
          this.api.editTodo(id, data).subscribe({
            next: (res) => { 
              this.items = <any>res;
              this.close();
            },
            error: (Error) => { console.log(Error) }
          })
        }
      }

      save(){ this.onUpdateTodo(this.uid, this.obj) }

      close(){ this.isEditVisible = false; this.obj.description = '', this.obj.title = ''; }
  
      updateTaskStatus(event: any, id: string){
        this.api.taskStatus(id, event.target.checked).subscribe({
          next: (res) => {
            this.items = res;
          },
          error: () => { console.log("could not update status!") }
        });
      }
  
      // add todo item 
      showAddTodoModal(){ this.isVisible = true }
      
      closeAddTodoModal(){ this.isVisible = false }
      
  
  
      ngOnInit() {
        this.primengConfig.ripple = true;
        this.api.getAllItems().subscribe(data => this.items = data)
      }
  }
  
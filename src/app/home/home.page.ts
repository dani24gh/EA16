import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../task.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  taskText = ''; 
  tasks$: Observable<Task[]> = new Observable(); // Cambiar a Observable para Firestore
  editingTaskId: string | null = null; 

  constructor(private taskService: TaskService) {} 

  ngOnInit() {
    this.tasks$ = this.taskService.getTasks(); // Obtener tareas desde Firestore
  }

  addTask() {
    if (this.taskText.trim()) {
      const newTask: Task = { title: this.taskText, done: false };

      if (this.editingTaskId) {
        this.taskService.updateTask(this.editingTaskId, { title: this.taskText }).then(() => {
          this.editingTaskId = null; 
          this.taskText = '';
        });
      } else {
        this.taskService.addTask(newTask).then(() => {
          this.taskText = '';
        });
      }
    }
  }

  editTask(task: Task) {
    this.taskText = task.title;
    this.editingTaskId = task.id || null;
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
  }
}

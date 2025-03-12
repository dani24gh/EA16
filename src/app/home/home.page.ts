import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  taskText = '';
  tasks: string[] = [];
  editingIndex: number | null = null; 
  addTask() {
    if (this.taskText.trim()) {
      if (this.editingIndex !== null) {
        this.tasks[this.editingIndex] = this.taskText;
        this.editingIndex = null; 
      } else {
        this.tasks.push(this.taskText);
      }
      this.taskText = ''; 
    }
  }

  editTask(index: number) {
    this.taskText = this.tasks[index];
    this.editingIndex = index; 
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    if (this.editingIndex === index) {
      this.editingIndex = null; 
    }
  }
}

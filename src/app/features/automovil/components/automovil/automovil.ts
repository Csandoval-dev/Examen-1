import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AutomovilService, Automovil } from '../../services/automovil';

@Component({
  selector: 'app-automovil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './automovil.html',
  styleUrls: ['./automovil.scss']
})
export class AutomovilComponent implements OnInit {
  private fb = inject(FormBuilder);
  private automovilService = inject(AutomovilService);

  automovilForm: FormGroup;
  automoviles: Automovil[] = [];
  editingId: string | null = null;

  constructor() {
    this.automovilForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: [2024, [Validators.required, Validators.min(1900), Validators.max(2025)]],
      color: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadAutomoviles();
  }

  loadAutomoviles(): void {
    this.automovilService.getAutomoviles().subscribe({
      next: (data) => {
        this.automoviles = data;
      },
      error: (error) => {
        console.error('Error al cargar automóviles:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.automovilForm.valid) {
      const automovil: Automovil = this.automovilForm.value;

      if (this.editingId) {
        this.automovilService.updateAutomovil(this.editingId, automovil).then(() => {
          console.log('Automóvil actualizado');
          this.resetForm();
        }).catch(error => {
          console.error('Error al actualizar:', error);
        });
      } else {
        this.automovilService.addAutomovil(automovil).then(() => {
          console.log('Automóvil agregado');
          this.resetForm();
        }).catch(error => {
          console.error('Error al agregar:', error);
        });
      }
    }
  }

  editAutomovil(automovil: Automovil): void {
    this.editingId = automovil.id!;
    this.automovilForm.patchValue({
      marca: automovil.marca,
      modelo: automovil.modelo,
      anio: automovil.anio,
      color: automovil.color,
      precio: automovil.precio
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteAutomovil(id: string): void {
    if (confirm('¿Está seguro de eliminar este automóvil?')) {
      this.automovilService.deleteAutomovil(id).then(() => {
        console.log('Automóvil eliminado');
      }).catch(error => {
        console.error('Error al eliminar:', error);
      });
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.automovilForm.reset({ anio: 2024, precio: 0 });
    this.editingId = null;
  }
}
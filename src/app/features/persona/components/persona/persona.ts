import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PersonaService, Persona } from '../../services/persona';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './persona.html',
  styleUrls: ['./persona.scss']
})
export class PersonaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private personaService = inject(PersonaService);

  personaForm: FormGroup;
  personas: Persona[] = [];
  editingId: string | null = null;

  constructor() {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: [0, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadPersonas();
  }

  loadPersonas(): void {
    this.personaService.getPersonas().subscribe({
      next: (data) => {
        this.personas = data;
      },
      error: (error) => {
        console.error('Error al cargar personas:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.personaForm.valid) {
      const persona: Persona = this.personaForm.value;

      if (this.editingId) {
        this.personaService.updatePersona(this.editingId, persona).then(() => {
          console.log('Persona actualizada');
          this.resetForm();
        }).catch(error => {
          console.error('Error al actualizar:', error);
        });
      } else {
        this.personaService.addPersona(persona).then(() => {
          console.log('Persona agregada');
          this.resetForm();
        }).catch(error => {
          console.error('Error al agregar:', error);
        });
      }
    }
  }

  editPersona(persona: Persona): void {
    this.editingId = persona.id!;
    this.personaForm.patchValue({
      nombre: persona.nombre,
      apellido: persona.apellido,
      edad: persona.edad,
      email: persona.email
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deletePersona(id: string): void {
    if (confirm('¿Está seguro de eliminar esta persona?')) {
      this.personaService.deletePersona(id).then(() => {
        console.log('Persona eliminada');
      }).catch(error => {
        console.error('Error al eliminar:', error);
      });
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.personaForm.reset({ edad: 0 });
    this.editingId = null;
  }
}
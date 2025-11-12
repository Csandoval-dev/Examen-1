import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  collectionData, 
  doc, 
  updateDoc, 
  deleteDoc 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Persona {
  id?: string;
  nombre: string;
  apellido: string;
  edad: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private firestore: Firestore = inject(Firestore);
  private personasCollection = collection(this.firestore, 'personas');

  getPersonas(): Observable<Persona[]> {
    return collectionData(this.personasCollection, { idField: 'id' }) as Observable<Persona[]>;
  }

  addPersona(persona: Persona): Promise<any> {
    return addDoc(this.personasCollection, persona);
  }

  updatePersona(id: string, persona: Partial<Persona>): Promise<void> {
    const personaDoc = doc(this.firestore, `personas/${id}`);
    return updateDoc(personaDoc, persona);
  }

  deletePersona(id: string): Promise<void> {
    const personaDoc = doc(this.firestore, `personas/${id}`);
    return deleteDoc(personaDoc);
  }
}
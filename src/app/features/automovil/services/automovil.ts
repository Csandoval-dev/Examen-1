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

export interface Automovil {
  id?: string;
  marca: string;
  modelo: string;
  anio: number;
  color: string;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class AutomovilService {
  private firestore: Firestore = inject(Firestore);
  private automovilesCollection = collection(this.firestore, 'automoviles');

  getAutomoviles(): Observable<Automovil[]> {
    return collectionData(this.automovilesCollection, { idField: 'id' }) as Observable<Automovil[]>;
  }

  addAutomovil(automovil: Automovil): Promise<any> {
    return addDoc(this.automovilesCollection, automovil);
  }

  updateAutomovil(id: string, automovil: Partial<Automovil>): Promise<void> {
    const automovilDoc = doc(this.firestore, `automoviles/${id}`);
    return updateDoc(automovilDoc, automovil);
  }

  deleteAutomovil(id: string): Promise<void> {
    const automovilDoc = doc(this.firestore, `automoviles/${id}`);
    return deleteDoc(automovilDoc);
  }
}
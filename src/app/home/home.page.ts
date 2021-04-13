import { Component } from '@angular/core';
import { FotoService } from '../services/foto.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;
  Judul: string;
  Isi: string;
  Date;
  Nilai: string;
  Path = "";
  constructor(public fotoService:FotoService, private afs : AngularFirestore, private afStorage: AngularFireStorage, private route: Router) {
    this.isiDataColl = afs.collection('Notes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  tambahFoto(){
    this.fotoService.tambahFoto();
    this.Path = this.fotoService.dataFoto.webviewPath;
  }

  simpan(){
    const imgFilePath = `imgStorage/${this.fotoService.dataFoto.filePath}`;
    this.afStorage.upload(imgFilePath, this.fotoService.dataFoto.dataImage).then(() => {
      
    });

    this.isiDataColl.doc(this.Judul).set({
      judul: this.Judul,
      isi: this.Isi,
      date: this.Date,
      nilai: this.Nilai,
      fotoPath: imgFilePath
    });
  }

  hapus(judul){
    this.isiDataColl.doc(judul).delete();
  }

  openPage(judul){
    this.route.navigate(['/detail']);
  }

}

interface data{
  judul: string,
  isi: string,
  date: string,
  nilai: string,
  fotoPath: string
}

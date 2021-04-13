import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  isiData : Observable<data[]>;
  isiDataColl : AngularFirestoreCollection<data>;
  paramJudul = "";
  Isi = "";
  Nilai = "";
  Tanggal = "";
  constructor(private route: Router, private activatedRoute: ActivatedRoute, private afs : AngularFirestore, private afStorage: AngularFireStorage) {
    this.isiDataColl = afs.collection('Notes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('judul')) {
        document.getElementById('semua').style.display = 'none';
      }
      else{
        this.paramJudul = paramMap.get('judul');
        // this.path = this.fotoService.urlImageStorage[this.paramIndex];
      }
    });
  }

}

interface data{
  judul: string,
  isi: string,
  date: string,
  nilai: string,
  fotoPath: string
}
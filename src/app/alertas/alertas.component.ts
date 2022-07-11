import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  @Input() message: string
  @Input() type: string = 'success'

  constructor(
    public modal: BsModalRef,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
  }
  onClose(){
    this.modal.hide()
  }
}

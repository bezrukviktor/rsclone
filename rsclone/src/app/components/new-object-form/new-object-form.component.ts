import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-new-object-form',
  templateUrl: './new-object-form.component.html',
  styleUrls: ['./new-object-form.component.scss']
})
export class NewObjectFormComponent implements OnInit {

  @Output() addNewObject = new EventEmitter<object>();

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 45.899977;
  lng = 6.172652;
  zoom = 12;

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
   }

  ngOnInit(): void {

    this.buildMap();
  }

  buildMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
   this.map.addControl(new mapboxgl.NavigationControl());
  }

  onAddObject(form: NgForm): void {
    const value = form.value;
    this.addNewObject.emit(value);
  }

}

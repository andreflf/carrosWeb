import { Component } from '@angular/core';
import { Menu } from "../menu/menu";
import { RouterOutlet } from "@angular/router";
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-principal',
  imports: [Menu, RouterOutlet, Sidebar],
  templateUrl: './principal.html',
  styleUrl: './principal.scss'
})
export class Principal {

}

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ModalService {
    
  isVisible = false;

  open(timeout: number = 0) {

    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
  
  constructor() { }
}
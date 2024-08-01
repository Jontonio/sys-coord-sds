import { Injectable } from "@angular/core";
import { AcademicCalendar } from "../../features/interface/AcademicCalendar";


@Injectable({
    providedIn:'root',
})
export class CacheService{

    private currectAcademicCalendar!:AcademicCalendar;
    private code_modular_user:string | null;

    constructor(){
      this.code_modular_user = null;
    }

    setCodeModularUser(code:string){
      this.code_modular_user = code;
    }

    getCodeModularUser(){
      return this.code_modular_user;
    }

    setCurrectAcademicCalendar(data: AcademicCalendar) {
      this.currectAcademicCalendar = data;
    }

    getAcademicCalendar() {
      return this.currectAcademicCalendar;
    }

    saveSessionStorage(key:string, data:string){
        sessionStorage.setItem(key, data);
    }

    removeSessionStorage(key:string){
        sessionStorage.removeItem(key);
    }

    getSessionStorage(key:string){
        return sessionStorage.getItem(key);
    }

    saveLocalStorage(key:string, data:string){
        localStorage.setItem(key, data);
    }

    removeLocalStorage(key:string){
        localStorage.removeItem(key);
    }

    getLocalStorage(key:string){
        return localStorage.getItem(key);
    }
}

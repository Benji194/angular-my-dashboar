import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  toSignal } from '@angular/core/rxjs-interop';
import type { User } from '@interfaces/req-response';
import { TitleComponent } from '@shared/title/title.component';
import { switchMap } from 'rxjs';
import { UsersService } from '@services/users.service';

@Component({
  standalone: true,
  imports: [ TitleComponent , CommonModule ],
  template: `
    <app-title [title]="titleLabel() "></app-title>
    @if( user() ){
      <section>
        <img
          [srcset]="user()!.avatar"
          [alt]=" user()!.first_name "
        >

        <div>
          <h3>{{ user()!.first_name }}  {{ user()!.last_name }}</h3>
          <p>{{ user()!.email}}</p>
        </div>
      </section>
    }
    @else{
      <p>Cargando Información </p>
    }
  `,
})
export default class UserComponent {

  // titleLabel = informacion del usuario : Tracey Ramos



  private route = inject (ActivatedRoute);
  private usersServices = inject (UsersService);
  // public user = signal<User |  undefined> (undefined);
  public user = toSignal(
    this.route.params.pipe(
      switchMap(  ( { id } )=> this.usersServices.getUserById(id)   )
    )
  );

  public  titleLabel =  computed(  () =>{
    if (this.user()) {
      return `Informacion del usuario :  ${ this.user()?.first_name } ${ this.user()?.last_name }`;
    }

    return 'Informacion del usuario';
  })
  // constructor(){
    // this.route.params.subscribe( params => {
    //   console.log(params);

    // }
    // )

  // }

}

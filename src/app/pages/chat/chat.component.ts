import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Mensaje } from '../../class/mensaje';
import { User } from '../..//auth/models/user';
import { AuthService } from '../../auth/services/auth.service';
import { ChatService } from '../../services/chat.FIRE.service';
import { UsuariosService } from '../../auth/services/usuarios.service';
import { Usuario } from '../../auth/class/usuario';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewInit {

  @ViewChild('chatMessages') chatMessages!: ElementRef;
  @ViewChild('mensage') messageInput!: ElementRef;


  public currentUser: Usuario = { };

  public userLogged: User = {};
  public messengers: Mensaje[] = [];
  public messenger: Mensaje = {};

  constructor(
    private afAuth: AngularFireAuth,
    private usuariosSv: UsuariosService,
    private chatSv: ChatService,
    private authSv: AuthService) { }

  public getMessengers() {
    this.chatSv.getItems().subscribe(res => {
      this.messengers = res; // = res.slice(0, 6);
    });
  }

  public getUserById(id: string){
    this.authSv.getUserByID(id).subscribe( res => {
    } );
  }

  public saveMensaje(msg: string){
    this.messenger.fecha = new Date().getTime();
    this.messenger.mensaje = msg;
    this.messenger.displayName = this.currentUser.displayName;
    this.messenger.uid = this.userLogged.uid;

    this.chatSv.addItem(this.messenger).then(() => {
        const chatMessagesElement: HTMLElement = this.chatMessages.nativeElement;
        chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;

            // Clear the input field after successful message submission
      this.messageInput.nativeElement.value = ''; // Use the reference
    });

    this.messenger = {};
  }

  private getCurrentUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuariosSv.getItemByUid(user.uid).subscribe((res) => {
          this.currentUser = res;
          this.userLogged.uid = user.uid;
        });
      } else {
        this.currentUser = { email: '', password: '' };
      }
    });
  }

  ngAfterViewInit(): void {
    this.getCurrentUser();
    this.getMessengers();
  }


}

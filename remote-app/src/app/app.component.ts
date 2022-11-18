import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'remote-app';

  lastReceivedMessage = 'none'

  letsDoSomeWorkInTheRemoteComponent(message: string): string {
    console.log("Hello, I was logged via the remote component")
    this.lastReceivedMessage = message
    return "echo from remote: " + message
  }

}

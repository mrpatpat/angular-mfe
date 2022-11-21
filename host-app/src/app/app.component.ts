import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

// lets also build a communication interface to the new component, obviously this is shared knowledge. maybe we can make this better
export interface Mfe1AppComponent {
  letsDoSomeWorkInTheRemoteComponent(message: string): string
}

/**
 * TODO
 *  [x] load a federated module and place a component programmatically into the host
 *  [x] communicate between the host and remote through a defined interface
 *  [] communicate between the host, rahmen and remote in a decoupled fashion without a defined interface
 *  [] find a mechanism (lib, wrapper, etc) to decouple all the knowledge needed to import a federated module from the host or rahmen
 *  [] can we move the whole definition of the communication interface and names into a meta endpoint in the remote service?
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'host-app';

  @ViewChild('placeHolder', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  mfeInstances: Mfe1AppComponent[] = []

  isLoading = true

  async ngOnInit(): Promise<void> {
    await this.load()
  }

  async load(): Promise<void> {
    this.isLoading = true
    // we need to load the module via routing (whole page from remote) or via code (parts only, preferred way for our problem)
    const mfeInstance = await this.loadRemoteInstance();
    this.updateTheMessages(mfeInstance);

    this.isLoading = false
  }

  maskAll() {
    this.mfeInstances.forEach(x => x.letsDoSomeWorkInTheRemoteComponent("******"))
  }

  private async loadRemoteInstance() {
    const m = await import('mfe1/AppComponent');
    const ref = this.viewContainer.createComponent(m.AppComponent);
    return ref.instance as Mfe1AppComponent;
  }

  private updateTheMessages(mfeInstance: Mfe1AppComponent) {
    mfeInstance.letsDoSomeWorkInTheRemoteComponent("I am new")
    this.mfeInstances.forEach(x => x.letsDoSomeWorkInTheRemoteComponent("I am old"))
    this.mfeInstances.push(mfeInstance)
  }
}

import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

// lets also build a communication interface to the new component, obviously this is shared knowledge. maybe we can make this better
export interface Mfe1AppComponent {
  letsDoSomeWorkInTheRemoteComponent(message: string): string
}


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

import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'host-app';

  @ViewChild('placeHolder', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  async load(): Promise<void> {

    // we need to load the module via routing (whole page from remote) or via code (parts only, preferred way for our problem)
    const m = await import('mfe1/AppComponent');
    const ref = this.viewContainer.createComponent(m.AppComponent);
    // const compInstance = ref.instance;
    // compInstance.ngOnInit()
  }
}

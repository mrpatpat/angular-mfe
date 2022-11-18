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

    const m = await import('mfe1/AppComponent');
    const ref = this.viewContainer.createComponent(m.AppComponent);
    // const compInstance = ref.instance;
    // compInstance.ngOnInit()
  }
}

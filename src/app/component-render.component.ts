import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'component-render',
  template: `<ng-template #componentHost></ng-template>`
})
export class RenderComponent implements OnInit {
  @ViewChild('componentHost', { read: ViewContainerRef }) componentHost;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {
    const props = this.route.snapshot.data['name'];

    this.http.get(`app/components/${props}/props.json`)
      .subscribe(data => {
        this.loadComponent(this.route.snapshot.data['comp'], data['inputs']);
      });
  }

  loadComponent(component: any, inputs: any) {
    const viewContainer = this.componentHost;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = viewContainer.createComponent(componentFactory);

    inputs.forEach(input => componentRef.instance[input.key] = input.default);
  }
}

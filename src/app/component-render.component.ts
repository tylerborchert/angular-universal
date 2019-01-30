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
    const buildProps = this.route.snapshot.queryParams;
    const compName = this.route.snapshot.data['name'];
    const comp = this.route.snapshot.data['comp'];

    const renderOptions = this.route.snapshot.queryParams;

    if (!compName || !comp) {
      console.log('no props or component to render!');
      return;
    }

    this.http.get(`app/components/${compName}/props.json`)
      .subscribe(data => {
        this.loadComponent(comp, data['inputs'], buildProps);
      });
  }

  loadComponent(component: any, initialValues: any, buildValues: any) {
    const viewContainer = this.componentHost;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = viewContainer.createComponent(componentFactory);

    // first set the initial values
    initialValues.forEach(input => componentRef.instance[input.key] = input.default);

    // then set the build values
    Object.keys(buildValues)
      .filter(key => key !== 'rendered')
      .forEach(input => componentRef.instance[input] = buildValues[input]);
  }
}

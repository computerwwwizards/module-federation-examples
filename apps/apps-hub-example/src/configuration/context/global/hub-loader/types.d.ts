import { FunctionComponent } from "react";
import { RouteObject } from "react-router";

export interface IHubLoader {
  getHomeData(): Promise<{
    Component: FunctionComponent,
    props?: any;
    name: string;
  }[]>;
  getRoutes(container: any): Promise<RouteObject[]>;
}

declare module '../types' {
  export interface Services {
    hubLoader: IHubLoader
  }
}

export interface HomeLoaderData {
  card: { Component: FunctionComponent, props: any }
}



export interface HomeRouteData {
  Component: FunctionComponent;
  props: any;
  name: string;
}
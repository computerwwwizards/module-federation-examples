import { FunctionComponent } from "react";
import { HomeLoaderData, IHubLoader } from "../types";
import { RouteObject } from "react-router";

import { loadRemote } from "@module-federation/enhanced/runtime";
import { IModuleConfiguration } from "../../module-configuration/types";

export class ModuleFederationHubLoader implements IHubLoader {
  constructor(private readonly moduleFederationConfig: IModuleConfiguration) {
  }

  async getHomeData(): Promise<{ Component: FunctionComponent; props?: any; name: string; }[]> {
    const names = await this.moduleFederationConfig.getModulesNames()
    return await Promise.all(names.map(async (name) => {
      const { card } = await loadRemote(name) as HomeLoaderData;

      return {
        Component: card.Component,
        props: card.props,
        name
      }
    }))
  }
  async getRoutes(container: any): Promise<RouteObject[]> {
    const names = await this.moduleFederationConfig.getModulesNames()

    const routes = await Promise.all(names
      .map(async (name) => {
        const { createRoutes } = await loadRemote(name) as { createRoutes: (container: any) => RouteObject[] };

        return createRoutes(container);
      })
    )

    return routes.flat()
  }

}
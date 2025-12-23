import { Ctx } from "../types";
import { IModuleConfiguration } from '../module-configuration/types'

import { ModuleFederationHubLoader } from "./services/ModuleFederationHubLoader";
import { MockHubLoader } from "./services/MockHubLoader";



export default function plugin(ctx: Ctx) {
  ctx.bind('hubLoader', {
    resolveDependencies(ctx) {
      return ctx.get('moduleConfiguration')
    },
    provider(deps: IModuleConfiguration) {
      return new ModuleFederationHubLoader(deps);
    },
  })
}


export function mock(ctx: Ctx) {
  ctx.bind('hubLoader', {
    provider() {
      return new MockHubLoader();
    },
  })

}

plugin.mock = mock


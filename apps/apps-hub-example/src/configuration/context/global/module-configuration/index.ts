import { Ctx } from "../types";
import { DevModuleConfigutration } from "./services/DevModuleConfiguration";
import { MockModuleConfiguration } from "./services/MockModuleConfiguration";



export default function plugin(ctx:Ctx ){
  ctx.bind('moduleConfiguration', {
    provider() {
      return new DevModuleConfigutration()
    },
  })
}


export function mock(ctx:Ctx ){
  ctx.bind('moduleConfiguration', {
    provider(){
      return new MockModuleConfiguration();
    }
  })

}

plugin.mock = mock


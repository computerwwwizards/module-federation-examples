import { wait } from "../../../../../utils";
import { IModuleConfiguration, Remote } from "../types";

export class MockModuleConfiguration implements IModuleConfiguration {
  async getModulesNames(): Promise<string[]> {
    await wait()

    return ['someModule']
  }
  async getModulesConfig(): Promise<Remote[]> {
    await wait()

    return [
      {
        name: 'someModule',
        entry: 'some-url',
        version: '1'
      }
    ]
  }

}
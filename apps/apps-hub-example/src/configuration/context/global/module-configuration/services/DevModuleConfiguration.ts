import { IModuleConfiguration, Remote } from "../types";

export class DevModuleConfigutration implements IModuleConfiguration {
  getModulesNames(): Promise<string[]> {
    return Promise.resolve(['federatedCalculatorExample'])
  }
  getModulesConfig(): Promise<Remote[]> {
    return Promise.resolve([
      {
        name: 'federatedCalculatorExample',
        version: '1',
        entry: 'http://localhost:3002/mf-manifest.json'
      }
    ])
  }

}
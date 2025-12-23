import { ModuleFederation } from "@module-federation/enhanced/runtime";

export type Remote = Parameters<ModuleFederation['registerRemotes']>[0][number]

export interface IModuleConfiguration  {
  getModulesNames(): Promise<string[]>;
  getModulesConfig(): Promise<Remote[]>;
}

declare module '../types' {
  export interface Services{
    moduleConfiguration: IModuleConfiguration
  }
}

import { 
  ChildPreProcessDependencyContainerWithUse, 
  PlainObject, 
  PreProcessDependencyContainerWithUse 
} from "@computerwwwizards/dependency-injection";

export class Container<T extends PlainObject> extends PreProcessDependencyContainerWithUse<T>{
  private usingMocks  = false;
  
  /**
   * 
   * If the plugin passed has a mock, now that is used
   * it is not retoractive, it only affects to registration of plugins
   * below the invocation of this method
   * 
   * If the callback doest have a mock callback, the original 
   * callback is used
   * 
   * @example
   * 
   * const plugin = (ctx)=>{
   *    throw new Error("not implemented")
   * }
   * 
   * plugin.mock = (ctx)=>{
   *    ctx.bind("someToken", {
   *      provider(){
   *        return {
   *          // some mock implementation
   *        }
   *      }
   *    })
   * }
   * 
   * const container = new Container();
   * 
   * // will work
   * container
   *  .useMocks()
   *  .use(plugin)
   * 
   * // will throw an error
   * container
   *   .use(plugin)
   *   .useMocks()
   */
  useMocks(){
    this.usingMocks = true;

    return this;
  }

  override use(...args: (((ctx: this)=>void) & { mock? :((ctx: Container<T>)=>void)})[]){
    super.use(...(this.usingMocks ? (args.map((cb)=>cb.mock ?? cb)) : args));

    return this;
  }
}

export class ChildContainer<
  T extends PlainObject, 
  R extends PlainObject
> extends ChildPreProcessDependencyContainerWithUse<T, R>{
  private usingMocks  = false;
  
  useMocks(){
    this.usingMocks = true;

    return this;
  }

  override use(...args: (((ctx: this)=>void) & { mock? :((ctx: ChildContainer<T, R>)=>void)})[]){
    super.use(...(this.usingMocks ? (args.map((cb)=>cb.mock ?? cb)) : args));

    return this;
  }
}

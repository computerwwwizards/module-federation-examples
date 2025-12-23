import { Outlet, RouteObject } from "react-router";
import { Ctx } from "../configuration/context/global/types";


export interface CreateRouteOptions {
  externalRootChildren?: RouteObject[];
  globalContainer: Ctx;
}

export const createRoutes =({
  externalRootChildren,
  globalContainer,
}: CreateRouteOptions): RouteObject[]=> [
  {
    Component: ()=>{
      return <div className="flex flex-col min-h-screen bg-[#191919] text-white" >
        <header className="flex justify-end border-b-2 border-violet-400">
          Welcome to utilities
        </header>
        <Outlet />
      </div>
    },
    children: [
      {
        path: '/',
        HydrateFallback: ()=>'Loading index',
        async lazy(){
          const [component , cards ] = await Promise.all([
            import('../pages/(home)'),
            globalContainer.get('hubLoader').getHomeData()
          ])

          return {
            Component: component.default,
            loader(){
              return {
                cards
              }
            }
          }
        }
      },  
      ...(externalRootChildren ?? []),
      {
        path: '/about',
        async lazy(){
          return {
            Component: (await import('../pages/about')).default
          } 
        }
      }
    ]
  }
]
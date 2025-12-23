import { createContext, Suspense, use, useMemo } from 'react';
import './App.css';

import moduleConfigurationplugin from './configuration/context/global/module-configuration';
import { Ctx, Services } from './configuration/context/global/types';
import { registerRemotes } from '@module-federation/enhanced/runtime';
import hubLoaderPlugin from './configuration/context/global/hub-loader';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { createRoutes } from './routes';
import { Container } from './services/Container';


const ServicesContext = createContext<Ctx>(null!)


function MainRouter({
  promise
}: { promise: Promise<any>}){
  const router = use(promise);

  return <RouterProvider router={router} />

}

const App = () => {
  const globalContainer = useMemo(()=>{
    const container = new Container<Services>();

    return container
      .useMocks()
      .use(moduleConfigurationplugin)
      .use(hubLoaderPlugin)
  }, []);


  const routePromise = useMemo(async()=>{
    const remotes = await globalContainer.get('moduleConfiguration').getModulesConfig();

    registerRemotes(remotes, {
      force: true
    })


    const externalRootChildren = await globalContainer.get('hubLoader').getRoutes({})
    const routes = createRoutes({
      globalContainer,
      externalRootChildren
    })

    const router  = createBrowserRouter(routes)

    return router

  }, [globalContainer])

  return (
    <ServicesContext 
      value={globalContainer} 
    >
      <Suspense fallback={"Getting config"} >
        <MainRouter promise={routePromise}  />
      </Suspense>
    </ServicesContext> 
  );
};

export default App;

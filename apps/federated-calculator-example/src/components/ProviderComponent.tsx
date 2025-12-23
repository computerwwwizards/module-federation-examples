
import './ProviderComponent.css';
import { Link, RouteObject } from 'react-router';

export const card = {
  Component: ()=><div className='grid'>
    Calculator app
    <Link to="./calculator">
      Go
    </Link>
  </div>,
  props: {},

}

export const createRoutes = (): RouteObject[]=>{
  return [
    {
      path: '/calculator',
      children: [
        {
          index: true,
          lazy: async ()=>{
            return {
              Component: (await import('./calculator')).Calculator
            }
          }
        },
        {
          path: 'scientific',
          Component: ()=><div>In construccion</div>
        }
      ]
    }
  ]
}



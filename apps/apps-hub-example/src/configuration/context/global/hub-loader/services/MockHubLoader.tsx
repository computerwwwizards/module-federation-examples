import { FunctionComponent } from "react";
import { Link, RouteObject } from "react-router";
import { IHubLoader } from "../types";
import { wait } from "../../../../../utils";

export class MockHubLoader implements IHubLoader {
  async getHomeData(): Promise<{ Component: FunctionComponent; props?: any; name: string; }[]> {
    await wait();
    return [
      {
        Component: () => <div className="grid gap-4">
          I Am a test card
          <Link to="./test">Go to sub app</Link>
        </div>,
        name: 'Test card',
      },
      {
        Component: () => <div className="grid gap-4">
          Another test card
          <Link to="./another-test">Go to sub app</Link>
        </div>,
        name: 'Another thest card'
      }
    ]
  }
  async getRoutes(_container: any): Promise<RouteObject[]> {
    await wait()
    return [
      {
        path: '/test',

        children: [
          {
            index: true,
            Component: () => <main className="grid">
              I am a test route
              <Link to="./inner-test">
                Go to inner app
              </Link>
            </main>,
          },
          {
            path: 'inner-test',
            Component: () => <main>
              I am a inner test
            </main>
          }
        ]
      },
      {
        path: '/another-test',
        Component: () => <main>
          I am another test content
        </main>
      }
    ]
  }

}
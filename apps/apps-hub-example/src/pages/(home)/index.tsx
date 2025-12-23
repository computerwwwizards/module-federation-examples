import { useLoaderData } from "react-router"
import { HomeRouteData } from "../../configuration/context/global/hub-loader/types"

export default function Page() {

  const { cards }: { cards: HomeRouteData[] } = useLoaderData();
  return <main className="flex flex-wrap gap-8">
    {
      cards.map(({
        Component,
        name,
        props
      }) => <div 
          key={name} 
          className="grid place-content-center border-2 border-emerald-400 bg-[#262626]"
        >
          <Component {...props} />
        </div>)
    }
  </main>
}
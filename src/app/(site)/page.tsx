import { CardItem } from './card-item'
import { items } from './data'

const Home = () => {
  return (
    <div className="px-4 py-2 select-none flex flex-col gap-y-10 animate-fade-in">
      {items.map((item) => (
        <CardItem key={item.id} {...item} />
      ))}
    </div>
  )
}

export default Home

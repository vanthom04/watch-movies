import { listMovie } from '~/_mock'
import CardItem from './card-item'

const HomePage = () => {
  return (
    <div className="w-full h-full select-none flex flex-col gap-y-10 animate-fade-in">
      {listMovie.map((item) => (
        <CardItem key={item.id} data={item} />
      ))}
    </div>
  )
}

export default HomePage

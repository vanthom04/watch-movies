import { listMovie } from '@/_mock'
import ButtonScrollToTop from '@/components/button-scroll-to-top'
import CardItem from './components/card-item'

const Home = () => {
  return (
    <div className="w-full h-full select-none flex flex-col gap-y-10 animate-fade-in">
      {listMovie.map((item) => (
        <CardItem key={item.id} data={item} />
      ))}
      <ButtonScrollToTop />
    </div>
  )
}

export default Home

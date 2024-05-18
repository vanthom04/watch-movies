import { Movie } from '~/types'

interface WatchingContentProps {
  movie: Movie | undefined
}

const WatchingContent: React.FC<WatchingContentProps> = ({ movie }) => {
  if (!movie) return null

  return (
    <div className="my-4 text-white">
      <h1 className="text-2xl mb-3">{movie.name}</h1>
      <h2 className="text-base mb-2">{movie.origin_name}</h2>
      <p className="text-sm font-light">{movie.content}</p>
    </div>
  )
}

export default WatchingContent

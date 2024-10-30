import { cn } from '@/lib/utils'

interface SpinnerProps {
  size?: number
  className?: string
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, className }) => {
  return (
    <div role="status">
      <svg
        fill="none"
        width={size}
        height={size}
        className={cn('animate-spin text-white', className)}
        viewBox="0 0 25 25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 12.5C4.5 16.9183 8.08172 20.5 12.5 20.5C16.9183 20.5 20.5 16.9183 20.5 12.5C20.5 8.08172 16.9183 4.5 12.5 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Spinner

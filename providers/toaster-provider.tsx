import { Toaster } from 'react-hot-toast'

const ToasterProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          backgroundColor: '#fff',
          color: '#333'
        }
      }}
    />
  )
}

export default ToasterProvider

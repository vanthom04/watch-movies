import Header from './header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen font-Roboto px-4 sm:px-10 md:px-12 lg:px-20">
      <Header />
      <main className="py-4">{children}</main>
    </div>
  )
}

export default Layout

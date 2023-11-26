import { Roboto } from 'next/font/google'
import './globals.css'
// import Navbar from '../../src/components/Layout/Navbar'
import NavbarResponsive from '../../src/components/Layout/NavbarResponsive'
import Footer from '../../src/components/Layout/Footer'
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
import {AppProvider} from '../components/AppContext'
import {Toaster} from "react-hot-toast"
export const metadata = {
  title: 'Pizza Now',
  description: 'Developed By Umair',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-5xl mx-auto p-4 ">
         
          <AppProvider>
          <Toaster />
          <NavbarResponsive />
            {children}
            <Footer />
          </AppProvider>
        </main>

      </body>
    </html>
  )
}

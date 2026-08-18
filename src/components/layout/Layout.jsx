import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SideWidget from './SideWidget'
import ScrollToTop from '@/components/ScrollToTop'
import { OrganizationJsonLd } from '@/components/Seo'
import { COMPANY } from '@/data/site'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <OrganizationJsonLd company={COMPANY} />
      <Header />
      <SideWidget />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      
      <div className="pb-14 md:pb-0">
        <Footer />
      </div>
    </div>
  )
}

import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'

const Models = lazy(() => import('@/pages/Models'))
const ModelDetail = lazy(() => import('@/pages/ModelDetail'))
const Stock = lazy(() => import('@/pages/Stock'))
const StockDetail = lazy(() => import('@/pages/StockDetail'))
const UsedCars = lazy(() => import('@/pages/UsedCars'))
const About = lazy(() => import('@/pages/About'))
const News = lazy(() => import('@/pages/News'))
const NewsDetail = lazy(() => import('@/pages/NewsDetail'))
const TestDrive = lazy(() => import('@/pages/TestDrive'))
const Service = lazy(() => import('@/pages/Service'))
const Contacts = lazy(() => import('@/pages/Contacts'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const NotFound = lazy(() => import('@/pages/NotFound'))


function PageFallback() {
  return (
    <div className="shell flex min-h-[50vh] items-center justify-center py-20">
      <span className="text-sm text-steel-400" role="status">
        Yüklənir…
      </span>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route
          path="models"
          element={
            <Suspense fallback={<PageFallback />}>
              <Models />
            </Suspense>
          }
        />
        <Route
          path="models/:slug"
          element={
            <Suspense fallback={<PageFallback />}>
              <ModelDetail />
            </Suspense>
          }
        />

        <Route
          path="stock"
          element={
            <Suspense fallback={<PageFallback />}>
              <Stock />
            </Suspense>
          }
        />
        <Route
          path="stock/:id"
          element={
            <Suspense fallback={<PageFallback />}>
              <StockDetail />
            </Suspense>
          }
        />
        <Route
          path="used"
          element={
            <Suspense fallback={<PageFallback />}>
              <UsedCars />
            </Suspense>
          }
        />

        <Route
          path="about"
          element={
            <Suspense fallback={<PageFallback />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="news"
          element={
            <Suspense fallback={<PageFallback />}>
              <News />
            </Suspense>
          }
        />
        <Route
          path="news/:slug"
          element={
            <Suspense fallback={<PageFallback />}>
              <NewsDetail />
            </Suspense>
          }
        />

        <Route
          path="test-drive"
          element={
            <Suspense fallback={<PageFallback />}>
              <TestDrive />
            </Suspense>
          }
        />
        <Route
          path="service"
          element={
            <Suspense fallback={<PageFallback />}>
              <Service />
            </Suspense>
          }
        />
        <Route
          path="contacts"
          element={
            <Suspense fallback={<PageFallback />}>
              <Contacts />
            </Suspense>
          }
        />
        <Route
          path="privacy"
          element={
            <Suspense fallback={<PageFallback />}>
              <Privacy />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<PageFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

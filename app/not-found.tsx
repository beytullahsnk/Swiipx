import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-32 pb-20">
      <div className="text-center max-w-md">
        <p className="text-8xl font-black text-gray-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Page non trouvée
        </h1>
        <p className="text-gray-600 mb-8">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Voir le blog
          </Link>
        </div>
      </div>
    </div>
  )
}

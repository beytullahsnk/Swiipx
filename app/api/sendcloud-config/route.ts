import { NextResponse } from 'next/server'

/**
 * Renvoie uniquement la clé publique Sendcloud au client.
 * Permet au widget Service Point Picker de fonctionner sans avoir
 * à exposer la clé via NEXT_PUBLIC_* (donc absente du bundle JS statique).
 *
 * La clé secrète reste server-only et n'est jamais renvoyée.
 */
export async function GET() {
  // Accepte les 2 noms possibles (rétrocompat avec l'ancienne config NEXT_PUBLIC_*)
  const publicKey =
    process.env.SENDCLOUD_PUBLIC_KEY ||
    process.env.NEXT_PUBLIC_SENDCLOUD_PUBLIC_KEY

  if (!publicKey) {
    console.error('[sendcloud-config] SENDCLOUD_PUBLIC_KEY env var is missing')
    return NextResponse.json(
      { error: 'Sendcloud not configured' },
      { status: 503 }
    )
  }

  return NextResponse.json(
    { publicKey },
    {
      headers: {
        // Cache 1h côté client + CDN — la clé ne change pas souvent
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    }
  )
}

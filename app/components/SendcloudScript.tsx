'use client'

import Script from 'next/script'

export default function SendcloudScript() {
  return (
    <Script
      src="https://embed.sendcloud.sc/spp/1.0.0/api.min.js"
      strategy="afterInteractive"
    />
  )
}

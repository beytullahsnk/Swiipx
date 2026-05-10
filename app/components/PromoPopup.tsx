'use client'

import { BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface PromoPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function PromoPopup({ isOpen, onClose }: PromoPopupProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mémoriser que le popup a été montré
  useEffect(() => {
    if (!isOpen) return
    sessionStorage.setItem('swiipx-promo-popup-shown', 'true')
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Veuillez entrer un email valide.')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/ebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        toast.success('Guide envoyé ! Vérifiez votre boîte mail 📬')
      } else {
        toast.error("Erreur lors de l'envoi. Réessayez.")
      }
    } catch {
      toast.error('Erreur réseau. Réessayez.')
    }

    setIsSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader className="text-center sm:text-center">
          {/* Badge */}
          <div className="flex justify-center mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary bg-blue-50 px-3 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              Guide gratuit
            </span>
          </div>

          <DialogTitle className="text-center">
            3x plus d&apos;avis Google en 30 jours
          </DialogTitle>
          <DialogDescription className="text-center">
            Recevez notre e-book gratuit avec les méthodes pour booster vos avis Google rapidement.
          </DialogDescription>
        </DialogHeader>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.fr"
            required
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Recevoir le guide gratuit'}
          </Button>
        </form>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="w-full text-gray-400 hover:text-gray-600 mt-1"
        >
          Non merci
        </Button>

        <p className="text-xs text-gray-400 text-center mt-2">
          Pas de spam. Désinscription en un clic.
        </p>
      </DialogContent>
    </Dialog>
  )
}

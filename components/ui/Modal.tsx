'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
  /** Prevent closing on backdrop click */
  persistent?: boolean
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  persistent = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      dialog.close()
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key (default dialog behaviour)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleCancel = (e: Event) => {
      if (persistent) e.preventDefault()
      else onClose()
    }

    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [onClose, persistent])

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if (!persistent && e.target === dialogRef.current) onClose()
      }}
      className={cn(
        // Reset dialog defaults
        'p-0 m-auto border-none outline-none rounded-2xl',
        'bg-sage-tint shadow-lg',
        'w-full max-w-md',
        // Backdrop
        'backdrop:bg-ink/60 backdrop:backdrop-blur-sm',
        className
      )}
    >
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-soft-sage">
          <h2 className="font-heading font-bold text-lg text-ink">{title}</h2>
          {!persistent && (
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="size-8 flex items-center justify-center rounded-lg text-slate hover:text-ink hover:bg-leaf-wash transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Body */}
      <div className="p-6">{children}</div>
    </dialog>
  )
}

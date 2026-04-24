import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  as?: React.ElementType
}

export function Card({
  children,
  className,
  hover = false,
  padding = 'md',
  as: Tag = 'div',
}: CardProps) {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <Tag
      className={cn(
        'bg-sage-tint border border-soft-sage rounded-xl shadow-sm',
        'transition-shadow duration-250',
        hover && 'hover:shadow-md cursor-pointer',
        paddings[padding],
        className
      )}
    >
      {children}
    </Tag>
  )
}

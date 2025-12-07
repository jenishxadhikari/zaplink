import { useEffect, useState } from 'react'

import { Check, Copy, Eye, EyeOff, TrendingUp } from 'lucide-react'

import { env } from '@/config/env'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { DeleteLinkDialog } from '@/features/links/components/delete-link-dialog'
import { UpdateLinkDialog } from '@/features/links/components/update-link-dialog'
import { socket } from '@/hooks/use-socket'
import { useAuthContext } from '@/context/auth-provider'

interface LinkCardProps {
  id: string
  title: string | undefined
  shortUrlKey: string
  originalUrl: string
  isActive: boolean
  clicks: number
  createdAt: string
}

export function LinkCard({
  id,
  title,
  shortUrlKey,
  originalUrl,
  isActive,
  clicks,
  createdAt
}: LinkCardProps) {
  const { session } = useAuthContext()
  if (!session) {
    return null
  }

  useEffect(() => {
    socket.auth = { userId: session.user.id }
  }, [session.user.id])
  
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [count, setCount] = useState(clicks)

  const copyToClipboard = (text: string, linkId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(linkId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  useEffect(() => {
    const listener = (data: { shortUrlKey: string, clicks: number }) => {
      if (shortUrlKey === data.shortUrlKey) {
        setCount(data.clicks)
      }
    }

    socket.on('click-updated', listener)

    return () => {
      socket.off('click-updated', listener)
    }
  }, [shortUrlKey])

  return (
    <Card
      key={id}
      className={`hover:border-primary/40 border backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${isActive ? 'bg-card/80 border-border' : 'bg-card/60 border-border/50 opacity-75'
        }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="line-clamp-1 text-lg">
              {title?.length === 0 ? shortUrlKey : title}
            </CardTitle>
          </div>
          {isActive ? (
            <Badge variant="default" className="whitespace-nowrap">
              <Eye className="mr-1 h-3 w-3" />
              Active
            </Badge>
          ) : (
            <Badge variant="secondary" className="whitespace-nowrap">
              <EyeOff className="mr-1 h-3 w-3" />
              Inactive
            </Badge>
          )}
        </div>
        <CardDescription className="line-clamp-2 text-xs">{originalUrl}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Short URL Section */}
        <div className="bg-accent/5 border-border/50 rounded-lg border p-3">
          <p className="text-muted-foreground mb-1 text-xs font-medium">Short URL</p>
          <div className="flex items-center gap-2">
            <a
              href={`${env.BASE_URL}/${shortUrlKey}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary truncate font-mono text-sm hover:underline"
            >
              {env.BASE_URL}/r/{shortUrlKey}
            </a>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 shrink-0 p-0"
              onClick={() => copyToClipboard(`${env.BASE_URL}/${shortUrlKey}`, id)}
            >
              {copiedId !== id ? (
                <Copy className="text-muted-foreground" />
              ) : (
                <Check className="text-green-500" />
              )}
            </Button>
            <UpdateLinkDialog shortUrlKey={shortUrlKey} />
            <DeleteLinkDialog shortUrlKey={shortUrlKey} />
          </div>
        </div>

        {/* Stats Row */}
        <div className="border-border/50 flex items-center justify-between border-t pt-2">
          <div>
            <p className="text-muted-foreground text-xs font-medium">Clicks</p>
            <div className="mt-1 flex items-center gap-1.5">
              <TrendingUp className="text-chart-1/70 h-4 w-4" />
              <p className="text-foreground text-2xl font-bold">{count}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-xs font-medium">Created</p>
            <p className="text-foreground/70 mt-1 text-sm">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export function TwoFACard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Two Factor Authentication</CardTitle>
        <CardDescription>Enable Two Factor Authentication</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-center gap-2">
        <Switch id="2fa-mode" />
        <Label htmlFor="2fa-mode">2FA Mode</Label>
      </CardContent>
    </Card>
  )
}

import { useAuthContext } from '@/context/auth-provider'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ModeToggle } from '@/components/mode-toggle'

export default function Settings() {
  const { session } = useAuthContext()
  if (!session) {
    return null
  }
  return (
    <div className="flex-1 space-y-6 p-4">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details and profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  value={session.user.name}
                  className="disabled:opacity-100"
                  autoComplete="off"
                  disabled
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={session.user.email}
                  className="disabled:opacity-100"
                  autoComplete="off"
                  disabled
                />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
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
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Set the theme for the system</CardDescription>
            </CardHeader>
            <CardContent>
              <ModeToggle />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

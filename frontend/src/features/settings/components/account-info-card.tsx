import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface AccountCardProps {
  name: string
  email: string
}

export function AccountInfoCard({ name, email }: AccountCardProps) {
  return (
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
              value={name}
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
              value={email}
              className="disabled:opacity-100"
              autoComplete="off"
              disabled
            />
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { useAuthContext } from '@/context/auth-provider'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { originalUrlSchema } from '@/features/home/schema'

export function ZapItForm() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthContext()

  const form = useForm<z.infer<typeof originalUrlSchema>>({
    resolver: zodResolver(originalUrlSchema),
    defaultValues: {
      originalUrl: ''
    }
  })

  async function onSubmit(data: z.infer<typeof originalUrlSchema>) {
    const { originalUrl } = data

    sessionStorage.setItem('originalUrl', originalUrl)

    if (originalUrl !== '') {
      if (isAuthenticated) {
        navigate(`/dashboard`)
      } else {
        navigate(`/login?redirectTo=/dashboard`)
      }
    }
  }

  const isPending = form.formState.isSubmitting

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="border-primary/80 mx-auto flex max-w-md gap-0.5 rounded-md border-2 p-1 font-mono"
    >
      <FieldGroup className="gap-5">
        <Controller
          name="originalUrl"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Paste your long url."
                disabled={isPending}
                className="border-0 focus-visible:ring-0"
              />
              {fieldState.invalid && <FieldError className="pl-3" errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit">Zap It</Button>
    </form>
  )
}

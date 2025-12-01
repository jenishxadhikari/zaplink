import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { forgotPasswordMutation } from '@/lib/api'
import { cn } from '@/lib/utils'

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ErrorAlert } from '@/components/error-alert'
import { SubmitButton } from '@/components/submit-button'
import { SuccessAlert } from '@/components/success-alert'

import { forgotPasswordSchema } from '@/features/auth/schema'

import { AuthWrapper } from './auth-wrapper'

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordMutation
  })

  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    setError(null)
    setSuccess(null)
    mutate(data, {
      onSuccess: (response) => {
        setSuccess(response.data.message)
        form.reset()
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message)
        } else {
          setError('Something went wrong')
        }
      }
    })
  }

  return (
    <div className={cn('mx-auto flex max-w-sm flex-col items-center gap-6', className)} {...props}>
      <AuthWrapper
        title="Reset your password"
        description="Enter the email address associated with your account and we'll send you a link to reset your password."
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="jenish@example.com"
                    type="email"
                    autoComplete="off"
                    disabled={isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            {!!success && <SuccessAlert message={success} />}
            {!!error && <ErrorAlert message={error} />}
            <Field>
              <SubmitButton label="Send Mail" pending={isPending} />
              <FieldDescription className="text-center">
                Return to login? <Link to="/login">Login</Link>
              </FieldDescription>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link to="/register">Create Account</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </AuthWrapper>
    </div>
  )
}

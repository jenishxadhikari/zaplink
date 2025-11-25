import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { cn } from '@/lib/utils'

import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { ErrorAlert } from '@/components/error-alert'
import { SubmitButton } from '@/components/submit-button'
import { SuccessAlert } from '@/components/success-alert'

import { verifyOTPSchema } from '@/features/auth/schema'

import { AuthWrapper } from './auth-wrapper'

export function VerifyOTPForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm<z.infer<typeof verifyOTPSchema>>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      otp: ''
    }
  })

  async function onSubmit(data: z.infer<typeof verifyOTPSchema>) {
    setError(null)
    setSuccess(null)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(data)
        resolve(true)
      }, 2000)
    })
  }

  const isPending = form.formState.isSubmitting

  return (
    <div className={cn('mx-auto flex max-w-sm flex-col items-center gap-6', className)} {...props}>
      <AuthWrapper
        title="Enter verification code"
        description="We sent a 6-digit code to your email."
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            <Controller
              name="otp"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Verification Code</FieldLabel>
                  <InputOTP
                    maxLength={6}
                    id={field.name}
                    {...field}
                    aria-invalid={fieldState.invalid}
                    disabled={isPending}
                  >
                    <InputOTPGroup className="gap-5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            {!!success && <SuccessAlert message={success} />}
            {!!error && <ErrorAlert message={error} />}
            <Field>
              <SubmitButton label="Verify" pending={isPending} />
              <FieldDescription className="text-center">
                Return to login? <Link to="/login">Login</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </AuthWrapper>
    </div>
  )
}

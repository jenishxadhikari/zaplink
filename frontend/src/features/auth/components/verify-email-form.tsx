import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

import { Field, FieldDescription } from '@/components/ui/field'
import { ErrorAlert } from '@/components/error-alert'
import { SubmitButton } from '@/components/submit-button'
import { SuccessAlert } from '@/components/success-alert'

import { AuthWrapper } from './auth-wrapper'

export function VerifyEmailForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm()

  async function onSubmit() {
    setError(null)
    setSuccess(null)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Verify Email')
        resolve(true)
      }, 2000)
    })
  }

  const isPending = form.formState.isSubmitting

  return (
    <div className={cn('mx-auto flex max-w-sm flex-col items-center gap-6', className)} {...props}>
      <AuthWrapper
        title="Verify Email"
        description="Please click the button below to verify your email."
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {!!success && <SuccessAlert message={success} />}
          {!!error && <ErrorAlert message={error} />}
          <Field>
            <SubmitButton label="Verify" pending={isPending} />
            <FieldDescription className="text-center">
              Return to login? <Link to="/login">Login</Link>
            </FieldDescription>
          </Field>
        </form>
      </AuthWrapper>
    </div>
  )
}

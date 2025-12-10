import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'

import { verifyEmailMutation } from '@/lib/api'
import { cn } from '@/lib/utils'

import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
import { ErrorAlert } from '@/components/error-alert'
import { SubmitButton } from '@/components/submit-button'
import { SuccessAlert } from '@/components/success-alert'

import { AuthWrapper } from './auth-wrapper'

export function VerifyEmailForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  if (!token) {
    return null
  }
  const safeToken = token as string

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const form = useForm()

  const { mutate, isPending } = useMutation({
    mutationFn: (token: string) => verifyEmailMutation(token)
  })

  async function onSubmit() {
    setError(null)
    setSuccess(null)
    mutate(safeToken, {
      onSuccess: (response) => {
        setSuccess(response.message)
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
        title="Verify Email"
        description="Please click the button below to verify your email."
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
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

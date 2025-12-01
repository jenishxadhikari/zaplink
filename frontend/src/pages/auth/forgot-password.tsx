import { MaxWidthWrapper } from '@/components/max-width-wrapper'

import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form'

export default function ForgotPassword() {
  return (
    <section className="py-4 md:py-8">
      <MaxWidthWrapper>
        <ForgotPasswordForm />
      </MaxWidthWrapper>
    </section>
  )
}

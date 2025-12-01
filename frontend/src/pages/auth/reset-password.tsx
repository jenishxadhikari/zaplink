import { MaxWidthWrapper } from '@/components/max-width-wrapper'

import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'

export default function ResetPassword() {
  return (
    <section className="py-4 md:py-8">
      <MaxWidthWrapper>
        <ResetPasswordForm />
      </MaxWidthWrapper>
    </section>
  )
}

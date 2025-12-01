import { MaxWidthWrapper } from '@/components/max-width-wrapper'

import { VerifyEmailForm } from '@/features/auth/components/verify-email-form'

export default function VerifyEmail() {
  return (
    <section className="py-4 md:py-8">
      <MaxWidthWrapper>
        <VerifyEmailForm />
      </MaxWidthWrapper>
    </section>
  )
}

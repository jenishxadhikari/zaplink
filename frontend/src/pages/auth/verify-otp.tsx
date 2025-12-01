import { MaxWidthWrapper } from '@/components/max-width-wrapper'

import { VerifyOTPForm } from '@/features/auth/components/verify-otp-form'

export default function VerifyOTP() {
  return (
    <section className="py-4 md:py-8">
      <MaxWidthWrapper>
        <VerifyOTPForm />
      </MaxWidthWrapper>
    </section>
  )
}

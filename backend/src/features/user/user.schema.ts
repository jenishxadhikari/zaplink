import z from 'zod'

const safeUserSchema = z.object({
  id: z.string({ error: 'Id is required.' }),
  name: z.string({ error: 'Name is required.' }),
  email: z.string({ error: 'Email is required.' }),
  isVerified: z.boolean({ error: 'Is Verified is required.' }),
  is2FAEnabled: z.boolean({ error: 'Is 2FA Enabled is required.' }),
  createdAt: z.date({ error: 'Created At is required.' }),
  updatedAt: z.date({ error: 'Updated At is required.' })
})

export const UserSchema = {
  safeUserSchema
}

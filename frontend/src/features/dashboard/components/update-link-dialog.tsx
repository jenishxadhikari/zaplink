import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { ErrorAlert } from '@/components/error-alert'
import { SubmitButton } from '@/components/submit-button'

import { updateLinkSchema } from '@/features/dashboard/schema'

export function UpdateLinkDialog() {
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof updateLinkSchema>>({
    resolver: zodResolver(updateLinkSchema),
    defaultValues: {
      title: '',
      isActive: false
    }
  })

  const isPending = form.formState.isSubmitting

  async function onSubmit(data: z.infer<typeof updateLinkSchema>) {
    setError(null)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(data)
        resolve(true)
      }, 2000)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="h-7 w-7 shrink-0 p-0">
          <Edit className="text-green-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Create New Short Link</DialogTitle>
            <DialogDescription>
              Create a new short link to track clicks and analytics
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="gap-5">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Title <span className="text-xs">(Optional)</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Eg. My Youtube Channel"
                    disabled={isPending}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="isActive"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-row">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    disabled={isPending}
                    className="w-8!"
                  />
                  <FieldLabel htmlFor={field.name}>Active</FieldLabel>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            {!!error && <ErrorAlert message={error} />}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <SubmitButton label="Update Link" className="w-full md:w-fit" pending={isPending} />
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}

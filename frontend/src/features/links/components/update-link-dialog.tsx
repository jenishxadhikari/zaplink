import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Edit } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getLinkQuery, updateLinkMutation } from '@/lib/api'

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

import { updateLinkSchema } from '@/features/links/schema'

export function UpdateLinkDialog({ shortUrlKey }: { shortUrlKey: string }) {
  const [searchParams] = useSearchParams()
  let page = searchParams.get('page') ?? 1
  page = Number(page)

  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof updateLinkSchema>>({
    resolver: zodResolver(updateLinkSchema),
    defaultValues: {
      title: '',
      isActive: false
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: updateLinkMutation
  })

  const { data, refetch } = useQuery({
    queryFn: () => getLinkQuery(shortUrlKey),
    queryKey: ['updateLink', shortUrlKey]
  })

  function handleOpenChange(state: boolean) {
    setOpen(state)
    if (state) {
      const d = data?.data
      form.reset({
        title: d?.title,
        isActive: d?.isActive
      })
    }
  }

  async function onSubmit(data: z.infer<typeof updateLinkSchema>) {
    const payload = {
      shortUrlKey,
      data
    }
    setError(null)
    mutate(payload, {
      onSuccess: (response) => {
        toast.success(response.message)
        form.reset()
        queryClient.invalidateQueries({ queryKey: ['links', page] })
        refetch()
        setOpen(false)
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="h-7 w-7 shrink-0 p-0">
          <Edit className="text-green-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Update Link</DialogTitle>
            <DialogDescription>Update existing link</DialogDescription>
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
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Eg. My Youtube Channel"
                    disabled={isPending}
                    {...field}
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

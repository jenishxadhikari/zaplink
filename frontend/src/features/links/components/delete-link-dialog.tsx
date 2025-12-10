import { useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { LoaderCircle, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { deleteLinkMutation } from '@/lib/api'

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
import { ErrorAlert } from '@/components/error-alert'

interface DeleteLinkDialogProps {
  shortUrlKey: string
}

export function DeleteLinkDialog({ shortUrlKey }: DeleteLinkDialogProps) {
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const form = useForm()

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteLinkMutation(shortUrlKey),
    onSuccess: (response) => {
      toast.success(response.message)
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message)
      } else {
        setError('Something went wrong')
      }
    }
  })

  async function onSubmit() {
    setError(null)
    mutate()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="h-7 w-7 shrink-0 p-0">
          <Trash className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Delete Link</DialogTitle>
            <DialogDescription>Are you sure? This action is irreversible</DialogDescription>
          </DialogHeader>
          {!!error && <ErrorAlert message={error} />}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending && <LoaderCircle className="size-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

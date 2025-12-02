import { useState } from 'react'

import { LoaderCircle, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'

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

export function DeleteLinkDialog() {
  const [error, setError] = useState<string | null>(null)

  const form = useForm()

  const isPending = form.formState.isSubmitting

  async function onSubmit() {
    setError(null)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Deleted')
        resolve(true)
      }, 2000)
    })
  }

  return (
    <Dialog>
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

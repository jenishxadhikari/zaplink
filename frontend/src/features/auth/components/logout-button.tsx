import { Button } from "@/components/ui/button";
import { logoutMutation } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Logout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: logoutMutation,
    onSuccess: (response) => {
      toast.success(response.data.message)
      localStorage.removeItem('accessToken')
      queryClient.resetQueries({ queryKey: ['auth'] })
      navigate("/")
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message)
      } else {
        toast.error("Something went wrong")
      }
    }
  })

  async function handleLogout() {
    mutate()
  }

  return (
    <Button variant='destructive' size='sm' disabled={isPending} onClick={handleLogout}>
      {isPending && <LoaderCircle className="size-4 animate-spin" />} Logout
    </Button>
  )
}

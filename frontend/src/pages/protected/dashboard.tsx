import { useAuthContext } from "@/context/auth-provider";
import { Logout } from "@/features/auth/components/logout-button";

export default function Dashboard() {
  const { session } = useAuthContext()
  return (
    <section className="py-4 md:py-8 space-y-4">
      <h1>Dashboard</h1>
      <Logout />
      <p className="max-w-md">
        {JSON.stringify(session)}
      </p>
    </section>
  )
}

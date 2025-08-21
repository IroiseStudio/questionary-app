'use client'

import { useSession } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

import { HomeIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'


const tabs = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const session = useSession()

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (session === null) {
        router.push('/auth/login')
      } else if (session) {
        setLoading(false)
      }
    }, 300) // small delay to allow visual feedback

    return () => clearTimeout(timeout)
  }, [session, router])

if (loading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <div className="text-base font-medium mb-2">Checking session...</div>
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <nav className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboard</h2>
{tabs.map((tab) => (
  <Link key={tab.name} href={tab.href} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
    pathname === tab.href
      ? 'bg-blue-100 text-blue-700'
      : 'text-gray-700 hover:bg-gray-100'
  }`}>
    <tab.icon className="w-5 h-5" />
    {tab.name}
  </Link>
))}
        </nav>
<button
  onClick={handleLogout}
  className="m-6 flex items-center gap-2 px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
>
  <ArrowLeftOnRectangleIcon className="w-5 h-5" />
  Log Out
</button>
      </aside>

<main className="flex-1">
  <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
  <div className="p-8">{children}</div>
</main>
    </div>
  )
}

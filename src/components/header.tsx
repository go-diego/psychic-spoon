import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CircleUser } from 'lucide-react'

const Header = () => {
  return (
    <header className="py-3 sticky top-0 z-50 bg-slate-200 shadow-md">
      <div className="flex justify-between container mx-auto w-full items-center">
        <Link href="/">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </Link>
        <div className="flex gap-2">
          <nav>
            <ul className="flex gap-2">
              <li>
                <Button asChild>
                  {/* TODO: use localstorage for saving a "logged in" user */}
                  <Link href="/profile/diego_bernal">
                    <CircleUser />
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

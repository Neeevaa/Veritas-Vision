import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/logo';
import { Lightbulb, BookOpen } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-headline text-xl font-bold">Veritas Vision</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Button variant="ghost" asChild>
              <Link href="/library">
                <BookOpen />
                <span className="ml-2 hidden sm:inline">Typology Library</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

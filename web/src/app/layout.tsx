import { ReactNode } from 'react'
import './globals.css'
import { cookies } from 'next/headers'

// Components
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { PurpleBlurBackground } from '@/components/PurpleBlurBackground'
import { SignIn } from '@/components/SignIn'
import { StripesBackground } from '@/components/StripesBackground'
import { Copyright } from '@/components/Copyright'

// Fonts
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

// Fonts instances
const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construída com React, Next.js, Tailwind e TypeScript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* Left */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            <PurpleBlurBackground />
            <StripesBackground />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />

            <Copyright />
          </div>

          {/* Right */}
          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

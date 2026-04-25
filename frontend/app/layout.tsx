import { ChatWidget } from "@/components/chat-widget";
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ThemeProvider } from '@/components/theme-provider'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RadhikaShoppy | Premium Indian Ethnic Wear',
  description: 'Discover elegant sarees, lehengas, suits, and gowns at RadhikaShoppy. Premium quality Indian ethnic wear for every occasion. Free shipping on orders above ₹999.',
  keywords: 'saree, lehenga, kurti, ethnic wear, Indian fashion, wedding wear, RadhikaShoppy',
  openGraph: {
    title: 'RadhikaShoppy | Premium Indian Ethnic Wear',
    description: 'Discover elegant sarees, lehengas, suits, and gowns at RadhikaShoppy.',
    type: 'website',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
    apple: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
  },
}

export const viewport: Viewport = {
  themeColor: '#8B4513',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable} bg-background`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <ChatWidget />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
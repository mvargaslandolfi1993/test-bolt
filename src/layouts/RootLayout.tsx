import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`relative min-h-screen ${inter.className}`}
    >
      <div className="flex min-h-screen flex-col">
        <header className="flex fixed w-full bg-black py-4 text-white opacity-80">
          <div className="container mx-auto">
            <div className="mx-auto w-full">
              <img
                src="/pokemon-logo.png"
                alt="Pokémon Logo"
                className="mx-auto"
              />
            </div>

            <nav className="mt-3 flex w-full justify-center">
              <a href="/" className="px-12 hover:underline">
                Home
              </a>
              <a href="/pokedex" className="px-12 hover:no-underline">
                Pokedex
              </a>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

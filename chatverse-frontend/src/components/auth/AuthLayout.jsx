import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'

function Logo() {
  return (
    <Link to="/chat" className="text-white inline-flex items-center gap-2.5 font-heading font-bold text-xl no-underline tracking-[-0.5px]">
      <span className="w-8 h-8 grid place-items-center rounded-[10px_10px_10px_3px] text-white bg-brand shadow-[0_5px_12px_var(--color-brand-glow)]">
        <MessageCircle size={18} strokeWidth={2.5} />
      </span>
      <span>ChatVerse</span>
    </Link>
  )
}

export function AuthLayout({ children, title, eyebrow }) {
  return (
    <main className="min-h-screen grid grid-cols-[minmax(420px,0.9fr)_1.1fr] relative overflow-hidden bg-surface max-md:block">
      <div className="auth-atmosphere">
        <div className="auth-grid" />
      </div>

      <section className="w-[min(390px,calc(100vw-48px))] mx-auto relative z-1 py-[38px] max-md:pt-8">
        <Logo />

        <div className="mt-19 mb-8 max-md:mt-[70px]">
          <span className="text-brand text-xs font-bold tracking-[1.4px] uppercase">
            {eyebrow}
          </span>
          <h1 className="font-heading text-[clamp(40px,4vw,52px)] leading-[1.06] tracking-[-2px] mt-3 text-dark-heading">
            {title}
          </h1>
        </div>

        {children}

        <p className="text-muted-light text-[11px] text-center mt-14 max-md:mt-9">
          Powered by Java TCP Socket Programming & Spring Boot.
        </p>
      </section>

      <aside className="relative z-1 self-center mx-auto w-[min(500px,78%)] pl-[42px] max-md:hidden">
        <div className="flex gap-2 items-center text-muted-label text-xs font-semibold">
          <span className="w-[7px] h-[7px] rounded-full bg-online inline-block" />
          <span>Java TCP Socket Engine</span>
        </div>

        <h2 className="text-dark-heading font-heading text-[clamp(38px,4vw,54px)] leading-[1.05] tracking-[-2px] mt-8 mb-5">
          Real-time chat with<br />
          <em className="text-brand not-italic">TCP socket backbone.</em>
        </h2>

        <p className="text-muted leading-[1.7] max-w-[340px]">
          ChatVerse delivers private and group messages with low-latency TCP sockets and persistent MySQL storage.
        </p>

        <div className="border-t border-muted-border mt-19 pt-[17px] flex gap-[15px] items-baseline text-muted text-xs">
          <strong className="text-white font-heading text-xl">5000</strong>
          <span>TCP Port Active</span>
        </div>
      </aside>
    </main>
  )
}

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Menu, X } from 'lucide-react'

function SnakeGame() {
  const [snake, setSnake] = useState([])
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    let currentSnake = []
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    
    const move = () => {
      const dx = targetRef.current.x - pos.x
      const dy = targetRef.current.y - pos.y
      
      pos.x += dx * 0.15
      pos.y += dy * 0.15
      
      currentSnake = [{ x: pos.x, y: pos.y }, ...currentSnake.slice(0, 14)]
      setSnake([...currentSnake])
      
      requestAnimationFrame(move)
    }
    
    const id = requestAnimationFrame(move)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snake.map((segment, i) => (
        <motion.div
          key={i}
          animate={{ x: segment.x - (i === 0 ? 10 : 8), y: segment.y - (i === 0 ? 10 : 8) }}
          transition={{ duration: 0.05, ease: 'linear' }}
          className={`absolute rounded-sm ${
            i === 0 ? 'w-5 h-5 bg-accent' : 'w-4 h-4 bg-accent'
          }`}
          style={{
            opacity: i === 0 ? 1 : Math.max(0.1, 1 - i * 0.07),
            boxShadow: i === 0 ? '0 0 15px rgba(14,165,233,0.9), 0 0 30px rgba(14,165,233,0.5)' : 'none',
            zIndex: 20 - i
          }}
        />
      ))}
    </div>
  )
}

function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-[#0a0a0b]/80 backdrop-blur-xl">
      <div className="max-w-[680px] mx-auto flex justify-between items-center">
        <a href="/" className="font-mono text-base font-semibold text-[#e4e4e7] no-underline tracking-tight">adev</a>
        
        <div className="hidden md:flex gap-6">
          <a href="#about" className="text-sm text-[#e4e4e7]/60 no-underline hover:opacity-100 transition-opacity">about</a>
          <a href="https://github.com/adeveloper79" target="_blank" className="text-sm text-[#e4e4e7]/60 no-underline hover:opacity-100 transition-opacity">github</a>
        </div>

        <button 
          className="md:hidden flex flex-col gap-1.5 bg-none border-none cursor-pointer p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0b]/98 backdrop-blur-xl p-4 flex flex-col gap-3">
          <a href="#about" className="text-base text-[#e4e4e7] no-underline py-2" onClick={() => setIsOpen(false)}>about</a>
          <a href="https://github.com/adeveloper79" target="_blank" className="text-base text-[#e4e4e7] no-underline py-2" onClick={() => setIsOpen(false)}>github</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const glowY = useTransform(scrollY, [0, 500], [0, -200])
  const gridY = useTransform(scrollY, [0, 500], [0, -60])

  const name = 'adev'
  const letters = name.split('')

  return (
    <section className="min-h-[80vh] px-3 py-[160px] flex items-center relative" id="hero">
      <motion.div 
        style={{ y: glowY }}
        className="absolute top-[5%] left-[25%] w-[600px] h-[500px] pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-accent/20 via-pink-500/5 to-transparent blur-[80px]" />
      </motion.div>

      <motion.div 
        style={{ y: gridY }}
        className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      >
        <div className="dot-grid absolute inset-0" />
      </motion.div>

      <div className="max-w-[680px] mx-auto w-full relative">
        <h1 className="text-[72px] font-bold leading-[1.05] tracking-[-0.04em] mb-3 overflow-hidden">
          <span className="text-accent font-mono">&gt; </span>
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }}
            className="text-accent"
          >
            _
          </motion.span>
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg text-[#e4e4e7]/65 max-w-[460px] mb-6 leading-relaxed font-light"
        >
          A passionate developer exploring hardware, software, and everything in between.<br />
          Currently building things with ESP32, 3D printing, and React.
        </motion.p>

        <motion.a
          href="https://github.com/adeveloper79"
          target="_blank"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="inline-block border border-white/10 bg-surface px-6 py-3 text-sm font-medium text-[#e4e4e7] no-underline rounded-md transition-all hover:border-accent/50 hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_20px_-4px_rgba(14,165,233,0.4)]"
        >
          View GitHub <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </motion.a>
      </div>
    </section>
  )
}

function Divider() {
  return (
    <div className="max-w-[680px] mx-auto px-3 flex items-center gap-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}

function About() {
  return (
    <section className="py-12 px-3" id="about">
      <div className="max-w-[680px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs font-medium text-accent tracking-[0.08em] mb-3"
        >
          ABOUT
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-[#e4e4e7]/65 leading-relaxed font-light"
        >
          I'm a developer from Bhubaneswar, India with a keen interest in hardware and embedded systems. 
          I work with ESP32, 3D printing, and build web applications with React and modern JavaScript.
          I love tinkering with printers, creating IoT solutions, and exploring new technologies.
        </motion.p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16 px-3">
      <div className="max-w-[680px] mx-auto text-center">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <a href="/" className="font-mono text-sm text-[#e4e4e7]/60 no-underline">adev</a>
        
        <div className="flex justify-center gap-2 mt-3 flex-wrap">
          <a href="https://github.com/adeveloper79" target="_blank" className="text-xs text-[#e4e4e7]/50 no-underline hover:opacity-100 transition-opacity">GitHub</a>
          <span className="text-[#e4e4e7]/30">·</span>
          <a href="https://discord.com/users/adeveloper79" target="_blank" className="text-xs text-[#e4e4e7]/50 no-underline hover:opacity-100 transition-opacity">Discord</a>
        </div>

        <p className="text-xs text-[#e4e4e7]/30 mt-4">thanks for visiting</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen">
      <SnakeGame />
      <div className="grain" />
      <div className="dot-grid" />
      
      <Nav />
      
      <main>
        <Hero />
        <Divider />
        <About />
      </main>

      <Footer />
    </div>
  )
}

export default App

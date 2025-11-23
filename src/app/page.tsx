/**import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
**/


// app/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassScene from '@/components/Hero/GlassScene';

export default function Home() {
  const [glassFlipped, setGlassFlipped] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  const personVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.2 },
    },
  };

  return (
    <main className="w-full bg-gradient-to-br from-purple-900 via-purple-700 to-pink-300 min-h-screen">
      {/* Phase 1: Glass Animation */}
      <section 
        className="w-full h-screen relative"
        style={{
          background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #fecaca 100%)'
        }}
      >
        <GlassScene onFlipComplete={() => setGlassFlipped(true)} />
      </section>

      {/* Phase 2: Person & Content Section */}
      {glassFlipped && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full min-h-screen flex items-center justify-center px-8 py-20"
          style={{
            background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #fecaca 100%)'
          }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl w-full flex items-center justify-between gap-16"
          >
            {/* Person on Left */}
            <motion.div
              variants={personVariants}
              className="flex-1 flex justify-center"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-9xl drop-shadow-2xl"
              >
                👨‍💻
              </motion.div>
            </motion.div>

            {/* Content on Right */}
            <motion.div 
              variants={textVariants}
              className="flex-1"
            >
              <motion.div
                variants={itemVariants}
                className="mb-8"
              >
                <h2 className="text-6xl font-bold text-white mb-4">
                  Hi, I'm a Developer
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-pink-400 to-purple-300 rounded-full"></div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-6"
              >
                <p className="text-xl text-white leading-relaxed">
                  I specialize in creating interactive, animated web experiences 
                  that bring designs to life with modern technologies.
                </p>
                
                <p className="text-xl text-pink-100 leading-relaxed">
                  From 3D visualizations with Three.js to smooth animations with 
                  Framer Motion, I transform ideas into engaging digital products.
                </p>

                <div className="pt-8 flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(236, 72, 153, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold rounded-lg hover:shadow-2xl transition-all"
                  >
                    View My Work
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 255, 255, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:shadow-2xl transition-all"
                  >
                    Contact Me
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>
      )}

      {/* Phase 3: Projects Section */}
      {glassFlipped && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full min-h-screen px-8 py-20"
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #fda4af 100%)'
          }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl font-bold text-white mb-16"
            >
              Featured Projects
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: 'Interactive Dashboard',
                  description: 'Real-time data visualization with Three.js',
                  icon: '📊',
                  color: 'from-blue-400 to-cyan-400'
                },
                {
                  title: 'E-commerce Platform',
                  description: 'Full-stack Next.js with Stripe integration',
                  icon: '🛍️',
                  color: 'from-purple-400 to-pink-400'
                },
                {
                  title: 'Animation Library',
                  description: 'Reusable Framer Motion components',
                  icon: '✨',
                  color: 'from-pink-400 to-rose-400'
                },
              ].map((project, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.08, y: -15 }}
                  className="group cursor-pointer"
                >
                  <div className={`bg-gradient-to-br ${project.color} rounded-2xl p-8 h-80 flex flex-col justify-between shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-sm bg-opacity-90`}>
                    <div>
                      <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
                        {project.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-gray-50 text-lg">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      {glassFlipped && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full bg-purple-950 bg-opacity-80 text-white py-12 text-center backdrop-blur-md"
        >
          <p className="text-lg font-semibold">© 2024 Animated Portfolio. Built with Next.js & Three.js</p>
        </motion.section>
      )}
    </main>
  );
}
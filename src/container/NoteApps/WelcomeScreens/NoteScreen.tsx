import { Button } from '@/components/Button/Button'
import { observer } from 'mobx-react'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

export const WelcomeNoteScreen = observer(({ onClick }: { onClick: () => void }) => {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start('visible')
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.3,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
    },
  }

  const words = ['Every', 'great', 'idea', 'starts', 'with', 'a', 'single', 'note']

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 2.5,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const borderVariants = {
    initial: {
      opacity: 0,
      scale: 1,
    },
    pulse: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.div className="text-h1 mb-2" variants={textVariants} transition={{ duration: 0.5 }}>
        Start Your Journey !
      </motion.div>

      <div className="flex flex-wrap justify-center gap-1 mb-6">
        {words.map((word, i) => (
          <motion.span
            key={word}
            className="text-description text-lg"
            variants={wordVariants}
            transition={{
              duration: 0.3,
              delay: 0.8 + i * 0.15,
              ease: 'easeOut',
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      <motion.div variants={buttonVariants} className="relative">
        <motion.div
          className="absolute inset-0 rounded-lg bg-primary-60"
          variants={borderVariants}
          initial="initial"
          animate="pulse"
          style={{ filter: 'blur(2px)' }}
        />
        <Button size="lg" onClick={onClick} className="px-6 relative">
          Create your first note
        </Button>
      </motion.div>
    </motion.div>
  )
})

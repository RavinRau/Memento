import { Button } from '@/components/Button/Button'
import { observer } from 'mobx-react'
import { motion } from 'framer-motion'

export const WelcomeFolderScreen = observer(({ onClick }: { onClick: () => void }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  const borderVariants = {
    initial: {
      opacity: 0.5,
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
      animate="visible"
    >
      <motion.div className="text-h1" variants={itemVariants}>
        Hi Welcome To Memento,
      </motion.div>
      <motion.div className="text-description text-lg" variants={itemVariants}>
        Lets start your note taking journey with a folder
      </motion.div>
      <motion.div variants={buttonVariants} className="mt-4 relative">
        <motion.div
          className="absolute inset-0 rounded-lg bg-primary-60"
          variants={borderVariants}
          initial="initial"
          animate="pulse"
          style={{ filter: 'blur(2px)' }}
        />
        <Button size="lg" onClick={onClick} className="px-6 relative">
          Create your first folder
        </Button>
      </motion.div>
    </motion.div>
  )
})

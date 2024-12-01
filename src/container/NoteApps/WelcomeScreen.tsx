import { Button } from '@/components/Button/Button'
import { observer } from 'mobx-react'
import { motion } from 'framer-motion'

export const WelcomeScreen = observer(({ onClick }: { onClick: () => void }) => {
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
        duration: 0.5,
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
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
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
      <motion.div className="text-2xl font-semibold text-neutral-100" variants={itemVariants}>
        Hi Welcome To Memento,
      </motion.div>
      <motion.div className="text-lg text-neutral-80 mt-2" variants={itemVariants}>
        Lets start with creating a folder
      </motion.div>
      <motion.div variants={buttonVariants} animate={['visible', 'pulse']} className="mt-4">
        <Button size="lg" onClick={onClick} className="px-6">
          Create your first Folder
        </Button>
      </motion.div>
    </motion.div>
  )
})

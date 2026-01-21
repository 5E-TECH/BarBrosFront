import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import { Scissors } from "lucide-react";

const Suspense = () => {
  // 1. Asosiy konteyner: Bolalarni ketma-ket chiqaradi
  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.4, // Elementlar orasidagi vaqt (sekinroq va aniqroq)
      },
    },
  };

  // 2. Qaychi: Kirib keladi va keyin sekin pulsatsiya qiladi
  const iconVariants: Variants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: {
      scale: [0, 1.1, 1], // Prujina effekti
      rotate: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15
      }
    },
    // Doimiy harakat (Pulse)
    loop: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // 3. Matn: Chapdan sirg'alib chiqadi
  const textVariants: Variants = {
    initial: { opacity: 0, x: -30 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  // 4. "UP" doirasi: Oxirida "portlab" chiqadi
  const upVariants: Variants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        delay: 1.2 // Hammasidan keyin chiqishi uchun
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#111111] overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative flex items-center gap-6"
      >
        {/* Qaychi Ikonasi */}
        <motion.div
          variants={iconVariants}
          animate={["animate", "loop"]} // Ham kirish, ham cheksiz animatsiya
          className="relative z-10 px-6 py-6 rounded-full bg-[#1a1b1f] border border-[#fa8900]/20 shadow-[0_0_30px_rgba(250,137,0,0.2)]"
        >
          <Scissors color="#fa8900" size={50} strokeWidth={1.5} />
        </motion.div>

        {/* Matnli qism */}
        <div className="flex items-center gap-4">
          <motion.h1 
            variants={textVariants}
            className="font-black text-6xl text-white tracking-tighter"
          >
            STYLE
          </motion.h1>

          <motion.div
            variants={upVariants}
            className="bg-[#fa8900] rounded-full w-16 h-16 flex items-center justify-center shadow-[0_0_20px_rgba(250,137,0,0.4)]"
          >
            <span className="text-xl font-black text-[#111111]">UP</span>
          </motion.div>
        </div>

        {/* Effekt uchun orqa fondagi nurlar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -inset-10 bg-[#fa8900]/5 blur-[100px] rounded-full -z-10"
        />
      </motion.div>
    </div>
  );
};

export default memo(Suspense);
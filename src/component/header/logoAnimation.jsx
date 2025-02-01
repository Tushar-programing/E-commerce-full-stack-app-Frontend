import { motion } from 'framer-motion';
import logo from '../../assets/logo-lx-bl.png';
import logo1 from '../../assets/logo.png';

const LogoAnimation = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="flex justify-center items-center " // Kitchen-inspired background
    >
      <motion.div
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <img src={logo1} alt="Not Just Spoons Logo" width={300} height={100} className="drop-shadow-lg" />
      </motion.div>
    </motion.div>
  );
};

export default LogoAnimation;
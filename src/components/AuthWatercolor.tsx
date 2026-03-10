import { motion } from "framer-motion";

/**
 * Watercolor-style washes for auth page backgrounds.
 * Soft, organic blobs that feel like painted paper.
 */
const AuthWatercolor = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {/* Large warm wash — top right */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="absolute"
      style={{
        width: "70vw",
        height: "60vh",
        top: "-10%",
        right: "-15%",
        background: "radial-gradient(ellipse at 60% 40%, rgba(232,198,174,0.45) 0%, rgba(240,197,170,0.2) 40%, transparent 70%)",
        filter: "blur(60px)",
        borderRadius: "50%",
      }}
    />

    {/* Cool blue wash — bottom left */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay: 0.2 }}
      className="absolute"
      style={{
        width: "55vw",
        height: "50vh",
        bottom: "-5%",
        left: "-12%",
        background: "radial-gradient(ellipse at 40% 60%, rgba(175,199,218,0.35) 0%, rgba(175,199,218,0.12) 45%, transparent 70%)",
        filter: "blur(50px)",
        borderRadius: "50%",
      }}
    />

    {/* Terracotta accent — mid right */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="absolute"
      style={{
        width: "30vw",
        height: "35vh",
        top: "35%",
        right: "0%",
        background: "radial-gradient(ellipse at 50% 50%, rgba(217,101,79,0.15) 0%, rgba(217,101,79,0.05) 50%, transparent 70%)",
        filter: "blur(45px)",
        borderRadius: "50%",
      }}
    />

    {/* Soft blush wash — top left */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.3, delay: 0.3 }}
      className="absolute"
      style={{
        width: "40vw",
        height: "40vh",
        top: "5%",
        left: "-5%",
        background: "radial-gradient(ellipse at 50% 50%, rgba(232,198,174,0.2) 0%, rgba(246,226,212,0.1) 50%, transparent 70%)",
        filter: "blur(55px)",
        borderRadius: "50%",
      }}
    />

    {/* Gold hint — center bottom */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="absolute"
      style={{
        width: "35vw",
        height: "25vh",
        bottom: "10%",
        left: "30%",
        background: "radial-gradient(ellipse at 50% 50%, rgba(233,203,116,0.1) 0%, transparent 60%)",
        filter: "blur(50px)",
        borderRadius: "50%",
      }}
    />
  </div>
);

export default AuthWatercolor;

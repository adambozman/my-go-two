export const WEB_COVERFLOW_MOTION = {
  card: {
    type: "spring" as const,
    stiffness: 260,
    damping: 30,
    mass: 0.75,
  },
  controls: {
    duration: 0.22,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};

export const motionTokens = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.7,
    stagger: 0.1
  },
  easing: {
    primary: "power4.out",
    smooth: "expo.out",
    bounce: "back.out(1.7)"
  }
};

// Helper to check for reduced motion preference
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Apply GSAP defaults lazily — avoids adding GSAP to the initial parse bundle
if (typeof window !== 'undefined') {
  import('gsap').then(({ default: gsap }) => {
    gsap.defaults({
      duration: motionTokens.duration.normal,
      ease: motionTokens.easing.primary
    });
  });
}
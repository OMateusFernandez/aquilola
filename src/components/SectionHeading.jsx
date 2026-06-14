import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, children, align = 'left' }) {
  return (
    <motion.div
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-white/55">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {children ? <p className="mt-5 text-base leading-8 text-muted sm:text-lg">{children}</p> : null}
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { Captions, Clapperboard, Scissors, Zap } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';

const services = [
  {
    icon: Clapperboard,
  },
  {
    icon: Zap,
  },
  {
    icon: Captions,
  },
  {
    icon: Scissors,
  },
];

export default function Services({ t }) {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="section-shell">
        <SectionHeading eyebrow={t.eyebrow} title={t.title}>
          {t.body}
        </SectionHeading>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            const copy = t.items[index];
            return (
              <motion.article
                key={copy.title}
                className="group rounded-lg border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-2 hover:border-white/30 hover:bg-white/[0.07] hover:shadow-glow"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-8 grid h-12 w-12 place-items-center rounded-lg border border-white/10 bg-black/40 text-white/75 transition group-hover:border-white/35 group-hover:bg-white/10 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-black text-white">{copy.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{copy.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

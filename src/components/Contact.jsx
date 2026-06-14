import { motion } from 'framer-motion';
import { assetPath } from '../utils/assets.js';
import { getSafeLinkProps } from '../utils/safeLinks.js';

const contacts = [
  { label: 'X', href: 'https://x.com/OMateusFernadez', icon: assetPath('social/x.png') },
  { label: 'Discord', href: 'https://discord.com/users/1507572360960675850', icon: assetPath('social/discord.png'), invert: true },
];

export default function Contact({ t }) {
  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <motion.div
        className="section-shell"
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/72 px-6 py-14 text-center shadow-premium sm:px-10 lg:px-14">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 bg-white/[0.045] blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-44 w-[30rem] -translate-x-1/2 bg-white/[0.028] blur-3xl" />

          <div className="relative mx-auto max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-white/45">
              {t.title}
            </p>
            <h2 className="mt-5 text-balance text-4xl font-black tracking-tight text-white [text-shadow:0_0_34px_rgba(255,255,255,0.35)] sm:text-5xl lg:text-7xl">
              {t.callout}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
              {t.body}
            </p>
          </div>

          <div className="relative mx-auto mt-11 grid max-w-5xl gap-5 text-left lg:grid-cols-[1.18fr_0.82fr]">
            <motion.div
              className="rounded-2xl border border-white/10 bg-black/72 p-5 shadow-[0_0_50px_rgba(255,255,255,0.045)] sm:p-7"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-black uppercase tracking-[0.28em] text-white/38">
                {t.qaLabel}
              </p>
              <div className="mt-5 space-y-4">
                {t.questions.map((item, index) => (
                  <motion.div
                    key={item.question}
                    className="group rounded-xl border border-white/[0.075] bg-white/[0.028] p-4 transition hover:border-white/16 hover:bg-white/[0.045] focus-within:border-white/16 focus-within:bg-white/[0.045]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ delay: 0.28 + index * 0.08, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    tabIndex={0}
                  >
                    <h3 className="flex items-start gap-3 text-sm font-black text-white [text-shadow:0_0_18px_rgba(255,255,255,0.16)]">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-[0.65rem] text-white/68">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{item.question}</span>
                    </h3>
                    <p className="mt-0 max-h-0 overflow-hidden pl-9 text-sm leading-6 text-white/58 opacity-0 transition-all duration-300 ease-out group-hover:mt-3 group-hover:max-h-32 group-hover:opacity-100 group-focus:mt-3 group-focus:max-h-32 group-focus:opacity-100 group-focus-within:mt-3 group-focus-within:max-h-32 group-focus-within:opacity-100">
                      {item.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_50px_rgba(255,255,255,0.06)] sm:p-7"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-center text-xs font-black uppercase tracking-[0.28em] text-white/38">
                {t.linksLabel}
              </p>
              <div className="mt-6 flex items-center justify-center gap-5 sm:gap-7">
                {contacts.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    {...getSafeLinkProps(contact.href)}
                    aria-label={contact.label}
                    className="group relative grid h-20 w-20 place-items-center overflow-hidden rounded-2xl border border-white/14 bg-black/78 shadow-[0_0_34px_rgba(255,255,255,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-white/45 hover:bg-white/[0.09] hover:shadow-[0_0_54px_rgba(255,255,255,0.18)] sm:h-24 sm:w-24"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: 0.2 + index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                      <span className="absolute inset-3 rounded-full bg-white/15 blur-xl" />
                    </span>
                    <img
                      src={contact.icon}
                      alt=""
                      className={`relative h-10 w-10 object-contain transition duration-300 group-hover:scale-115 sm:h-12 sm:w-12 ${
                        contact.invert ? 'invert' : ''
                      }`}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

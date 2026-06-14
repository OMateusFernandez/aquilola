import { getSafeLinkProps } from '../utils/safeLinks.js';
import { assetPath } from '../utils/assets.js';

const socialLinks = [
  // Replace the href values with your real profile links when they are ready.
  { label: 'Instagram', href: '#', icon: assetPath('social/instagram.png') },
  { label: 'X', href: '#', icon: assetPath('social/x.png') },
  { label: 'Discord', href: '#', icon: assetPath('social/discord.png'), invert: true },
];

export default function Footer({ t }) {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="section-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-black text-white">Mateus Fernandez</p>
          <p className="mt-1 text-sm font-medium text-muted">{t.role}</p>
          <p className="mt-3 text-sm text-muted">
            {t.copyright} {new Date().getFullYear()} Mateus Fernandez. {t.rights}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              {...getSafeLinkProps(link.href)}
              aria-label={link.label}
              className="group grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-black/50 transition hover:border-white/30 hover:bg-white/[0.08]"
            >
              <img
                src={link.icon}
                alt=""
                className={`h-5 w-5 object-contain transition group-hover:scale-110 ${link.invert ? 'invert' : ''}`}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

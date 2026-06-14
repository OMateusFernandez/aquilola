function avatar(label, background = '#111111') {
  const initials = label
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
      <rect width="160" height="160" rx="80" fill="${background}"/>
      <circle cx="80" cy="80" r="62" fill="none" stroke="rgba(255,255,255,.24)" stroke-width="2"/>
      <text x="80" y="91" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="42" font-weight="900" fill="white">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const openClientSlot = {
  isOpenSlot: true,
  name: 'Pode ser voce aqui',
  subscribers: 'Vitrine aberta',
  description: 'Voce pode ser uma das pessoas/clientes em destaque nessa vitrine.',
  avatar: avatar('Open Slot', '#101010'),
};

export const clientMarkets = {
  us: {
    label: 'USA',
    clients: [openClientSlot],
  },
  br: {
    label: 'BR',
    clients: [openClientSlot],
  },
};

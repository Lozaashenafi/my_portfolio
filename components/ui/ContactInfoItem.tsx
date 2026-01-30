// Individual contact info row with themed icon box
export const ContactInfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-6 group">
    <div className="p-4 bg-soft-white dark:bg-dark-secondary border border-slate-200 dark:border-dark-tertiary group-hover:border-primary transition-colors rounded-sm">
      {icon}
    </div>
    <div>
      <p className="text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-lg font-bold text-slate-900 dark:text-soft-white">
        {value}
      </p>
    </div>
  </div>
);

// Styled social/resource link
export const SocialLink = ({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
}) => (
  <a
    href={href}
    className="flex items-center gap-3 text-dark-tertiary dark:text-soft-white hover:text-primary transition-colors font-mono text-sm group"
  >
    <span className="group-hover:translate-x-1 transition-transform">
      {icon}
    </span>
    {text}
  </a>
);

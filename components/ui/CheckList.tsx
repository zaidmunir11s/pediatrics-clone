export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex size-[30px] shrink-0 items-center justify-center rounded-[50%] p-[10px] text-purple-cta ${className}`}
    >
      <svg viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
        <path
          d="M6.41 0l-.69.72-2.78 2.78-.81-.78-.72-.72-1.41 1.41.72.72 1.5 1.5.69.72.72-.72 3.5-3.5.72-.72-1.44-1.41z"
          transform="translate(0 1)"
        />
      </svg>
    </span>
  );
}

type Props = {
  items: readonly string[];
  /** Background of the icon circle; white on tinted cards, lavender on white/grey ones. */
  iconClassName?: string;
  className?: string;
  "data-testid"?: string;
};

export function CheckList({
  items,
  iconClassName = "bg-white",
  className = "",
  ...rest
}: Props) {
  return (
    <ul className={`flex flex-col ${className}`} {...rest}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-[13px] text-ink-700"
        >
          <CheckIcon className={iconClassName} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

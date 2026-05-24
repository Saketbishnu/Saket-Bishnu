import { Link } from 'react-router-dom';

export default function NeonButton({
  children,
  className = '',
  href,
  to,
  download,
  target,
  rel,
  type,
  disabled,
  onClick
}) {
  const classes = `neon-button ${className}`;

  if (to) {
    return (
      <Link className={classes} to={to} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type || 'button'} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

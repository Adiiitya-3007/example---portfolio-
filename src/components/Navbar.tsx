import { Fragment, useState } from 'react';

const NAV_LINKS = ['Labs', 'Studio', 'Openings', 'Shop'] as const;

interface NavbarProps {
  onSelectLink?: (label: string) => void;
}

export function Navbar({ onSelectLink }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    label: string
  ) => {
    event.preventDefault();
    setMenuOpen(false);
    onSelectLink?.(label);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, 'Home')}
          className="flex items-center gap-3 whitespace-nowrap shrink-0"
        >
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            janhvigore-portfolio&reg;
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center text-[23px] text-white"
        >
          {NAV_LINKS.map((label, index) => (
            <Fragment key={label}>
              {index > 0 && <span>, </span>}
              <a
                href={`#${label.toLowerCase()}`}
                onClick={(e) => handleLinkClick(e, label)}
                className="hover:opacity-60 transition-opacity whitespace-nowrap"
              >
                {label}
              </a>
            </Fragment>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, 'Get in touch')}
          className="hidden md:inline-block text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity whitespace-nowrap shrink-0"
        >
          Get in touch
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 -mr-2 cursor-pointer"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-opacity duration-300 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            onClick={(e) => handleLinkClick(e, label)}
            tabIndex={menuOpen ? 0 : -1}
            className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, 'Get in touch')}
          tabIndex={menuOpen ? 0 : -1}
          className="text-[32px] font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </>
  );
}

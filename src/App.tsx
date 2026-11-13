import { useEffect, useState } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { useTypewriter } from './hooks/useTypewriter';

const INITIAL_MESSAGE =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

const ACTION_PILLS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
] as const;

const INTERACTION_RESPONSES: Record<string, string> = {
  Home: INITIAL_MESSAGE,
  'Pitch us an idea':
    'Send the deck, the napkin sketch, or the ambition. We take sharp bets seriously — hello@mainframe.co.',
  'Come work here':
    'We hire builders with strong taste and low ego. Show us what you have shipped at hello@mainframe.co.',
  'Send a brief hello':
    'Always open for an unhurried intro. Drop a line whenever you are ready at hello@mainframe.co.',
  'See how we operate':
    'Small senior teams, rapid prototyping, zero layers between strategy and craft. Built to ship cleanly.',
  Labs:
    'Mainframe Labs explores experimental interfaces, spatial video, and adaptive agent systems.',
  Studio:
    'Mainframe Studio partners with founders and cultural brands from zero-to-one launch.',
  Openings:
    'Currently looking for design engineers and creative technologists. Reach out at hello@mainframe.co.',
  Shop:
    'Limited-run studio objects, print editions, and hardware experiments — opening soon.',
  'Get in touch':
    'Direct line is always open. Copy hello@mainframe.co below or pitch us your timeline.',
};

export default function App() {
  const [promptState, setPromptState] = useState({
    text: INITIAL_MESSAGE,
    delay: 600,
  });
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const { displayed, done } = useTypewriter(
    promptState.text,
    38,
    promptState.delay
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectPrompt = (key: string) => {
    const nextText = INTERACTION_RESPONSES[key] ?? INITIAL_MESSAGE;
    setPromptState({ text: nextText, delay: 40 });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('janhvigore92@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      <BackgroundVideo />
      <Navbar onSelectLink={handleSelectPrompt} />

      <main className="relative z-[1] h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
        <div className="max-w-xl relative z-10">
          <p
            className="pointer-events-none select-none mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#fff',
              filter: 'blur(4px)',
            }}
          >
            Hey there, meet A.R.I.A,
            <br />
            Mainframe&apos;s Adaptive Response Interface Agent
          </p>

          <p
            className="text-white mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: '54px',
            }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
                aria-hidden="true"
              />
            )}
          </p>

          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: buttonsVisible ? 1 : 0,
              transform: buttonsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {ACTION_PILLS.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleSelectPrompt(label)}
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {label}
              </button>
            ))}

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy janhvigore92@gmail.com to clipboard"
              className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
            >
              <span>
                {copied ? (
                  'Copied: janhvigore92@gmail.com'
                ) : (
                  <>
                    Reach us:{' '}
                    <span className="underline underline-offset-1 text-[#f3f1f1] font-normal">
                      janhvigore92@gmail.com
                    </span>
                  </>
                )}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="shrink-0"
              >
                <rect
                  x="4"
                  y="4"
                  width="6.5"
                  height="6.5"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
                <path
                  d="M8 2.5V2C8 1.44772 7.55228 1 7 1H2C1.44772 1 1 1.44772 1 2V7C1 7.55228 1.44772 8 2 8H2.5"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

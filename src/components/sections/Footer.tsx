import GitHub from '@ui/icons/IconGithub';
import Instagram from '@ui/icons/IconInstragram';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className='min-h-14 flex justify-between items-center px-8 py-1'
    >
      <p className='italic'>@Viking Dev {currentYear}</p>
      <div className="flex gap-4 [&>a]:text-gray-400 [&>a]:hover:text-white [&>a]:hover:scale-110 [&>a]:text-2xl [&>a]:transition-colors">
        <a
          href="https://github.com/vikingo-dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </a>
        <a
          href="https://www.instagram.com/criss__dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
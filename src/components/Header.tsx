"use client";
import { Button } from "@/components/ui/button";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { useWalletModal } from "@coin98-com/wallet-adapter-react-ui";

const Header = () => {
  const { connected, address, sendTransaction } = useWallet();
  const { openWalletModal } = useWalletModal();

  const onConnect = async () => {
    if (!connected) {
      openWalletModal();
    }
  };
  return (
    <header className="w-full py-[20px] px-[60px] flex justify-end z-10 fixed top-0 left-0">
      <nav
        aria-label="primary"
        className="px-fluid-base 4xl:px-0 my-auto relative z-10 NewNav_bannerHeader__Pg9YK"
      >
        <div className="flex items-center justify-between max-w-screen-3xl mx-auto h-full">
          <div className="max-w-[120px] md:max-w-[150px]">
            <a aria-label="Loom Logo" href="/">
              <span className="css-1l8qjb4">
                <svg className="lns-logoSvg" fill="none" viewBox="0 0 100 30">
                  <path
                    d="M30.01 13.43h-9.142l7.917-4.57-1.57-2.72-7.918 4.57 4.57-7.915-2.72-1.57-4.571 7.913V0h-3.142v9.139L8.863 1.225l-2.721 1.57 4.57 7.913L2.796 6.14 1.225 8.86l7.917 4.57H0v3.141h9.141l-7.916 4.57 1.57 2.72 7.918-4.57-4.571 7.915 2.72 1.57 4.572-7.914V30h3.142v-9.334l4.655 8.06 2.551-1.472-4.656-8.062 8.087 4.668 1.571-2.72-7.916-4.57h9.141v-3.14h.001zm-15.005 5.84a4.271 4.271 0 11-.001-8.542 4.271 4.271 0 01.001 8.542z"
                    fill="var(--lns-color-primary)"
                  />
                  <path
                    d="M38.109 25.973V4.027h4.028v21.946h-4.028zM76.742 11.059h3.846v1.82c.818-1.455 2.727-2.244 4.362-2.244 2.03 0 3.665.88 4.422 2.485 1.18-1.82 2.756-2.485 4.725-2.485 2.756 0 5.39 1.667 5.39 5.668v9.67h-3.906v-8.851c0-1.607-.788-2.82-2.636-2.82-1.727 0-2.757 1.335-2.757 2.942v8.73h-3.996v-8.852c0-1.607-.818-2.82-2.636-2.82-1.757 0-2.787 1.305-2.787 2.942v8.73h-4.027V11.059zM51.24 26.405c-4.538 0-7.824-3.367-7.824-7.889 0-4.45 3.276-7.896 7.824-7.896 4.57 0 7.824 3.478 7.824 7.896 0 4.49-3.288 7.889-7.824 7.889zm0-12.135a4.25 4.25 0 00-4.244 4.247 4.25 4.25 0 004.244 4.247 4.25 4.25 0 004.243-4.247 4.25 4.25 0 00-4.243-4.247zM67.667 26.405c-4.538 0-7.824-3.367-7.824-7.889 0-4.45 3.276-7.896 7.824-7.896 4.57 0 7.824 3.478 7.824 7.896 0 4.49-3.29 7.889-7.824 7.889zm0-12.186a4.3 4.3 0 00-4.293 4.296 4.3 4.3 0 004.293 4.296 4.3 4.3 0 004.293-4.296 4.3 4.3 0 00-4.293-4.296z"
                    fill="var(--lns-color-body)"
                  />
                </svg>
              </span>
            </a>
          </div>
          <div className="w-full flex items-center justify-end">
            <div>
              <ul className="flex items-center" role="menubar">
                <li role="none">
                  <button
                    aria-expanded="true"
                    aria-haspopup="true"
                    className="thd-button-xs xl:thd-button-sm thd-focus-thick thd-focus-bg after:content-['▼'] after:text-[8px] after:pl-6"
                    role="menuitem"
                    type="button"
                  >
                    Use Cases
                  </button>
                </li>
                <li role="none">
                  <button
                    aria-expanded="false"
                    aria-haspopup="true"
                    className="thd-button-xs xl:thd-button-sm thd-focus-thick thd-focus-bg after:content-['▼'] after:text-[8px] after:pl-6"
                    role="menuitem"
                    type="button"
                  >
                    For Business
                  </button>
                </li>
                <li role="none">
                  <button
                    aria-expanded="false"
                    aria-haspopup="true"
                    className="thd-button-xs xl:thd-button-sm thd-focus-thick thd-focus-bg after:content-['▼'] after:text-[8px] after:pl-6"
                    role="menuitem"
                    type="button"
                  >
                    Resources
                  </button>
                </li>
                <li role="none">
                  <button
                    aria-expanded="false"
                    aria-haspopup="true"
                    className="thd-button-xs xl:thd-button-sm thd-focus-thick thd-focus-bg after:content-['▼'] after:text-[8px] after:pl-6"
                    role="menuitem"
                    type="button"
                  >
                    Company
                  </button>
                </li>
                <li role="none">
                  <a
                    className="thd-button-xs xl:thd-button-sm thd-focus-thick thd-focus-bg"
                    href="/pricing"
                    tabIndex={-1}
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <a
              className="thd-button-xs xl:thd-button-sm thd-focus-thick thd-focus-bg"
              href="https://www.loom.com/login"
            >
              Sign In
            </a>
            <a
              className="ml-16 thd-button-nav thd-button-secondary w-content thd-button-md thd-body-sm flex items-center gap-[1em] whitespace-nowrap"
              href="https://www.loom.com/signup"
            >
              Get Loom For Free
            </a>
            <a
              className="ml-16 block flex-shrink-0 thd-button-nav thd-button-secondary w-content thd-button-md thd-body-sm flex items-center gap-[1em] whitespace-nowrap"
              href="/connect/enterprise?campaign=7013i000000QYMqAAO"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </nav>
      <Button className="ml-auto rounded-full" onClick={onConnect}>
        Connect Wallet
      </Button>
    </header>
  );
};

export default Header;

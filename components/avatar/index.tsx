import { useEffect, useRef } from "react";
import { useEthers } from "@usedapp/core";
import Jazzicon from "@metamask/jazzicon";

export default function Avatar() {
  const ref = useRef<HTMLDivElement>();
  const { account } = useEthers();

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = "";
      const publicAddress = parseInt(account.slice(2, 10), 16);
      ref.current.appendChild(Jazzicon(40, publicAddress));
    }
  }, [account]);

  return <div className="h-10 w-10 rounded-full" ref={ref as any} />;
}

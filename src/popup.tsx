import "~styles/globals.css";

import { Button } from "@/src/components/ui/button";

const IndexPopup = () => {
  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="p-5 font-sans w-72 space-y-4">
      <p className="text-gray-600 text-sm">
        Customize your experience by configuring options like grid columns, favorite accounts, card highlighting,
        primary buttons, and removing repetitive text.
      </p>
      <Button className="w-full" onClick={openOptionsPage}>
        Options
      </Button>
    </div>
  );
};

export default IndexPopup;

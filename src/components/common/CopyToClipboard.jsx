import React, { useState } from 'react';

const CopyToClipboard = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <button
      className="ml-2 text-xs text-gray-950 hover:text-black"
      onClick={handleCopy}
      aria-label="Copy message"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyToClipboard; 
import React, { useState, useEffect } from "react";

export default function BottomNote() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // auto-hide after 10 seconds (optional)
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded shadow-md z-50 max-w-md text-center">
      <strong>Note:</strong> Our service team doesn't visit every 2 days. Please check TDS yourself regularly.
    </div>
  );
}

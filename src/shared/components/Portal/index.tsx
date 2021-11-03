import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted
    ? createPortal(children, document.getElementById('modal') as Element)
    : null;
};

export default Portal;

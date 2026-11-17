import type { ReactNode, FC } from 'react';
import { useState, useEffect, createContext, useContext } from 'react';

interface WidthProviderProps {
  children?: ReactNode;
}

interface WidthContextParams {
  width: number;
}

export const DEVICES = {
  phone: {
    maxWidth: 767,
  },
  tablet: {
    maxWidth: 1024,
    minWidth: 768,
  },
  desktop: {
    minWidth: 1025,
  },
};

const isPhone = (width: number) => width <= DEVICES.phone.maxWidth;
const isDesktop = (width: number) => width >= DEVICES.desktop.minWidth;
const isTablet = (width: number) =>
  width >= DEVICES.tablet.minWidth && width <= DEVICES.tablet.maxWidth;

const WidthContext = createContext<WidthContextParams | null>(null);

export const WidthProvider: FC<WidthProviderProps> = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WidthContext.Provider value={{ width }}>{children}</WidthContext.Provider>
  );
};

export const useWidth = () => {
  const { width } = useContext(WidthContext) as WidthContextParams;

  return {
    width,
    isTablet: isTablet(width),
    isPhone: isPhone(width),
    isDesktop: isDesktop(width),
  };
};

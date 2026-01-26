import { createContext, useState, useContext } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [highContrast, setHighContrast] = useState(
    localStorage.getItem('highContrast') === 'true'
  );

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('highContrast', newValue);
  };

  return (
    <AccessibilityContext.Provider value={{ highContrast, toggleHighContrast }}>
      <div className={highContrast ? 'high-contrast' : ''}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);

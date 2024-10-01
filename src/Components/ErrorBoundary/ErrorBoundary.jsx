import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  // Effect hook to simulate getDerivedStateFromError
  useEffect(() => {
    const errorListener = (error) => {
      setHasError(true);
    };

    // Listening to errors
    window.addEventListener('error', errorListener);

    return () => {
      window.removeEventListener('error', errorListener);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong while loading this page.</h1>;
  }

  return children;
};

export default ErrorBoundary;

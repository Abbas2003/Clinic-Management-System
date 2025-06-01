'use client';
import React from 'react';

// The Loading component displays a full-screen overlay with a loading spinner and text.
// It's designed to be used as a suspense fallback in Next.js applications.
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background dark:bg-background p-4">
      {/* Loading container with a card-like appearance */}
      <div className="flex flex-col items-center p-8 bg-card dark:bg-card rounded-xl shadow-lg space-y-4 border border-border">
        {/* Spinner animation */}
        <div className="relative flex h-16 w-16">
          {/* Outer ring of the spinner */}
          <div className="absolute inset-0 rounded-full border-4 border-t-4 border-primary border-opacity-25 animate-spin"></div>
          {/* Inner ring of the spinner, creating the actual spinning effect */}
          <div className="absolute inset-0 rounded-full border-4 border-t-4 border-primary border-opacity-75 animate-spin-reverse"></div>
        </div>
        {/* Loading text */}
        <p className="text-lg font-semibold text-foreground">
          Loading content...
        </p>
        {/* Optional: Add a small descriptive text */}
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          Please wait a moment while we prepare your data.
        </p>
      </div>

      {/* Custom CSS for the spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;

'use client';

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-background dark:bg-background p-4">
    <div className="flex flex-col items-center p-8 bg-card dark:bg-card rounded-xl shadow-lg space-y-4 border border-border">
      <div className="relative flex h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-4 border-primary border-opacity-25 animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-4 border-primary border-opacity-75 animate-spin-reverse"></div>
      </div>
      <p className="text-lg font-semibold text-foreground">
        Loading doctor details...
      </p>
      <p className="text-sm text-muted-foreground text-center max-w-xs">
        Please wait while we fetch the doctor's information.
      </p>
    </div>
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

export default Loading;
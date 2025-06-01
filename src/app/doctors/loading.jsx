'use client';

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <span className="ml-4 text-lg font-semibold">Loading...</span>
    <style jsx>{`
      .animate-spin {
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    `}</style>
  </div>
);

export default Loading;
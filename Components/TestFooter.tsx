"use client";

import { useRouter } from 'next/navigation';

interface TestFooterProps {
  showOnlyInDev?: boolean;
}

export default function TestFooter({ showOnlyInDev = true }: TestFooterProps) {
  const router = useRouter();
  if (showOnlyInDev && process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => router.push('/role')}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 text-sm font-medium"
      >
        🧪 Test Role Page
      </button>
    </div>
  );
}
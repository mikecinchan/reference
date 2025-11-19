import { useState } from 'react';

export default function EntryCard({ entry, onEdit }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleCopyImage = async () => {
    try {
      // Fetch the image
      const response = await fetch(entry.imageUrl);
      const blob = await response.blob();

      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);

      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying image:', err);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  };

  return (
    <>
      <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-slate-700">
        <div className="relative group h-56 overflow-hidden bg-slate-900 flex items-center justify-center">
          <img
            src={entry.imageUrl}
            alt={entry.title}
            className="w-full h-full object-contain cursor-pointer"
            onClick={() => setShowPreview(true)}
          />
          <div className="absolute top-2 right-2 bg-slate-900/80 px-3 py-1 rounded-lg text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Click to preview
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPreview(true);
              }}
              className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 px-5 py-2.5 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium shadow-lg"
            >
              Preview
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCopyImage();
              }}
              className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg"
            >
              {copied ? '✓ Copied!' : copyError ? 'Error!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg text-white mb-2 truncate">
            {entry.title}
          </h3>

          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {entry.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={onEdit}
            className="w-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowPreview(false)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition p-2 bg-slate-800/50 rounded-lg backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="bg-slate-800 rounded-2xl p-4 shadow-2xl">
              <img
                src={entry.imageUrl}
                alt={entry.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">{entry.title}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyImage();
                  }}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg"
                >
                  {copied ? '✓ Copied!' : 'Copy Image'}
                </button>
              </div>
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {entry.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-blue-900/50 text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

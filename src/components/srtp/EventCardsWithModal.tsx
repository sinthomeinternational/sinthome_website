import { useState } from 'react';
import type { CollectionEntry } from 'astro:content';

interface EventCardsWithModalProps {
  events: CollectionEntry<'srtpEvents'>[];
  lang: string;
}

export default function EventCardsWithModal({ events, lang }: EventCardsWithModalProps) {
  const [selectedEvent, setSelectedEvent] = useState<CollectionEntry<'srtpEvents'> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event: CollectionEntry<'srtpEvents'>) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    document.body.style.overflow = 'unset';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => openModal(event)}
            className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
          >
            <div className="bg-black border border-zinc-800 rounded-lg overflow-hidden hover:border-red-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20">
              {/* Event Poster */}
              {event.data.poster && (
                <div className="relative h-64 overflow-hidden bg-black">
                  <img
                    src={typeof event.data.poster === 'string' ? event.data.poster : event.data.poster.src}
                    alt={`${event.data.title} poster`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

                  {/* Event Type Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                      {event.data.type}
                    </span>
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="p-5 bg-zinc-950">
                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-500 transition-colors line-clamp-2">
                  {lang === 'zh' ? event.data.titleZh : event.data.title}
                </h3>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(event.data.date)}</span>
                </div>

                {/* Speaker */}
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="line-clamp-1">{event.data.speaker}</span>
                </div>

                {/* View Details Button */}
                <div className="flex items-center gap-2 text-red-600 font-semibold group-hover:text-red-400 transition-colors">
                  <span className="text-sm uppercase tracking-wide">View Details</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black/80 backdrop-blur-sm rounded-full hover:bg-red-600 transition-colors group"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header with Image */}
            {selectedEvent.data.poster && (
              <div className="relative h-72 overflow-hidden bg-black">
                <img
                  src={typeof selectedEvent.data.poster === 'string' ? selectedEvent.data.poster : selectedEvent.data.poster.src}
                  alt={`${selectedEvent.data.title} poster`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                    {selectedEvent.data.type}
                  </span>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {lang === 'zh' ? selectedEvent.data.titleZh : selectedEvent.data.title}
                  </h2>
                  {lang !== 'zh' && selectedEvent.data.titleZh && (
                    <p className="text-lg text-zinc-400">{selectedEvent.data.titleZh}</p>
                  )}
                </div>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-8 bg-black overflow-y-auto max-h-[calc(90vh-18rem)]">
              {/* Event Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                  <div className="text-xs text-zinc-600 uppercase tracking-wider mb-1">Speaker</div>
                  <div className="text-sm text-white font-semibold">{selectedEvent.data.speaker}</div>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                  <div className="text-xs text-zinc-600 uppercase tracking-wider mb-1">Date</div>
                  <div className="text-sm text-white font-semibold">{formatDate(selectedEvent.data.date)}</div>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                  <div className="text-xs text-zinc-600 uppercase tracking-wider mb-1">Duration</div>
                  <div className="text-sm text-white font-semibold">{selectedEvent.data.duration}</div>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3">
                  <div className="text-xs text-zinc-600 uppercase tracking-wider mb-1">Location</div>
                  <div className="text-sm text-white font-semibold">{selectedEvent.data.location}</div>
                </div>
              </div>

              {/* Synopsis */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">
                  Synopsis
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {lang === 'zh' ? selectedEvent.data.synopsisZh : selectedEvent.data.synopsis}
                </p>
              </div>

              {/* Quote */}
              {selectedEvent.data.quote && (
                <div className="mb-8">
                  <blockquote className="border-l-4 border-red-600 pl-6 py-2">
                    <p className="text-lg text-zinc-500 italic">"{selectedEvent.data.quote}"</p>
                  </blockquote>
                </div>
              )}

              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.data.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-zinc-950 border border-zinc-800 text-zinc-500 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6 border-t border-zinc-800">
                {selectedEvent.data.recordingUrl && (
                  <a
                    href={selectedEvent.data.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-red-600 text-white font-bold uppercase tracking-wide text-sm rounded hover:bg-red-700 transition-colors text-center"
                  >
                    Watch Recording
                  </a>
                )}
                <a
                  href={`/events/${selectedEvent.id}`}
                  className="flex-1 px-6 py-3 border border-zinc-800 text-zinc-400 font-bold uppercase tracking-wide text-sm rounded hover:bg-zinc-950 hover:text-white transition-all text-center"
                >
                  View Full Details
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </>
  );
}
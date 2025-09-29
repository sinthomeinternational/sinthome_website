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
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 border border-zinc-700 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/20">
              {/* Event Poster */}
              {event.data.poster && (
                <div className="relative h-64 overflow-hidden bg-zinc-900">
                  <img
                    src={typeof event.data.poster === 'string' ? event.data.poster : event.data.poster.src}
                    alt={`${event.data.title} poster`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Event Type Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-full uppercase tracking-wider">
                      {event.data.type}
                    </span>
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                  {lang === 'zh' ? event.data.titleZh : event.data.title}
                </h3>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{formatDate(event.data.date)}</span>
                </div>

                {/* Speaker */}
                <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="line-clamp-1">{event.data.speaker}</span>
                </div>

                {/* View Details Button */}
                <div className="flex items-center gap-2 text-red-400 font-medium group-hover:text-red-300 transition-colors">
                  <span>View Details</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-zinc-900 to-black border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-zinc-800/80 backdrop-blur-sm rounded-full hover:bg-red-600 transition-colors group"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header with Image */}
            {selectedEvent.data.poster && (
              <div className="relative h-64 overflow-hidden">
                <img
                  src={typeof selectedEvent.data.poster === 'string' ? selectedEvent.data.poster : selectedEvent.data.poster.src}
                  alt={`${selectedEvent.data.title} poster`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full mb-3">
                    {selectedEvent.data.type}
                  </span>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {lang === 'zh' ? selectedEvent.data.titleZh : selectedEvent.data.title}
                  </h2>
                  {lang !== 'zh' && selectedEvent.data.titleZh && (
                    <p className="text-lg text-zinc-300">{selectedEvent.data.titleZh}</p>
                  )}
                </div>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
              {/* Event Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-zinc-900/50 rounded-lg p-3">
                  <div className="text-xs text-zinc-500 mb-1">Speaker</div>
                  <div className="text-sm text-white font-medium">{selectedEvent.data.speaker}</div>
                </div>
                <div className="bg-zinc-900/50 rounded-lg p-3">
                  <div className="text-xs text-zinc-500 mb-1">Date</div>
                  <div className="text-sm text-white font-medium">{formatDate(selectedEvent.data.date)}</div>
                </div>
                <div className="bg-zinc-900/50 rounded-lg p-3">
                  <div className="text-xs text-zinc-500 mb-1">Duration</div>
                  <div className="text-sm text-white font-medium">{selectedEvent.data.duration}</div>
                </div>
                <div className="bg-zinc-900/50 rounded-lg p-3">
                  <div className="text-xs text-zinc-500 mb-1">Location</div>
                  <div className="text-sm text-white font-medium">{selectedEvent.data.location}</div>
                </div>
              </div>

              {/* Synopsis */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-600/20 rounded flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-600 rounded-full" />
                  </div>
                  Synopsis
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {lang === 'zh' ? selectedEvent.data.synopsisZh : selectedEvent.data.synopsis}
                </p>
              </div>

              {/* Quote */}
              {selectedEvent.data.quote && (
                <div className="mb-6">
                  <blockquote className="border-l-4 border-red-600 pl-6 py-2">
                    <p className="text-lg text-zinc-400 italic">"{selectedEvent.data.quote}"</p>
                  </blockquote>
                </div>
              )}

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.data.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-red-900/30 border border-red-600/30 text-red-300 rounded-lg text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-zinc-800">
                {selectedEvent.data.recordingUrl && (
                  <a
                    href={selectedEvent.data.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-center"
                  >
                    Watch Recording
                  </a>
                )}
                <a
                  href={`/events/${selectedEvent.id}`}
                  className="flex-1 px-6 py-3 border border-zinc-600 text-zinc-300 font-medium rounded-lg hover:bg-zinc-800 transition-colors text-center"
                >
                  View Full Details
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
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
"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is this video downloader for LinkedIn?",
    answer:
      "Our video downloader is an online tool that allows you to save LinkedIn videos in the best quality on all devices (PC, Mac, Android, iOS). You can use it for free, with no limits and without the need for any additional software or account logins.",
  },
  {
    question: "How to save videos from LinkedIn on iPhone or iPad?",
    answer:
      "On an iPhone or iPad, you can use the Safari browser to navigate to our tool. Simply paste the LinkedIn video URL into the input field and tap 'Download video'.",
  },
  {
    question: "How to download LinkedIn videos on an Android phone?",
    answer:
      "To download videos from LinkedIn on an Android device, copy the post URL, open our downloader, paste the URL into the input field, and select 'Download video'.",
  },
  {
    question: "Can I save LinkedIn video directly to my device?",
    answer:
      "While LinkedIn doesn't provide a direct way to download videos, our tool enables you to save LinkedIn videos straight to your device.",
  },
  {
    question:
      "Is it necessary to log in or sign in to download LinkedIn videos?",
    answer:
      "No, there is no need to sign in or log in to your LinkedIn account to download videos using our tool.",
  },
  {
    question: "Can I download videos from private LinkedIn accounts?",
    answer:
      "Our tool is designed to download only public LinkedIn videos. Private videos cannot be accessed or downloaded.",
  },
  {
    question: "Where are the downloaded LinkedIn videos saved?",
    answer:
      "On most devices, downloaded videos will be saved in your 'Downloads' folder. On mobile devices, you can check the gallery or the media download section of your device.",
  },
  {
    question: "Is this LinkedIn downloader free?",
    answer:
      "Yes, our tool is completely free. There are no fees for downloading.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-center text-gray-500 text-lg">
          Everything you need to know about downloading LinkedIn videos
        </p>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-4 sm:px-6 pb-4">
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

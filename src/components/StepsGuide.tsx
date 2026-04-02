const steps = [
  {
    number: 1,
    title: "Open context menu",
    description:
      "Go to the LinkedIn post with the video you want to download and click on the 3 dots at the top right end corner of your LinkedIn post.",
  },
  {
    number: 2,
    title: "Copy the LinkedIn post URL",
    description:
      "Click on the 'copy link to post' button and it will automatically copy the URL of the LinkedIn post that you need to download.",
  },
  {
    number: 3,
    title: "Paste the URL",
    description:
      "Getting around this is easy, just click in that input field and paste the URL that you copied. You can also use the 'Paste' button next to the input field.",
  },
  {
    number: 4,
    title: "Click the download button",
    description:
      "The tool will process the URL and will start a download for your video. The LinkedIn video you want to save will appear and you can click the Download Video button. It will then save the file on to your device.",
  },
];

export default function StepsGuide() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
          How to download LinkedIn videos
        </h2>
        <p className="mt-3 text-center text-gray-500 text-lg">
          It only takes a few simple steps
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-lg font-bold">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CTABanner() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-[var(--color-primary)] to-[#005f8f]">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Ready to grow your LinkedIn audience?
        </h2>
        <p className="mt-3 text-blue-100 text-lg">
          Get started with our generous free plan today.
        </p>
        <button className="mt-8 inline-flex items-center px-8 py-3 rounded-xl bg-white text-[var(--color-primary)] font-semibold hover:bg-gray-100 transition-colors cursor-pointer text-base">
          Start for free now
        </button>
        <p className="mt-3 text-blue-200 text-sm">
          Free plan &middot; No credit card required
        </p>
      </div>
    </section>
  );
}

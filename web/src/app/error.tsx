"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="font-frank-ruhl text-3xl font-medium">לא ניתן לטעון את הספר</h1>
      <p className="mt-3 text-muted">
        החיבור למסד הנתונים אינו זמין כרגע. נסו שוב בעוד רגע.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-accent px-5 py-2 text-sm text-white"
      >
        נסו שוב
      </button>
    </main>
  );
}

export default function ChapterLoading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-6 py-3">
          <span className="text-sm text-muted">← תוכן העניינים</span>
          <span className="h-8 w-8" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center py-24">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent"
          role="status"
          aria-label="טוען פרק..."
        />
      </div>
    </div>
  );
}

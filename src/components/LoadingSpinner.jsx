export default function LoadingSpinner() {
  return (
    <div className="status loading" role="status">
      <span className="spinner" aria-hidden="true" /> Loading weather…
    </div>
  );
}

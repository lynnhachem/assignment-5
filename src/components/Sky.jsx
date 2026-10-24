export default function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className={`cloud c${n}`} />
      ))}
    </div>
  );
}

export default function ErrorMessage({ message }) {
  return (
    <div className="status error" role="alert">
      {message}
    </div>
  );
}

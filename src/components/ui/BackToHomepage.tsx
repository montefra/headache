import Link from "next/link";

export default function BackToHomepage() {
  return (
    <Link href="/" className="absolute bottom-4 left-4">
      ← Back to Homepage
    </Link>
  );
}

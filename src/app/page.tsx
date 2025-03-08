import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-between items-center">
      <div className="flex flex-col items-center mt-4">
        <Image src="/brainstorming.png" alt="Logo" width={200} height={200} />
        <h1 className="text-4xl mt-4">Welcome</h1> {/* Added margin-top */}
      </div>
      <div className="mb-4">
        <Link href={"/credits"}>Credits</Link>
      </div>
    </div>
  );
}

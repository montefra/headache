import BackToHomepage from "@headache/components/ui/BackToHomepage";

export default function Credits() {
  return (
    <div className="relative">
      <BackToHomepage />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl pb-8">Credits</h1>
        <ul className="list-disc text-lg">
          <li>
            <a
              href="https://www.freepik.com"
              className="text-blue-400 visited:text-purple-400"
            >
              freepik
            </a>{" "}
            for the brain logo
          </li>
          <li>
            <a
              href="https://opencode.ai"
              className="text-blue-400 visited:text-purple-400"
            >
              opencode
            </a>{" "}
            for assiting in the development of this project
          </li>
        </ul>
      </div>
    </div>
  );
}

import BackToHomepage from "@headache/components/ui/BackToHomepage";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return <div className="relative">
    <BackToHomepage />
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Hi {username}</h1>
    </div>
    </div>;
}

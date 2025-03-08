export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return <div>
    <h1>Hi {username}</h1>

    </div>;
}

import Image from "next/image";
import Link from "next/link";
import { container } from "@headache/di/container";
import { UserRepository } from "@headache/domain/repositories/userRepository";

export default async function Home() {
  // Use DI container to get UserRepository instance
  const userRepository = container.resolve<UserRepository>('UserRepository');
  
  try {
    const users = await userRepository.getAllUsers();

    return (
      <div className="flex flex-col min-h-screen justify-between items-center">
        <div className="flex flex-col items-center mt-4">
          <Image src="/brainstorming.png" alt="Logo" width={200} height={200} />
          <h1 className="text-4xl mt-4">Welcome</h1>

          <ul className="pt-10">
            {users.map((user) => (
              <li key={user.id}>
                <Link href={`/user/${user.name}`}>{user.name}</Link>
              </li>
            ))}
          </ul>

        </div>
        <div className="mb-4">
          <Link href={"/credits"}>Credits</Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch users:", error);
    
    // Fallback to static data if database fails
    const fallbackUsers = [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }];

    return (
      <div className="flex flex-col min-h-screen justify-between items-center">
        <div className="flex flex-col items-center mt-4">
          <Image src="/brainstorming.png" alt="Logo" width={200} height={200} />
          <h1 className="text-4xl mt-4">Welcome</h1>

          <ul className="pt-10">
            {fallbackUsers.map((user) => (
              <li key={user.name}>
                <Link href={`/user/${user.name}`}>{user.name}</Link>
              </li>
            ))}
          </ul>

        </div>
        <div className="mb-4">
          <Link href={"/credits"}>Credits</Link>
        </div>
      </div>
    );
  }
}

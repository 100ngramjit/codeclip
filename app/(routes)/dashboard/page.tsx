import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const user = await currentUser();
  console.log("user", user);
  return (
    <div className="flex justify-center align-center text-6xl">
      Hi {user?.firstName} !
    </div>
  );
};
export default Page;

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center align-center py-10">
      <SignUp />
    </div>
  );
}

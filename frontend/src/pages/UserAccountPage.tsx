import { useParams } from "@tanstack/react-router";

export default function UserAccountPage() {
  const { userId } = useParams({ from: "/_protected/$userId" });
  // console.log(userId);

  return <div>User ID: {userId}</div>;
}

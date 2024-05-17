// components/Task.tsx

type TaskProps = {
  id: string;
  description: string | null;
  authorName: string | null;
};

export default function Task({ id, description, authorName }: TaskProps) {
  return (
    <div>
      <h2>{description || "No description available"}</h2>
      <p>Author: {authorName || "Anonymous"}</p>
    </div>
  );
}

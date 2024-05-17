import Link from 'next/link';

interface EditButtonProps {
  taskId: string;
}

const EditButton: React.FC<EditButtonProps> = ({ taskId }) => {
  return (
    <Link href={`/TaskDetail/${taskId}`}>
      Edit Task
    </Link>
  );
};

export default EditButton;

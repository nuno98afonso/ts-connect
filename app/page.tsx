import Link from 'next/link';
import Task from './components/tasks/SingleTask';
import styles from './page.module.css';
import prisma from '../lib/prisma';

// Define a TypeScript type for Task
type Task = {
  id: string;
  description: string | null;
  published: boolean;
  authorId: string | null;
  author: {
    name: string | null;
  } | null;
};

async function getTasks(): Promise<Task[]> {
  const tasks = await prisma.task.findMany({
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return tasks;
}

export default async function Home() {
  const tasks = await getTasks();
  return (
    <main className={styles.main}>
      <Link href={'/TaskDetail'}>Add Task</Link>
      <h1>Task Feed</h1>
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          description={task.description}
          authorName={task.author?.name || "Anonymous"}
        />
      ))}
    </main>
  );
}

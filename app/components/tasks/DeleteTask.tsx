'use client';

import { useRouter } from "next/navigation";

interface DeleteTaskButtonProps {
    taskId: string;
}

export default function DeleteTaskButton({ taskId }: DeleteTaskButtonProps): JSX.Element {
    const router = useRouter();

    async function handleClick(): Promise<void> {
        try {
            await fetch(`/api/task/${taskId}`, {
                method: 'DELETE'
            });
            router.refresh();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <button onClick={handleClick}>Delete Task</button>
    )
}

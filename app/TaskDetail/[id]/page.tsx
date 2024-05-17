'use client';

import styles from '../../page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

export function UpdateTask({ taskId }: { taskId: string }) { // Add taskId prop

  const [description, setDescription] = useState<string>('');
  const router = useRouter();

  // Fetch existing task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/get-task/${taskId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch task: ${response.statusText}`);
        }
        const data = await response.json();
        setDescription(data.description);
      } catch (error) {
        console.error('Error fetching task:', error);
        // Set a default value for description or display an error message
      }
    };
  
    fetchTask();
  }, [taskId]);

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await fetch(`/api/edit-task/${taskId}`, { // Update API endpoint
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      router.push('/'); // Redirect to main page after update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <Link href="/">View Feed</Link>
      <h1>Update Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            placeholder={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </main>
  );
}

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { taskId } = req.query;

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId as string,
      },
    });
    if (task) {
      return res.status(200).json(task);
    } else {
      return res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error fetching task:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

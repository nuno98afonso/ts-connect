import prisma from '../../../lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function createTaskHandler(request: NextRequest) {
  const res = await request.json();
  const { description } = res as { description: string };

  const result = await prisma.task.create({
    data: {
      description,
      published: true,
      author: {
        connect: {
          id: 'clwak970e00015lqefdkw9ole',
        },
    },
  },
});

  return NextResponse.json({ result });
}

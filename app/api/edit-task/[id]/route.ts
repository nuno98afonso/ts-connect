import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function editTaskHandler(request: NextRequest, { params }: { params: { id: string } }) {
  const res = await request.json();
  const id = params.id;

  const task = await prisma.task.findUnique({
    where: { id }
  });

  return NextResponse.json(task);
}

import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  const task = await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json(task);
}

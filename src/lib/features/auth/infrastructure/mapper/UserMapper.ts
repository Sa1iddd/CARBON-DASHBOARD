import { User as PrismaUser } from '@prisma/client';

export function toPublicUser(u: PrismaUser) {
  return {
    id: u.id,
    email: u.email,
    name: u.name || null,
    role: u.role,
    createdAt: u.createdAt,
  };
}

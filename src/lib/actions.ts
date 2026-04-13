// src/lib/actions.ts
'use server'

import { prisma } from './prisma'
import { auth } from './auth'

// ==================== ROADMAP ====================
export async function getAllRoadmaps() {
    return await prisma.roadmap.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            steps: {
                orderBy: { order: 'asc' },
                include: { resources: true }
            },
            _count: { select: { students: true } }
        }
    })
}

export async function getRoadmapBySlug(slug: string) {
    return await prisma.roadmap.findUnique({
        where: { slug },
        include: {
            steps: {
                orderBy: { order: 'asc' },
                include: { resources: true }
            }
        }
    })
}

// ==================== ENROLLMENT & PROGRESS ====================
export async function enrollRoadmap(roadmapId: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const userId = session.user.id

    // Cek apakah sudah enroll
    const existing = await prisma.userProgress.findUnique({
        where: { userId_roadmapId: { userId, roadmapId } }
    })

    if (existing) return existing

    return await prisma.userProgress.create({
        data: {
            userId,
            roadmapId,
            currentStep: 1,
            isCompleted: false
        }
    })
}

export async function updateProgress(roadmapId: string, stepOrder: number) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Unauthorized")

    const userId = session.user.id

    return await prisma.userProgress.update({
        where: { userId_roadmapId: { userId, roadmapId } },
        data: {
            currentStep: stepOrder,
            lastAccess: new Date(),
            isCompleted: stepOrder >= 999 // logic sederhana, bisa diubah nanti
        }
    })
}

export async function getUserEnrolledRoadmaps() {
    const session = await auth()
    if (!session?.user?.id) return []

    return await prisma.userProgress.findMany({
        where: { userId: session.user.id },
        include: {
            roadmap: {
                include: { steps: true }
            }
        }
    })
}
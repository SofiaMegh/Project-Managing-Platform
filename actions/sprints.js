"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createSprint(projectId, data) {
    try {
        const { userId, orgId } = auth();

        if (!userId || !orgId) {
            throw new Error("Unauthorized");
        }

        if (!data.name || !data.startDate || !data.endDate) {
            throw new Error("Invalid sprint data");
        }

        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);

        if (isNaN(startDate) || isNaN(endDate)) {
            throw new Error("Invalid date format");
        }

        const project = await db.project.findUnique({
            where: { id: projectId },
        });

        if (!project || project.organizationId !== orgId) {
            throw new Error("Project not found");
        }

        const sprint = await db.sprint.create({
            data: {
                name: data.name,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                status: "PLANNED",
                projectId,
            },
        });

        return sprint;
    } catch (error) {
        console.error("Error creating sprint:", error.message);
        throw new Error("Failed to create sprint");
    }
}

export async function updateSprintStatus(sprintId, newStatus) {
    const { userId, orgId, orgRole = "" } = auth(); // Ensure orgRole has a default value

    if (!userId || !orgId) {
        throw new Error("Unauthorized");
    }

    try {
        const sprint = await db.sprint.findUnique({
            where: { id: sprintId },
            include: { project: true },
        });

        if (!sprint) {
            throw new Error("Sprint not found");
        }

        if (sprint.project.organizationId !== orgId) {
            throw new Error("Unauthorized");
        }

        if (orgRole !== "org:admin") {
            throw new Error("Only Admin can make this change");
        }

        const now = new Date();
        const startDate = new Date(sprint.startDate);
        const endDate = new Date(sprint.endDate);

        if (newStatus === "ACTIVE" && (now < startDate || now > endDate)) {
            throw new Error("Sprint cannot start outside its date range");
        }

        if (newStatus === "COMPLETED" && sprint.status !== "ACTIVE") {
            throw new Error("Can only complete an active sprint");
        }

        const updatedSprint = await db.sprint.update({
            where: { id: sprintId },
            data: { status: newStatus },
        });

        return { success: true, sprint: updatedSprint };
    } catch (error) {
        throw new Error(error.message);
    }
}
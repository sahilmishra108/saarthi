"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 🛡️ Ensure industryInsight exists BEFORE using the industry string
  let industryInsight = await db.industryInsight.findUnique({
    where: { industry: data.industry },
  });

  if (!industryInsight) {
    const insights = await generateAIInsights(data.industry);

    industryInsight = await db.industryInsight.create({
      data: {
        industry: data.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 days
      },
    });
  }

  // 🔍 Check if user exists
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  // 👤 If not, create the user with Clerk data (after insight exists)
  if (!user) {
    console.warn("User not found for clerkUserId:", userId);
    console.info("Creating new user record...");

    const clerkUser = await clerkClient.users.getUser(userId);

    user = await db.user.create({
      data: {
        clerkUserId: userId,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
        imageUrl: clerkUser.imageUrl ?? "",
        industry: data.industry,
        experience: data.experience ?? 0,
        bio: data.bio ?? "",
        skills: data.skills ?? [],
      },
    });
  }

  try {
    // 🔄 Wrap update logic in a transaction
    const result = await db.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          industry: data.industry,
          experience: data.experience,
          bio: data.bio,
          skills: data.skills,
        },
      });

      return { updatedUser, industryInsight };
    });

    revalidatePath("/");
    return result.updatedUser;
  } catch (error) {
    console.error("❌ Error updating user or insights:", error);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    console.log("🔍 Checking onboarding for userId:", userId);

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { industry: true },
    });

    console.log("✅ Fetched user from DB:", user);

    if (!user) {
      console.warn("⚠️ No user found in DB for userId:", userId);
      return { isOnboarded: false };
    }

    return {
      isOnboarded: !!user.industry,
    };
  } catch (error) {
    console.error("❌ Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}

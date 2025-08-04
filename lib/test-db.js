import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function testDatabaseConnection() {
  try {
    console.log("Testing database connection...");
    
    // Test basic connection
    await prisma.$connect();
    console.log("✅ Database connection successful!");
    
    // Test a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Database query successful:", result);
    
    return { success: true, message: "Database connection working" };
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return { 
      success: false, 
      error: error.message,
      details: {
        code: error.code,
        meta: error.meta
      }
    };
  } finally {
    await prisma.$disconnect();
  }
} 
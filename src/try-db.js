import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const review = await prisma.review.findUnique({
        where: {
            id: 1
        }
    })
    console.log("Review with ID 1:");
    console.log(review);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
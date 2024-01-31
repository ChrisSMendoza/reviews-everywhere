import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const review = await prisma.review.create({
    data: {
      text: "This is the first persisted review",
    },
  });
  console.log("New Review:");
  console.log(review);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

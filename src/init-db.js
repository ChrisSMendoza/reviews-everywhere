import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const review = await prisma.review.create({
    data: {
      text: "This is the first persisted review",
      top: "10px",
      left: "20px",
      url: "http://localhost:3000/",
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

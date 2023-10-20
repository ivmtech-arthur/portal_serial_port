import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const arthur = await prisma.user.upsert({
    where: { userID: 'SuperAdmin' },
    update: {},
    create: {
      password: "test2",
      name: "Arthur2",
      nameEn: "Arthur2",
      userID: "SuperAdmin",
      username: "name",
      authenticated: false,
      userRole: {
        connect: {
          userRoleID: 1,
        },
      },
      userType: {
        connect: {
          userTypeID: 1,
        },
      },
        
    }
  });

  console.log({ arthur });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

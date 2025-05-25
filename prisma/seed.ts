import { prisma } from '@headache/adapter/prisma/client';
import { exit } from 'process';

async function main() {
    await prisma.user.createMany({
        data: [
        {
            id: 'id',
            name: 'Alice',
            email: 'alice@example.com'
        },
        {
            id: 'id2',
            name: 'Bob',
            email: 'bob@example.com'
        }
        ]
    });
};

main()
    .then(() => {
        console.log('Seeding completed successfully.');
    })
    .catch(async (e) => {
        console.error('Error during seeding:', e);
        await prisma.$disconnect();
        exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
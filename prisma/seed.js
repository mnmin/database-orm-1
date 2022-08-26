const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdCustomer = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    phone: "123456789",
                    email: "alice@worderland.com"
                }
            }
        },
            include: {
            contact: true,
            }            
    });

    console.log('Customer created', createdCustomer);

    // Add your code here
    // const createdContact = await prisma.contact.create({
    //     data: {
    //         phone: "123456789",
    //         email: "alice@wonderland.com"
    //     }
    // })

    //console.log('Contact created', createdContact)

    const createdMovie = await prisma.movie.create({
        data: {
            title: "The Matrix",
            runtimeMins: 126
        }
    });
    console.log("Movie created", createdMovie)

    const createdScreening = await prisma.screening.create({
        data: {
            startsAt: new Date('December 17, 1995 03:24:00'),
            movieId: createdMovie.id

        }
    });
    console.log("Screening created", createdScreening)

    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })

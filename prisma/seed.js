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
            },
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

    //the database runs the command and checks for the screen id. This code needs to be in order
    const createdScreen = await prisma.screen.create({
        data: {
            number: 5
        }
    });
    console.log("Created Screen", createdScreen)


    const createdScreening = await prisma.screening.create({
        data: {
            startsAt: new Date('December 17, 1995 03:24:00'),
            movieId: createdMovie.id,
            screenId: createdScreen.id
        },
        include: {
            movie: true,
            screen: true,
        }
    });

    const createdTicket = await prisma.ticket.create({
        data: {
            customerId: createdCustomer.id,
            screeningId: createdScreening.id,
        },
    })
    console.log("Ticket created", createdTicket)

    // console.log( 'Result: ', JSON.stringify( result, null, 2 )); lets you stringify the result
    // used to view the data in a table
    // below command used: check difference without JSON "npx prisma migrate reset"
    console.log("Screening created", JSON.stringify( createdScreening, null, 2 ))
    

    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })

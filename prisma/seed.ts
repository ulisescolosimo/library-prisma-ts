import { db } from '../src/utils/db.utils'

type Author = {
    firstName: string
    lastName: string
}

type Book = {
    title: string
    isFiction: boolean
    datePublished: Date
}

const seed = async () => {
    await db.author.create({
      data: {
        firstName: "Ernest",
        lastName: "Hemingway",
        Book: {
          create: [
            {
              title: "The Old Man and the Sea",
              isFiction: true,
              datePublished: new Date("1952-09-01")
            },
            {
              title: "For Whom the Bell Tolls",
              isFiction: true,
              datePublished: new Date("1940-10-21")
            }
          ]
        }
      }
    });
    await db.author.create({
      data: {
        firstName: "J.R.R.",
        lastName: "Tolkien",
        Book: {
          create: [
            {
              title: "The Lord of the Rings",
              isFiction: true,
              datePublished: new Date("1954-07-29")
            },
            {
              title: "The Hobbit",
              isFiction: true,
              datePublished: new Date("1937-09-21")
            }
          ]
        }
      }
    });
  };

  seed();
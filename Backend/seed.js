const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const User = require("./models/user"); // Adjust the path as necessary
const { Post } = require("./models/post"); // Adjust the path as necessary
const Comment = require("./models/comments"); // Adjust the path as necessary

mongoose.connect("mongodb://user:pass@localhost:27017/miapp?authSource=admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to the database");

  // Clear existing records
  await User.deleteMany({});
  await Post.deleteMany({});
  await Comment.deleteMany({});

  // Create dummy users
  const dummyUsers = [];
  for (let i = 0; i < 50; i++) {
    dummyUsers.push({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      description: faker.lorem.sentence(),
      avatar: faker.image.avatar(),
      userIdsWhoFollow: [],
      userIdsfollowed: [],
    });
  }
  const users = await User.insertMany(dummyUsers);

  // Update userIdsWhoFollow and userIdsfollowed fields
  for (const user of users) {
    user.userIdsWhoFollow = [faker.helpers.arrayElement(users)._id];
    user.userIdsfollowed = [faker.helpers.arrayElement(users)._id];
    await user.save();
  }

  // Create dummy posts
  const dummyPosts = [];
  for (let i = 0; i < 100; i++) {
    dummyPosts.push({
      imageURL: faker.image.url(),
      category: faker.helpers.arrayElement([
        "politics",
        "sports",
        "movies",
        "music",
        "science",
        "fashion",
        "travel",
        "astrology",
        "cooking",
        "weather",
      ]),
      description: faker.lorem.paragraph(),
      createdAt: faker.date.recent(),
      userId: faker.helpers.arrayElement(users)._id,
    });
  }
  const posts = await Post.insertMany(dummyPosts);

  // Create dummy comments
  const dummyComments = [];
  for (let i = 0; i < 200; i++) {
    dummyComments.push({
      comment: faker.lorem.sentence(),
      createdAt: faker.date.recent(),
      userId: faker.helpers.arrayElement(users)._id,
      postId: faker.helpers.arrayElement(posts)._id,
    });
  }
  await Comment.insertMany(dummyComments);

  console.log("Database seeded with dummy data");
  mongoose.connection.close();
});

// MongoDB initialization script
db = db.getSiblingDB('mnc_training');

// Create collections
db.createCollection('users');
db.createCollection('games');
db.createCollection('achievements');

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.games.createIndex({ "userId": 1 });
db.achievements.createIndex({ "userId": 1 });

// Insert sample data
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$10$example.hash.here", // This should be properly hashed
  createdAt: new Date(),
  updatedAt: new Date()
});

print("MongoDB initialized successfully!"); 
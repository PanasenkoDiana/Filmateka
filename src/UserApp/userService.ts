import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export class UserService {
  async createUser(userData: {
    username: string;
    email: string;
    password: string;
    profileImage: string | null;
    age: string;
    role: "USER" | "ADMIN";
  }): Promise<User> {
    const { username, email, password, profileImage, age, role } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        profileImage,
        age,
        role,
      },
    });

    return newUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
}

import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import Users from "../models/user.ts";
import { userSchema } from "../validators/uservalidation.ts";

export const createUser = asyncHandler(async (req: any, res: any) => {
  // Validate request body with Zod
  const parsed = userSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400);
    const message = parsed.error.message;
    console.log("Validation error:", message);
    throw new Error(message);
  }

  const { name, email, password, addresses, phone } = parsed.data;

  // Check if user exists
  const userExists = await Users.findOne({ email });
  if (userExists) {
    res.status(400);
    console.log("User already exists");
    throw new Error("User already exists");
  }

  // Hash password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await Users.create({
    name,
    email,
    password: hashedPassword,
    addresses,
    phone,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      addresses: user.addresses,
      phone: user.phone,
    });
  } else {
    res.status(400);
    console.log("Invalid user data");
    throw new Error("Invalid user data");
  }
});

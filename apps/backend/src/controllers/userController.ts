import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    const hashed_password = bcrypt.hashSync(
      password,
      process.env.PASSWORD_SALT
    );
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashed_password,
        first_name: first_name,
        last_name: last_name,
      },
    });
    if (!user) {
      throw new Error("Internal server error");
    } else {
      return res.json({
        id: user?.id,
        email: user?.email,
        first_name: user?.first_name,
        last_name: user?.last_name,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("Internal server error");
    } else {
      return res.json({
        id: user?.id,
        email: user?.email,
        first_name: user?.first_name,
        last_name: user?.last_name,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

const getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed_password = bcrypt.hashSync(
      password,
      process.env.PASSWORD_SALT
    );

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
        password: hashed_password
      },
    }); 
    
    const response_object = {
      id: user?.id,
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
    }
    
    return res.json(response_object);

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export = {
  createUser,
  deleteUser,
  getUser
};

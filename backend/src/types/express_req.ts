import "express";

//Lägger till user som egenskap i express-typen för Request
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      _id: string;
      username: string;
      email: string;
    };
  }
}

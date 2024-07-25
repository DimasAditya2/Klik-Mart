import { z } from "zod";

export const schemaUser = z.object({
  name: z.string({message: 'name required'}),
  username: z.string({message: 'username required'}),
  email: z.string({message: 'email required'}).email({message: 'Invalid email format'}),
  password: z.string({message: 'password required'}).min(5).max(5),
});



export type TUser = z.infer<typeof schemaUser>;
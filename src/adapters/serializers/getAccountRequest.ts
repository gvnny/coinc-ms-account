import * as z from "zod"

export const GetAccountRequestSchema = z.object({
  accountId: z.string().nonempty(),
})

export type GetAccountRequest = z.infer<typeof GetAccountRequestSchema>

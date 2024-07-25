import jwt from 'jsonwebtoken'
import * as jose from 'jose'

export const signToken = (payload: Record<string, string | number | boolean>) => {
    return jwt.sign(payload, process.env.SECRET!)
}
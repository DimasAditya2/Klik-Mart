import bcrypt from 'bcryptjs'

export const hasPass = (pass: string): string => {
    return bcrypt.hashSync(pass)
}

export const comparePass = (pass: string, hashed: string): boolean => {
    return bcrypt.compareSync(pass, hashed)
}


import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string>{
    try {
        const salt = await bcrypt.genSalt(10)
        
        return bcrypt.hash(password, salt)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function compareHashWithPassword(hash: string, password: string): Promise<boolean>{
    try {
        return bcrypt.compare(password, hash)
    } catch (error) {
       console.log(error) 
       throw error
    }
}
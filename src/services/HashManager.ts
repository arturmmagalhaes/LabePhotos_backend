import bcrypt from 'bcrypt';

export class HashManager {
    
    public async hash(password: string): Promise<string> {
        const rounds = Number(process.env.COST);
        const salts = await bcrypt.genSalt(rounds);
        const result = await bcrypt.hash(password, salts);
        return result;
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

}
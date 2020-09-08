import jwt from 'jsonwebtoken';

export class Authenticator{
    public async generateToken(input: AuthenticatorData): Promise<string> {
        const token = await jwt.sign(
            input,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.EXPIRES_IN
            }
        );

        return token;
    }

    public async getData(token: string): Promise<AuthenticatorData> {
        const payload = await jwt.verify(token, process.env.JWT_KEY as string) as any;
        return {
            id: payload.id,
            nickname: payload.nickname
        }
    }
}

export interface AuthenticatorData {
    id: string,
    nickname: string
}
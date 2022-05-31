import * as jwt from 'jsonwebtoken'
import jwks from 'jwks-rsa'


const client = jwks({
jwksUri: `https://dev-1icl38ta.us.auth0.com/.well-known/jwks.json`
});

const getKey = async (header: any, cb: any) => {
    const key = await client.getSigningKey(header.kid);
    const signingKey = key.getPublicKey();
    cb(null, signingKey);
}

const options = {
    audience: 'https://xzlwhiopyf.execute-api.us-east-1.amazonaws.com',
    issuer: 'https://dev-1icl38ta.us.auth0.com/',
};

export const validateJwt = (token: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, getKey, options, (err, decoded) => {
            if(err || !decoded) {
                resolve(false)
            }
            
            resolve(true)
        });
    })
}
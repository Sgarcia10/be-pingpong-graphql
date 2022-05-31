import { AuthenticationError } from 'apollo-server-express';
import { auth, requiredScopes }  from 'express-oauth2-jwt-bearer';

const checkJwt = auth({
    audience: 'https://xzlwhiopyf.execute-api.us-east-1.amazonaws.com',
    issuerBaseURL: 'https://dev-1icl38ta.us.auth0.com/'
})

export const AuthContext = ({req, res}) => {
    throw new AuthenticationError('you must be logged in')
}
import fs from 'fs';
import jwt from 'jsonwebtoken';
import config from "../config/main"

export const login = (login, password) => {
    if (login !== config.login || password !== config.password) {
        return false
    }
    const payload = {
        user: {
            email: config.email,
            username: config.login
        }
    };

    const privateKey = fs.readFileSync("./config/private.key", 'utf8');
    const token = jwt.sign(payload, privateKey, {algorithm: 'RS256'});

    return {token, payload}
};


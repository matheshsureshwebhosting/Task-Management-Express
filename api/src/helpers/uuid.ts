const { v4: uuidv4 } = require('uuid');
export const randomid = (): any => {
    return uuidv4();
}
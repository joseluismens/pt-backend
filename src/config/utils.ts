import * as bcrypt from "bcryptjs";


export default function checkIfUnencryptedPasswordIsValid(value: string, password: string) {
    return bcrypt.compareSync(value, password);
}
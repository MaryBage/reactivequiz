export default class InvalidCredentialsErrors extends Error {
    constructor(message='Invalid Credentials') {
        super(message);
    }

    name = 'InvalidCredentialsErrors'


}
namespace LoginType {

    export interface loginFields{
        username: string,
        password: string
    }

    export interface loginUserFields{
        token: string
        username?: string,
        password?: string
    }
    
    export interface verifyOtp {
        username: string,
        otp: number
    }

    export interface ResendOtp {
        username: string
    }

}

export default LoginType
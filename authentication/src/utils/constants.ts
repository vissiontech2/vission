const errorMessage = {
    genericPasswordError: 'password must be at least 4 chars and max of 20',
    genericaEmailError: 'Email is not valid',
    genericNameMessage: 'Name is invalid',
    genericCompanyMessage: 'Company is invalid',
    genericTokenErrorMessage: 'token is not valid'
}
const passwordValidation = {
    min: 4,
    max: 10
}

const baseRoute = 'auth'


export const verifyTokenValidation = [
    {
        name: 'token',
        error: errorMessage['genericTokenErrorMessage']
    }
]

export const signInValidation = [
    {
        name: 'email',
        error: errorMessage['genericaEmailError']
    },
    {
        name: 'password',
        error: errorMessage['genericPasswordError']
    }
]

export const signUpValidation = [
    {
        name: 'name',
        error: errorMessage['genericNameMessage']
    },
    {
        name: 'email',
        error: errorMessage['genericaEmailError']
    },
    {
        name: 'password',
        error: errorMessage['genericPasswordError'],
        length: passwordValidation
    },
    {
        name: 'company',
        error: errorMessage['genericCompanyMessage']
    }
]

export const routeNames = {
    signinRoute: `/${baseRoute}/signin`,
    signoutRoute: `/${baseRoute}/signout`,
    signUpRoute: `/${baseRoute}/signup`,
    verifyTokenRoute: `/${baseRoute}/verify-token`
}





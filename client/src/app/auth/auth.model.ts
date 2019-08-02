export class Signup {
    firstName: string;
    lastName: string
    username: string;
    password: string;
    passwordConfig: string;
    date: Date;
    phone: string;
    country: string;

}

export class Signin {
    username: string;
    password: string;
}

export class Address {
    state: string;
    locallity: string;
    neighborhood: string;
    street: string;
    address?: string

}
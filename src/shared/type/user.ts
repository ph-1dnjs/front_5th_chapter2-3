export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: Hair
  address: Address
  company: Company
  bank: Bank
  crypto: Crypto
  university: string
  ein: string
  ssn: string
  userAgent: string
  ip: string
  macAddress: string
  role: string
}

export interface Address {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface Company {
  department: string
  name: string
  title: string
  address: Address
}

export interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export interface Crypto {
  coin: string
  wallet: string
  network: string
}

export interface Hair {
  color: string
  type: string
}

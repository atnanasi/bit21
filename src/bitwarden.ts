export type Bitwarden = {
  folders: Folder[]
  items: Item[]
}

export type Folder = {
  id: string
  name: string
}

export type Item = {
  id: string
  organizationId: null
  folderId: null | string
  type: number
  name: string
  notes: null | string
  favorite: boolean
  login?: Login
  collectionIds: unknown
  secureNote?: SecureNote
  fields?: Field[]
  card?: Card
  identity?: Identity
}

export type Card = {
  cardholderName: string
  brand: string
  number: string
  expMonth: string
  expYear: string
  code: string
}

export type Field = {
  name: string
  value: string
  type: number
}

export type Identity = {
  title: string
  firstName: string
  middleName: string
  lastName: string
  address1: string
  address2: string
  address3: string
  city: string
  state: string
  postalCode: string
  country: string
  company: string
  email: string
  phone: string
  ssn: string
  username: string
  passportNumber: string
  licenseNumber: string
}

export type Login = {
  uris: Uris[]
  username: string
  password: string
  totp: null | string
}

export type Uris = {
  match: number | null
  uri: string
}

export type SecureNote = {
  type: number
}

export default Bitwarden

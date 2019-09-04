export default interface Bitwarden {
  folders: Folder[];
  items:   Item[];
}

export interface Folder {
  id:   string;
  name: string;
}

export interface Item {
  id:             string;
  organizationId: null;
  folderId:       null | string;
  type:           number;
  name:           string;
  notes:          null | string;
  favorite:       boolean;
  login?:         Login;
  collectionIds:  unknown;
  secureNote?:    SecureNote;
  fields?:        Field[];
  card?:          Card;
  identity?:      Identity;
}

export interface Card {
  cardholderName: string;
  brand:          string;
  number:         string;
  expMonth:       string;
  expYear:        string;
  code:           string;
}

export interface Field {
  name:  string;
  value: string;
  type:  number;
}

export interface Identity {
  title:          string;
  firstName:      string;
  middleName:     string;
  lastName:       string;
  address1:       string;
  address2:       string;
  address3:       string;
  city:           string;
  state:          string;
  postalCode:     string;
  country:        string;
  company:        string;
  email:          string;
  phone:          string;
  ssn:            string;
  username:       string;
  passportNumber: string;
  licenseNumber:  string;
}

export interface Login {
  uris:     Uris[];
  username: string;
  password: string;
  totp:     null | string;
}

export interface Uris {
  match: number | null;
  uri:   string;
}

export interface SecureNote {
  type: number;
}

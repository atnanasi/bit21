import {Item} from './bitwarden'

const Types = {
  Login: {
    header: "title,website,username,password,notes,custom field 1,custom field 2,custom field …",
    id: 1,
  },
  Note: {
    header: "title,text of note",
    id: 2,
  },
  Card: {
    header: "title,card number,expiry date (MM/YYYY),cardholder name,PIN,bank name,CVV,notes",
    id: 3,
  },
  Identy: {
    header: "title,website,username,password,notes,custom field 1,custom field 2,custom field …",
    id: 4,
  },
}

type CSVArray = string[]

export const Login = (item: Item): CSVArray => {
  return [
    item.name,
    item.login ? item.login.uris[0].uri : '',
    item.login ? item.login.username : '',
    item.login ? item.login.password : '',
    item.notes === null ? '' : item.notes,
    item.login ? item.login.totp || '' : '',
  ]
  .concat(item.identity ? Object.entries(item.identity).map(field => `${field.shift()}: ${field.shift()}`) : [])
  .concat(item.login ? item.login.uris.slice(1).map(uri => uri.uri) : [])
  .concat(item.fields ? item.fields.map(field => `${field.name}: ${field.value}`) : [])
}

export const Note = (item: Item): CSVArray => {
    return [
      item.name,
      item.notes === null ? '' : item.notes,
    ]
    .concat(item.fields ? item.fields.map(field => `${field.name}: ${field.value}`) : [])
}

export const Card = (item: Item): CSVArray => {
    return [
      item.name,
      item.card ? item.card.number : '',
      item.card ? `${item.card.expMonth}/${item.card.expYear}` : '',
      item.card ? item.card.cardholderName : '',
      '',
      item.card ? item.card.brand : '',
      item.card ? item.card.code : '',
      item.notes === null ? '' : item.notes,
    ]
    .concat(item.fields ? item.fields.map(field => `${field.name}: ${field.value}`) : [])
}

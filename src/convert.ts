import { Item } from './bitwarden'

export const ITEM_ID = { login: 1, secureNote: 2, card: 3, identity: 4 }

type CSVArray = string[]

export function login(items: Item[]): { columns: string[]; lines: CSVArray[] } {
  const urls =
    items
      .slice()
      .sort(
        (a, b) => (a.login?.uris?.length ?? 0) - (b.login?.uris?.length ?? 0)
      )
      .pop()?.login?.uris.length ?? 0
  const fields =
    items
      .slice()
      .sort((a, b) => (a.fields?.length ?? 0) - (b.fields?.length ?? 0))
      .pop()?.fields?.length ?? 0

  return {
    columns: [
      'title',
      'username',
      'password',
      'notes',
      ...Array(urls).fill('url'),
      'totp',
      ...Array(fields).fill('custom field'),
    ],
    lines: items.map((item) => [
      item.name,
      item.login?.username ?? '',
      item.login?.password ?? '',
      item.notes ?? '',
      ...(item.login?.uris?.map((uri) => uri?.uri ?? '') ?? []),
      ...Array(urls - (item.login?.uris?.length ?? 0)).fill(''),
      item.login?.totp ?? '',
      ...(item.fields?.map((field) => `${field.name}: ${field.value}`) ?? []),
      ...Array(fields - (item.fields?.length ?? 0)).fill(''),
    ]),
  }
}

export function secureNote(
  items: Item[]
): { columns: string[]; lines: CSVArray[] } {
  const fields =
    items
      .slice()
      .sort((a, b) => (a.fields?.length ?? 0) - (b.fields?.length ?? 0))
      .pop()?.fields?.length ?? 0

  return {
    columns: ['title', 'notes', ...Array(fields).fill('custom field')],
    lines: items.map((item) => [
      item.name,
      item.notes ?? '',
      ...(item.fields?.map((field) => `${field.name}: ${field.value}`) ?? []),
      ...Array(fields - (item.fields?.length ?? 0)).fill(''),
    ]),
  }
}

export function identity(
  items: Item[]
): { columns: string[]; lines: CSVArray[] } {
  const fields =
    items
      .slice()
      .sort((a, b) => (a.fields?.length ?? 0) - (b.fields?.length ?? 0))
      .pop()?.fields?.length ?? 0

  return {
    columns: [
      'title',
      'identity title',
      'middle name',
      'last name',
      'address1',
      'address2',
      'address3',
      'city',
      'state',
      'postal code',
      'country',
      'company',
      'email',
      'phone',
      'ssn',
      'username',
      'passport number',
      'license number',
      'notes',
      ...Array(fields).fill('custom field'),
    ],
    lines: items.map((item) => [
      item.name,
      item.identity?.title ?? '',
      item.identity?.firstName ?? '',
      item.identity?.middleName ?? '',
      item.identity?.lastName ?? '',
      item.identity?.address1 ?? '',
      item.identity?.address2 ?? '',
      item.identity?.address3 ?? '',
      item.identity?.city ?? '',
      item.identity?.state ?? '',
      item.identity?.postalCode ?? '',
      item.identity?.country ?? '',
      item.identity?.company ?? '',
      item.identity?.email ?? '',
      item.identity?.phone ?? '',
      item.identity?.ssn ?? '',
      item.identity?.username ?? '',
      item.identity?.passportNumber ?? '',
      item.identity?.licenseNumber ?? '',
      item.notes ?? '',
      ...(item.fields?.map((field) => `${field.name}: ${field.value}`) ?? []),
      ...Array(fields - (item.fields?.length ?? 0)).fill(''),
    ]),
  }
}

export function card(items: Item[]): { columns: string[]; lines: CSVArray[] } {
  const fields =
    items
      .slice()
      .sort((a, b) => (a.fields?.length ?? 0) - (b.fields?.length ?? 0))
      .pop()?.fields?.length ?? 0

  return {
    columns: [
      'title',
      'number',
      'exp date',
      'holder name',
      'brand',
      'cvv',
      'notes',
      ...Array(fields).fill('custom field'),
    ],
    lines: items.map((item) => [
      item.name,
      item.card?.number ?? '',
      item.card ? `${item.card.expMonth}/${item.card.expYear}` : '',
      item.card?.cardholderName ?? '',
      item.card?.brand ?? '',
      item.card?.code ?? '',
      item.notes ?? '',
      ...(item.fields?.map((field) => `${field.name}: ${field.value}`) ?? []),
      ...Array(fields - (item.fields?.length ?? 0)).fill(''),
    ]),
  }
}

export interface ICookie {
  name: string
  value: string
  domain?: string
  expires?: number
  httpOnly?: boolean
  partitionKey?: string
  path?: string
  priority?: 'Low' | 'Medium' | 'High'
  sameParty?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
  secure?: boolean
  sourceScheme?: 'Unset' | 'NonSecure' | 'Secure'
  url?: string
}

export interface IOption {
  args?: string[]
  cookies?: ICookie[]
  headers?: Record<string, string>
  format?:
    | 'letter'
    | 'legal'
    | 'tabloid'
    | 'ledger'
    | 'a0'
    | 'a1'
    | 'a2'
    | 'a3'
    | 'a4'
    | 'a5'
    | 'a6'
  landscape?: boolean
  printBackground?: boolean
  displayHeaderFooter?: boolean
  margin?: {
    top?: string | number
    bottom?: string | number
    left?: string | number
    right?: string | number
  }
  waterMarkTemplate?: string
  headerTitle?: string
  footerTitle?: string
  headerTemplate?: string
  footerTemplate?: string
  omitBackground?: boolean
  outline?: boolean
  pageRanges?: string
  path?: string
  preferCSSPageSize?: boolean
  scale?: number
  tagged?: boolean
  timeout?: number
  height?: string | number
  width?: string | number
  sizeOffset?: number
}

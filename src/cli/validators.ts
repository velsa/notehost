import isValidDomain from 'is-valid-domain'

export function validDomainName(domain: string) {
  return (
    domain &&
    domain.length > 0 &&
    isValidDomain(domain, {
      wildcard: false,
    })
  )
}

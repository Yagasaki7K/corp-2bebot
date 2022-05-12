const urls = {
  develop: {
    backend: 'https://hml-catalogo-api.catalogodigital.shop',
    catalog: 'https://hml-catalogo.jpaper.com.br'
  },
  prod: {
    backend: 'https://catalogo-api.catalogodigital.shop',
    catalog: 'https://catalogoderesgatebau.jequiti.com.br'
  }
}

const href = window.location.origin
const isDev = href.includes('localhost') ? 'develop' : null
const isHomolog = href.includes('hml') ? 'develop' : null
const env = isDev || isHomolog || 'prod'


export default urls[env];

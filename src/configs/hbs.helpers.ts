import * as hbs from 'hbs'

export function registerHbsHelpers() {
  hbs.handlebars.registerHelper('dateString', function (isoString: string) {
    return new Date(isoString).toLocaleDateString()
  })
}

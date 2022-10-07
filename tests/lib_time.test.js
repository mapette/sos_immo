const lib = require('../src/lib/lib_time.js')

describe('formatDate/convDateToString', () => {
    test(`shoud return dd-mm-yy when day and month > 9`, () => {
        newDate = new Date('December 17, 1995 03:24:00');
        expect(lib.formatDate(newDate)).toEqual('17-12-1995')
    })
    test(`shoud return dd-mm-yy when day or month < 9`, () => {
        newDate = new Date('December 7, 1995 03:24:00');
        expect(lib.formatDate(newDate)).toEqual('07-12-1995')
    })
    test(`shoud return dd-mm-yy when day or month < 9`, () => {
        newDate = new Date('January 17, 1995 03:24:00');
        expect(lib.formatDate(newDate)).toEqual('17-01-1995')
    })
    test(`shoud return dd-mm-yy when day or month < 9`, () => {
        newDate = new Date('January 7, 1995 03:24:00');
        expect(lib.formatDate(newDate)).toEqual('07-01-1995')
    })
})

describe('formatHeure/convHeureToString', () => {
    test(`shoud return dd-mm-yy when hour and minute > 9`, () => {
        newDate = new Date('December 17, 1995 13:24:00');
        expect(lib.formatHeure(newDate)).toEqual('13 heures 24')
    })
    test(`shoud return dd-mm-yy when hour and minute < 9`, () => {
        newDate = new Date('December 7, 1995 03:24:00');
        expect(lib.formatHeure(newDate)).toEqual('03 heures 24')
    })
    test(`shoud return dd-mm-yy when hour and minute < 9`, () => {
        newDate = new Date('January 17, 1995 13:04:00');
        expect(lib.formatHeure(newDate)).toEqual('13 heures 04')
    })
    test(`shoud return dd-mm-yy when hour and minute < 9`, () => {
        newDate = new Date('January 7, 1995 03:04:00');
        expect(lib.formatHeure(newDate)).toEqual('03 heures 04')
    })
})

describe('initDate', () => {
    test(`shoud return today date`, () => {
        newDate = new Date()
        expect(lib.initDate()).toEqual(newDate)
    })
})

describe('displayDatePilotage/formatDate', () => {
    test(`shoud return today date`, () => {
        newDate = new Date('January 7, 1995 03:04:00');
        expect(lib.displayDatePilotage(newDate)).toEqual('07-01-1995 - 03H04')
    })
})

describe('tempsRestant/calculTempsRestant/addDaysToDate', () => {
    test(`shoud terminé when dateFin not null`, () => {
        dateSignal = new Date('January 7, 1995 03:04:00')
        dateFin = new Date('Decembre 7, 1995 03:04:00')
        expect(lib.tempsRestant(dateSignal,dateFin)).toEqual('terminé')
    })
    test(`shoud terminé when dateSignal more than 24 hours`, () => {
        dateSignal = new Date('January 7, 1995 03:04:00')
        expect(lib.tempsRestant(dateSignal,null)).toContain('passé')
    })
    test(`shoud terminé when dateSignal is now`, () => {
        dateSignal = new Date((lib.addDaysToDate(new Date(), -1)))
        expect(lib.tempsRestant(dateSignal,null)).toContain('0H 0')
    })
    test(`shoud terminé when dateSignal less than 24 hours`, () => {
        dateSignal = new Date((lib.addHoursToDate(new Date(), -5)))
        console.log(dateSignal)
        expect(lib.tempsRestant(dateSignal,null)).toContain('18H 59')   // 24 - 5 => 19
    })
})



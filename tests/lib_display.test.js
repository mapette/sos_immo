const lib_display = require('./../src/lib/lib_display.js')

describe('boutonDisplay', () => {
    test(`should be undefined when no parameters`, () => {
        expect(lib_display.boutonDisplay()).toBeUndefined
    })
    test(`should contain 'danger' when couleur:rouge`, () => {
        expect(lib_display.boutonDisplay('rouge')).toContain('outline -danger fontsize')
    })
    test(`should contain 'danger' when couleur:vert`, () => {
        expect(lib_display.boutonDisplay('vert')).toContain('outline -success fontsize')
    })
    test(`should contain 'danger' when couleur:bleu`, () => {
        expect(lib_display.boutonDisplay('bleu')).toContain('outline -primary fontsize')
    })
    test(`should contain 'danger' when couleur:orange`, () => {
        expect(lib_display.boutonDisplay('orange')).toContain('outline -warning fontsize')
    })
    test(`should contain 'secondary' when couleur:gris`, () => {
        expect(lib_display.boutonDisplay('gris')).toContain('outline -secondary fontsize')
    })
    test(`should not contain color when couleur:else`, () => {
        expect(lib_display.boutonDisplay('xxx')).toContain('outline  fontsize')
    })
 
    test(`should not contain menu but particularite when particularite:not undefined`, () => {
        expect(lib_display.boutonDisplay('rouge','menu',false,'xxx')).toContain('xxx')
    })
    test(`should contain 'menu' when menu:menu`, () => {
        expect(lib_display.boutonDisplay('rouge','menu')).toContain('fontsize-20 margin-top-15 menu')
    })
    test(`should contain 'smenu' when menu:smenu`, () => {
        expect(lib_display.boutonDisplay('rouge','smenu')).toContain('fontsize-20 margin-top-15 smenu')
    })
    test(`should not contain menu when menu:undefined`, () => {
        expect(lib_display.boutonDisplay('rouge',undefined)).toContain(' fontsize-12')
    })
  
    test(`should contain 'outline' when plein:true`, () => {
        expect(lib_display.boutonDisplay('rouge','menu',false)).toContain('btn-outline -danger')
    })
    test(`should not contain 'outline' when plein:true`, () => {
        expect(lib_display.boutonDisplay('rouge','menu',true)).toContain('btn-danger')
    })
    test(`should contain 'outline' when plein:undefined`, () => {
        expect(lib_display.boutonDisplay('rouge','menu',undefined)).toContain('btn-outline -danger')
    })

})

describe('postItDisplay', () => {
    test(`should be 'fiche-commun postItUsager en-ligne xxx' when ('usager','xxx')`, () => {
        expect(lib_display.postItDisplay('usager','xxx')).toEqual('fiche-commun postItUsager en-ligne xxx')
    })
    test(`should be 'fiche-commun rubanTechno xxx' when ('techno', 'xxx')`, () => {
        expect(lib_display.postItDisplay('techno','xxx')).toEqual('fiche-commun gauche rubanTechno xxx')
    })
    test(`should be undefined when no parameters`, () => {
        expect(lib_display.postItDisplay()).toBeUndefined
    })
    test(`should be undefined when no style`, () => {
        expect(lib_display.postItDisplay(undefined,'xxx')).toBeUndefined
    })
    test(`should be undefined when no status`, () => {
        expect(lib_display.postItDisplay('xxx', undefined)).toBeUndefined
    })
})

describe('alignement', () => {
    test(`should be 'en-ligne ' when 'usager'`, () => {
        expect(lib_display.alignement('usager')).toEqual('en-ligne ')
    })
    test(`should be ' ' when 'techno'`, () => {
        expect(lib_display.alignement('techno')).toEqual(' ')
    })
    test(`should be undefined when no parameter`, () => {
        expect(lib_display.alignement()).toBeUndefined
    })
    test(`should be undefined else`, () => {
        expect(lib_display.alignement('')).toBeUndefined
    })})

describe('textAlign', () => {
    test(`should be 'centre ' when 'usager'`, () => {
        expect(lib_display.textAlign('usager')).toEqual('centre ')
    })
    test(`should be 'gauche ' when 'techno'`, () => {
        expect(lib_display.textAlign('techno')).toEqual('gauche ')
    })
    test(`should be undefined when no parameter`, () => {
        expect(lib_display.textAlign()).toBeUndefined
    })
    test(`should be undefined else`, () => {
        expect(lib_display.textAlign('')).toBeUndefined
    })
})




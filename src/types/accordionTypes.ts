export interface IAccordion {
   title: string
   contents: IAccordionList[]
   type: 'list' | 'links'
}

interface IAccordionList {
   title: string
   path?: string
}
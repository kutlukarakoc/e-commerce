export interface ISelect {
   title: string
   contents: ISelectList[]
   click?: (param: any) => void
   initialTitle: string
}

export interface ISelectList {
   title: string
   path?: string
   search?: string
}
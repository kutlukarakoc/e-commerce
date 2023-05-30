interface IRadio {
   value: string
   label: string
}

export const genderConstants: IRadio[] = [
   {
      value: 'male',
      label: 'Male',
   },
   {
      value: 'female',
      label: 'Female'
   },
   {
      value: 'other',
      label: 'Other'
   }
]
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ISelectList } from '../../types/selectTypes'
import Select from '../../components/ui/select'
import { categoryFilters, sortFilters } from '../../constants/filter/filterConstants'

const Filter: React.FC = () => {

   const navigate = useNavigate()
   const location = useLocation()

   const { pathname, search: locationSearch } = location

   // handle URL navigation based on the selected filter
   const handleURL = useCallback((content: ISelectList) => {
      const { path, search } = content

      if (path && search) {
         navigate(`${path}?${search}`)
      } else if (path && !search) {
         navigate({ pathname: path, search: locationSearch || '' })
      } else if (!path && search) {
         const searchParams = new URLSearchParams(locationSearch)
         const [searchKey, searchValue] = search.split('=')
         searchParams.set(searchKey, searchValue)
         navigate({ pathname, search: `?${searchParams.toString()}` })
      } else {
         if (content?.title === 'Categories') {
            navigate('/products' + locationSearch)
         } else {
            pathname.split('/').length > 2 ? navigate({ pathname }) : navigate('/products')
         }
      }
   }, [navigate, location])

   const [initialPath, setInitialPath] = useState<string>('')
   const [initialSearch, setInitialSearch] = useState<string>('')

   // set initial titles for category and sort filters
   const setInitialTitle = () => {
      const selectedCategory = categoryFilters.contents.find((category: ISelectList) => category.path === decodeURI(pathname))
      if (selectedCategory) setInitialPath(selectedCategory.title)

      const selectedSort = sortFilters.contents.find((sort: ISelectList) => sort.search === locationSearch.split('?')[1])
      if (selectedSort) setInitialSearch(selectedSort.title)
   }

   useEffect(() => {
      setInitialTitle()
   }, [])

   return (
      <div className='flex justify-between mb-20 gap-4'>
         {/* select component for category filter */}
         <Select title={categoryFilters.title} contents={categoryFilters.contents} click={handleURL} initialTitle={initialPath} />
         {/* select component for sort filter */}
         <Select title={sortFilters.title} contents={sortFilters.contents} click={handleURL} initialTitle={initialSearch} />
      </div>
   )
}

export default Filter

import { useState, useMemo } from "react"
import FilterCard from "./FilterCard"
import SearchBar from "../common/SearchBar"
import { debounce } from "../../utils"
import { fetchFilteredData } from "../../api/investigations"

interface SearchFilterProps {
  endpoint: string
}

function SearchFilter<T>({ endpoint }: SearchFilterProps) {
  const [filteredData, setFilteredData] = useState<T[]>([])

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (query: string) =>
          fetchFilteredData<T>(endpoint, query).then((result) =>
            setFilteredData(result.data.list)
          ),
        500
      ),
    [endpoint]
  )

  return (
    <FilterCard>
      <SearchBar
        onSearch={(query) => {
          debouncedSearch(query)
        }}
      />
    </FilterCard>
  )
}

export default SearchFilter

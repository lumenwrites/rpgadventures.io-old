import SelectTag from './SelectTag'
import Sorting from './Sorting'
import Search from './Search'

export default function Subnav({tags}) {
  return (
    <div className="subnav">
      <div className="subnav-wrapper">
        <Sorting />
        <SelectTag tags={tags} />
        <Search />
        <div className="clearfix" />
      </div>
    </div>
  )
}

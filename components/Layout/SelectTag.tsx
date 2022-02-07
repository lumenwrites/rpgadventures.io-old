import Link from 'components/Elements/Link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'


export default function SelectTag({tags}) {
  const router = useRouter()
  const [searchString, setSearchString] = useState('')
  const [filteredTags, setFilteredTags] = useState(tags)
  // Selected tags
  let { tag, ...baseQuery } = router.query
  if (router.query.tag) {
    // const capitalize = tag.toString().charAt(0).toUpperCase() + tag.slice(1)
    const tag = tags.find(t => t.slug === router.query.tag)
    return (
      <a className="btn" onClick={() => router.push({ query: { ...baseQuery } })}>
        <FontAwesomeIcon icon={['fas', 'times']} />
        {tag.name}
      </a>
    )
  }
  function search(e) {
    setSearchString(e.target.value)
    const filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredTags(filteredTags)
  }
  function clearSearch() {
    setSearchString("")
    setFilteredTags(tags)
  }
  return (
    <div>
      {/* {/* <div className="separator" />  */}
      <div className="dropdown select-tag">
        <input
          placeholder="Select tag..."
          value={searchString}
          onChange={search}
          onBlur={clearSearch}
        ></input>
        <div className="menu">
          {filteredTags.map((tag) => (
            <a
              className="btn item"
              key={tag.slug}
              onClick={() => router.push({ query: { ...baseQuery, tag: tag.slug } })}
            >
              {tag.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

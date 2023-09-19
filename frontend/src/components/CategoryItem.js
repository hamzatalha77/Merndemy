import { Link } from 'react-router-dom'
const CategoryItem = ({ item }) => {
  return (
    <div>
      <Link to={`/products/${item.cat}`}>
        <h4>{item.cat}</h4>
      </Link>
    </div>
  )
}

export default CategoryItem

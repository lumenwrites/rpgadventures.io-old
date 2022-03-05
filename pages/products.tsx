import Image from 'next/image'
import Layout from 'components/Layout/Layout'
import SubscribeBox from 'components/CTAs/SubscribeBox'

export default function browse({ products }) {
  return (
    <Layout>
      <Products products={products} />
      <SubscribeBox />
      <br />
    </Layout>
  )
}

function Products({ products }) {
  return (
    <div className="post-grid grid-2">
      {products.map((product, i) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <div className={`post-card-box`}>
      <a className="thumbnail" href={product.url}>
        <Image src={product.thumbnail} width={320} height={180} layout="responsive" />
      </a>
      <div className="description">
        <a className="title" href={product.url}>
          {product.title}
        </a>
        <div className="summary">{product.description}</div>
        <div className="post-footer">
          <div className="tags">
            <div className="right">
              <div className="tag">$15</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import products from 'backend/json/products/products.json'

export async function getServerSideProps({ req, query }) {
  return { props: { products } }
}

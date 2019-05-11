import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import D3 from "../../components/D3/Map"

import { table4 } from '../../date/population'

const IndexPage = () => (
  <Layout>
    <SEO title={table4.title} keywords={['Чисельність', 'населення', '2019' ]} />
    <h1>{table4.title}</h1>
    <div style={{ maxWidth: `3000px`, marginBottom: `1.45rem`, height: `500px `}}>
     
      <D3 data={table4} />
    </div>
    <Link to="/bulding/page-3/">Go to page 3</Link>
    <Link to="/bulding/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
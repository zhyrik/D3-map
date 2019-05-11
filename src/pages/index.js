import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Map from "../components/D3/Map"
import Chart from "../components/D3/Chart"

import { table, table2 } from '../date/population'

const IndexPage = () => (
  <Layout>
    <SEO title={table2.title} keywords={['Чисельність', 'населення', '2019' ]} />
    <h1>{table2.title}</h1>
    <div style={{ maxWidth: `3000px`, marginBottom: `1.45rem`}}>
      <Map data={table2} />
    </div>
    <div style={{ maxWidth: `3000px`, marginBottom: `1.45rem`}}>
      <Chart data={table2} />
    </div>
    <Link to="/bulding/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage

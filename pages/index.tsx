import { FC, useState } from 'react'
import Quotation from '../components/Quotation'
import Content from '../components/Content'

const Home: FC = () => {
  const [showQuote, setShowQuote] = useState(false)

  return (
    <div className="relative min-h-[83vh] md:min-h-screen py-6 pl-6 max-w-full">
      <Quotation show={showQuote} onClick={() => setShowQuote((pre) => !pre)} />
      <Content onClick={() => setShowQuote(false)} />
    </div>
  )
}

export default Home


import React from 'react'
import Wrapper from '../assets/wrappers/Testing'
import { Logo, Background} from '../components'
import { Link} from 'react-router-dom'


const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className='container page'>
          <div className='info'>
            <h1>
                job<span>tracking</span> app
            </h1>
            <p>
            Software engineering is a systematic engineering approach to software development.
            A software engineer is a person who applies the principles of software engineering to design, develop, maintain, test, and evaluate computer software. The term programmer is sometimes used as a synonym, but may also lack connotations of engineering education or skills.
            </p>
            <Link to='/register' className='btn btn-hero'>
              Login/Register  
            </Link>
          </div>
          < Background/>
        </div>
    </Wrapper>
  )
}


export default Landing
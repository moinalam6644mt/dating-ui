import React,{useContext} from 'react'
import members from './image/members.png'
import online from './image/online.png'
import male from './image/male.png'
import female from './image/female.png'
import AuthContext from '../../ContextApi/AuthProvider'

const FactPart = () => {
  const { alluserData } = useContext(AuthContext);

  return (
    <section className="sec facts">
    {/* <div className="overlay"></div> */}
  <div className="container">
    <h2 className="title divider-2">It all starts with a Date</h2>
    <h4 style={{lineHeight:'2rem'}}>You find us, finally, and you are already in love. More than 5.000.000 around the world already shared the same experience and uses our system. Joining us today just got easier!</h4>
    <div className="row">
      <article className="col m3 s12">
        <div className="counter text-center"> <img src={members} alt=""/>
          <h2>{alluserData?.total_members}</h2>
          
          <p>Total Members</p>
        </div>
      </article>
      <article className="col m3 s12">
        <div className="counter text-center"> <img src={online} alt=""/>
          <h2>{alluserData?.online_members}</h2>
          <p>Online Members</p>
        </div>
      </article>
      <article className="col m3 s12">
        <div className="counter text-center"> <img src={male} alt=""/>
          <h2>{alluserData?.male_members}</h2>
          <p>Male Members</p>
        </div>
      </article>
      <article className="col m3 s12">
        <div className="counter text-center"> <img src={female} alt=""/>
          <h2>{alluserData?.female_members}</h2>
          <p>Female Members</p>
        </div>
      </article>
    </div>
  </div>
</section>
  )
}

export default FactPart

import Introanimation from '@/components/Animation/Introanimation'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import Logo from '@/assets/Logo.svg'
import S from'./Waitlisted.module.css'
import { Button } from '@/components/ui/button'
import Countdown from '@/components/CountDown/Countdown'
import stars from "../../assets/stars.svg";
import meteor1 from "../../assets/meteors1.png";
import meteor2 from "../../assets/meteors2.png";
import meteor3 from "../../assets/meteor3.png";
export default function Waitlisted() {

  


  return (
    <>
    <div className={S.animate}>
    <Introanimation />
    </div>

    <>

    <div className={S.App}>
      <Card className={S.Waitlistbox}>
      <img src={meteor1} alt="meteor" className={S.meteor1} />
      <img src={meteor2} alt="meteor" className={S.meteor2} />
      <img src={meteor3} alt="meteor" className={S.meteor3} />
        <div className={S.logo}>
          <img src={Logo} alt="logo" />
        </div>
        <CardHeader className={S.header}>
          <img src={stars} alt="stars" className={S.stars}/>
          <CardTitle className={S.boxTitle}>
            <p> Collision expected to occur in</p>
          </CardTitle>
        </CardHeader>
        <Countdown />
        <Button className={S.button}>
          Join Waitlist
        </Button>
        {/* <CardContent className={S.userCount}>
          {userCount} USERS WAITING
        </CardContent> */}
      </Card>
    </div>
    </>
    </>
  )
}

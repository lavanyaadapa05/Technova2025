import React from 'react';
import { ShootingStars } from "../ui/shooting-stars";
import { StarsBackground } from "../ui/stars-background";
import { SignupFormDemo } from './signup';
const signupform = () => {
  return (
    <div>
        <ShootingStars />
                  <StarsBackground />
                 
                  <SignupFormDemo/>
      
    </div>
  )
}

export default signupform

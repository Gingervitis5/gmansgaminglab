import Container from '@/components/Container';
import Image from 'next/image';
import React from 'react'

const ProfilePage = () => {
  return (
    <div>
      <Container className="mt-5">
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center w-full">
          <div className='max-w-md text-shop_light_blue text-2xl tracking-wide font-extralight'>
            <p>Hello! My name is Graham and I'm a passionate Magic: The Gathering player and a software developer.</p>
            <p>I created this website to share my love for the game and to provide a platform for players looking for unique playmats or digital maps that enhance their gaming experience. </p>
            <p>When I'm not coding or playing Magic, you can find me dungeoneering in my Dungeons and Dragons group, exploring with my amazing wife, or just enjoying a good game with friends. </p>
            <p>Thanks for visiting, and I hope you find something you love in the shop! </p>
          </div>
          <div>
            <Image 
                src="/images/Profile_Pic.jpg"
                alt="Profile Image" 
                width={500} 
                height={500} 
                className="rounded-full border-4 border-shop_light_blue"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
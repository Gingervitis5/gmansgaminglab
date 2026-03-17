import Container from '@/components/Container';
import Image from 'next/image';
import React from 'react'

const ProfilePage = () => {
  return (
    <div>
      <Container className="mt-5">
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center w-full">
          <div>
            Column1
          </div>
          <div>
            <Image 
                src="/images/Profile_Pic.jpg"
                alt="Profile Image" 
                width={350} 
                height={350} 
                className="rounded-full"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
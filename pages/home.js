import Head from 'next/head';
import Layout from '../components/layout';
import Image from 'next/image';

export default function Home() {
  return (
  <Layout home>
      <Head>
        <Image
            src="/images/GMan Logo.png" 
            height={150} 
            width={450} 
            alt="GMan Logo"
        />
      </Head>
      
    </Layout>
  );
}
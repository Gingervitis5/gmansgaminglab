import Container from '@/components/Container';
import ThemeProducts from '@/components/ThemeProducts';
import { Title } from '@/components/ui/text';
import { getAllThemes } from '@/sanity/queries';
import React from 'react'

const ThemePage = async({params}:{params:Promise<{slug: string}>}) => {
  const themes = await getAllThemes();
  const { slug } = await params;
  return (
    <div className="py-10 ">
      <Container>
        <Title>Products by Theme: {" "}
          <span className="font-light text-shop_red capitalize tracking-wide">
            {slug && slug}
          </span>
        </Title>
        <ThemeProducts themes={themes} slug={slug}/>
      </Container>
    </div>
  );
};

export default ThemePage;
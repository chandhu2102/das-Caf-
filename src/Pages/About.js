import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../componets/Button';

const AboutContainer = styled.div`
  padding: 6rem 2rem 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fffbeb;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  color: #78350f;
  font-weight: bold;
`;

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TextContent = styled(motion.div)`
  flex: 1;
  p {
    color: #92400e;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
`;

const ImageContent = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Image = styled(motion.img)`
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
`;

function About() {
  return (
    <AboutContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About MsCafe
      </Title>
      <Content>
        <TextContent
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p>
            MsCafe was founded in 2010 with a simple mission: to serve the best coffee in town. Our passion for quality beans and expert brewing techniques has made us a favorite among coffee enthusiasts.
          </p>
          <p>
            We source our beans from sustainable farms around the world, ensuring that every cup of coffee you enjoy is not only delicious but also ethically produced.
          </p>
          <Button primary>Learn More</Button>
        </TextContent>
        <ImageContent
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Image 
            src="https://img.freepik.com/free-photo/digital-lavender-style-interior-design_23-2151561226.jpg?t=st=1727763316~exp=1727766916~hmac=621a2fad85c2229414cc73a6d1c40e4525802c326c6494db624ca97d2fda6bc2&w=1380" 
            alt="Zumar Cafe Interior" 
          />
        </ImageContent>
      </Content>
    </AboutContainer>
  );
}

export default About;
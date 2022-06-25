import React from "react";
import MainPageWrapper from "@BlockBuilder/MainPageWrapper";
import { defaultSchema } from "../configs/schemas";
import { getSrc } from "gatsby-plugin-image";
import { useSiteMetadatas } from "../tools/useSiteMetadatas";
const Portifolio = ({ location }) => {
  const { bgPatternImg } = useSiteMetadatas();
  const bgPatternSrc = getSrc(bgPatternImg.childrenImageSharp[0]);
  return (
    <MainPageWrapper
      backgroundImage={{
        src: bgPatternSrc,
      }}
      seoSchema={defaultSchema(location)}
      title='Módulos'
    >
      <h2>O que são módulos?</h2>
      <p>Teste aqui de tipografia aleatório contendo texto em língua nativa.</p>
    </MainPageWrapper>
  );
};

export default Portifolio;
